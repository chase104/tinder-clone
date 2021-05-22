const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
require('dotenv').config()
const multer  = require('multer')
const bcrypt = require('bcrypt')
const passport = require('passport')
const session = require('express-session')
const initializePassport = require('./passport-config.js')
const CardModel = require('./dbCards.js')
const UserModel = require('./userModel.js')
const Cors = require('cors')
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')
const userModel = require('./userModel.js')
const chatModel = require('./chatModel.js')


// App Config
const app = express();


initializePassport(
  passport,
  (email) => {
     UserModel.findOne({email: email}).then((user) => {
       return user
     })
  },
  (id) => {
     UserModel.findOne({_id: id}).then((user) => {
       return user
     })
  },
);
const port = process.env.PORT || 8001
const connection_url=`mongodb+srv://admin:${process.env.MONGODBPASSWORD}@cluster0.cri8b.mongodb.net/tinderdb?retryWrites=true&w=majority`

// passport config

//MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(Cors())
app.use(fileupload());
app.use(
  session({
    secret: process.env.SECRET_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(cookieParser(process.env.SECRET_SECRET));
app.use(passport.initialize());
app.use(passport.session());


//DB config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
var Message = mongoose.model('Message', {name: String, message: String})




const server = require('http').createServer(app);
const io = require('socket.io')(server)
io.on('connection', () => {     });
server.listen(4000)


if (process.env.NODE_ENV === "production") {
  //server static content
  //npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}


//Api Endpoints
app.post("/newuser", async (req, res) => {
    const { name, email, password } = req.body
    let hashedPassword = await bcrypt.hash(password, 10);
    UserModel.findOne({email: email}, async function(err, existingAccount){
      if (existingAccount !== null) {
        res.status(200).send({message: "Email already linked to an account"})
      } else {
          const { data, mimetype } = req.files.image
          const newUser = await new UserModel({
            name,
            email,
            password: hashedPassword,
           img: {
             Data: data,
             ContentType: mimetype
           }
          })
          UserModel.create(newUser, (err, data) => {
            if (err) {
              res.status(500).send(err)
            } else {
              res.status(200).send({newAccount: true})
            }
          })
        }
      })
})


app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})

app.post('/messages', (req, res) => {
  var message = new Message(req.body);
  message.save((err) =>{
    if(err)
      sendStatus(500);
    res.sendStatus(200);
  })
})



app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user)
      res.json({
        message: "no user with that email",
        loggedIn: false
      });
    else {
      req.logIn(user, err => {
        if (err){
          console.log(err);
        } else {
          res.json({
            message: "successfully Authenticated",
            loggedIn: true
          });
        }
      });
    }
  })(req, res, next);
});

app.get('/get-account', (req, res) => {
  UserModel.findOne({email: req.user.email}, (err, account) => {
    res.send(account)
  })
})
app.get('/logout', (req, res) => {
  req.logOut();
  res.json({loggedIn: false})
})
app.get('/check', (req, res) => {
  if (req.user) {
    res.json({
      user: true,
      name: req.user.name,
      id: req.user.id
    });
  } else {
    res.json({
      user: false
    })
  }
})

app.delete("/delete-cards", (req, res) => {
  const cards = req.body
  CardModel.deleteMany(cards, (err,data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  })
})
app.delete("/delete-users", (req, res) => {
  const cards = req.body
  UserModel.deleteMany(cards, (err,data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  })
})

app.get('/tinder/cards', (req, res) => {
  UserModel.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
        let finalData = []
      data.map((user) => {
        let arrayItem = {
          _id: user._id,
          name: user.name,
        }
        finalData.push(arrayItem)
      })
      res.status(200).send(finalData)
    }
  })
})
app.put('/tinder/match', async (req, res) => {
  console.log(req.body);
  const {name, personId} = req.body;
  const swiperId = req.user.id;
  const swiperName = req.user.name;

  let alreadyMatched = false;

  const checkIfAlreadyMatched = () => {
    const matchArray = req.user.matches;
    let i = 0;
    while (alreadyMatched === false && i < matchArray.length){
      matchArray[i].userId === personId ? alreadyMatched = true : i++;
    };
  }
  await checkIfAlreadyMatched()

  // if (alreadyMatched) {
    if (false){
    console.log('ALREADY MATCHED');
    res.status(300).json({
      error: "already matched"
    })
  } else {
    let matchedUser = await userModel.findOne({_id: personId})
    let alsoSwiped = false;
    let chat;
    let matchIndex = 0;
    matchedUser.matches.map((match) => {
      if (match.userId === swiperId) {
        alsoSwiped = true;
      } else if (alsoSwiped === false) {
        matchIndex++
      }
      
    })
  
    if (alsoSwiped) {
      const newChat = {
        users: {
          [personId]: name,
          [swiperId]: swiperName
        },
        messages: []
      };
      chat = await chatModel(newChat).save()
      console.log("matchIndex: ", matchIndex);
      const propertyName = `matches.${matchIndex}.chatId`
      let finalPropertyName = propertyName.toString()
      console.log(finalPropertyName, chat._id);
      await userModel.updateOne({_id: personId}, {[finalPropertyName]: chat._id})
    }
    let matchContent = { name , userId: personId, chatId: chat._id }
    const result = await userModel.updateOne({_id: swiperId}, {$push: { matches: matchContent }}, {new: true})
  }

})

app.get('/get-image/:id', async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById({ _id: id });
  if (!user) return sendStatus(404)
  res.type("Content-Type", user.img.ContentType);
  res.status(200).send(user.img.Data)
})

app.get('/get-chats', (req, res) => {
  console.log(req.user.id);
  res.json(req.user)
})


app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


//Listener
app.listen(port, () => {
  console.log(`Server active, listening on port: ${port}`);
})