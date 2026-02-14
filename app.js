//first step
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const Product = require("./models/Product");
app.use(express.json());

const mongo_url = process.env.DB_URL;
async function dbconnection() {
    try {
        await mongoose.connect(mongo_url);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}
dbconnection();


app.post("/Product", async(req, res) => {
    try {
        const {productName, price, category} = req.body;

        res.status(201).json({
            success: true,
            msg: "Done Created Product",
            data: Product,
        });
    } catch (error) {
        console.log(error);
    }
});



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is running");
});