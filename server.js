import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import MongooseModel from './dbCards.js'
import Cors from 'cors'





// App Config
const app = express();
const port = process.env.PORT || 8001
const connection_url=`mongodb+srv://admin:${process.env.MONGODBPASSWORD}@cluster0.cri8b.mongodb.net/tinderdb?retryWrites=true&w=majority`

//MiddleWare
app.use(express.json());
app.use(Cors())
//DB config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

//Api Endpoints
app.get("/", (req, res) => {
  res.status(200)
  res.send("Hello My App")
})

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;

  MongooseModel.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  })
})

app.get('/tinder/cards', (req, res) => {

  MongooseModel.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})
//Listener
app.listen(port, () => {
  console.log(`Server active, listening on port: ${port}`);
})
