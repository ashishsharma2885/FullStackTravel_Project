const mongoose = require('mongoose');
const initData = require('./data.js');
const place = require("../models/place.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/travel";

main()
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => console.log("err"));

async function main(){
  await mongoose.connect(MONGO_URL)
}

const initDB = async ()=> {
    await place.deleteMany({})
    await place.insertMany(initData.data)
    console.log("data was initialized");
}
initDB();