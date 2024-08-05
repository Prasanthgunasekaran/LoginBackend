const express = require("express");
const margon = require("morgan");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const Db = require("mongodb");
const connect = require("process");
const Cors=require('cors')

const authrouter = require("./route/userroute");
mongoose.connect("mongodb://localhost:27017/ProductDetails", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", (err) => { 
    console.log(err);
});
db.once("open", () => {
    console.log("Database connected");
});

const app = express();
app.use(margon("Dev"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(Cors());

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.use("/", authrouter);
