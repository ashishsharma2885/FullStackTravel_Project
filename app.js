const express = require("express");
const app = express();
const mongoose = require("mongoose");
const place=require("./models/place.js");
const path = require("path");
const methodOverride = require("method-override")

const MONGO_URL = "mongodb://127.0.0.1:27017/travel";

main()
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => console.log("err"));

async function main(){
  await mongoose.connect(MONGO_URL)
}

app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

//index route
app.get("/place", async(req, res) => {
  const allPlace = await place.find({});
  res.render("places/index",{allPlace});
});

// New Route
app.get("/place/new", (req, res) => {
  res.render("places/new.ejs")
})

// create route
app.post("/place", async(req, res) => {
  const newPlace = new place(req.body.place)
  await newPlace.save();
  res.redirect("/place")
})

// edit route
app.get("/place/:id/edit", async(req, res) => {
  let {id} = req.params;
  const place4 = await place.findById(id)
  res.render("places/edit.ejs", {place4})
})

// update route
app.put("/place/:id", async(req, res) => {
  try {
  let {id} = req.params;
  await place.findByIdAndUpdate(id,{ ...req.body.place});
  console.log("Place updated successfully")
  res.redirect(`/place/${id}`)
  } catch (error) {
    console.error("Error updating place:" , error)
    res.status(500).send("Error updating place")
  }
})

// show route
app.get("/place/:id", async(req, res) => {
  let {id}= req.params;
  const place3 = await place.findById(id);
  res.render("places/show.ejs", {place3})
})

// delete route
app.post("/place/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await place.findByIdAndDelete(id);
    console.log("Place deleted successfully");
    res.redirect("/place");
  } catch (error) {
    console.error("Error deleting place:", error);
    res.status(500).send("Error deleting place");
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});



// app.get("/demoplace", async (req, res) => {
//   let samplePlace = new place({
//     title: "my New Hotel",
//     description: "It is very awesome",
//     price:1200,
//     location: "Goa",
//     country: "India"
//   })
//   await samplePlace.save();
//   console.log("sample saved")
//   res.send("successfull testing")
// })