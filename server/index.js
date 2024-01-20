const experss = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = experss()
require('dotenv').config();

app.use(cors())
app.use(experss.json());

mongoose
  .connect(process.env.MONGO_URL, {dbName : "chat",})
  .then(() => {
    console.log("DataBase Conneted Successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });


const server = app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})