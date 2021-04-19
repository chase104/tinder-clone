import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import multer  from 'multer'
import bcrypt from "bcrypt"
import passport from 'passport'
import session from 'express-session'
import initializePassport from './passport-config.js'
import CardModel from './dbCards.js'
import UserModel from './userModel.js'
import Cors from 'cors'
import fileupload from "express-fileupload"
import cookieParser from 'cookie-parser'


// App Config
const app = express();

initializePassport(
  passport,
  (email) => {
     UserModel.findOne({email: email}).then((user) => {
       console.log('returning user');
       return user
     })
  },
  (id) => {
     UserModel.findOne({_id: id}).then((user) => {
       console.log('returning user');
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
        console.log("account exists");
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
              console.log("success");
              res.status(200).send({newAccount: true})
            }
          })
        }
      })
})

app.post("/login", (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local", (err, user, info) => {
    console.log("info: ", info);
    if (err) throw err;
    if (!user)
      res.json({
        message: "no user with that email",
        loggedIn: false
      });
    else {
      req.logIn(user, err => {
        console.log("userr: ", user.id);
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
  console.log("running check");
  console.log(req.user);
  if (req.user) {
    res.json({
      user: true
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
      console.log(data);
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

app.get('/get-image/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const user = await UserModel.findById({ _id: id });
  if (!user) return sendStatus(404)
  res.type("Content-Type", user.img.ContentType);
  res.status(200).send(user.img.Data)
})

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//Listener
app.listen(port, () => {
  console.log(`Server active, listening on port: ${port}`);
})
