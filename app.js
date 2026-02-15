//first step
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");

const Author = require("./models/Author");
const Book = require("./models/Book");

async function dbconnection() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/firstApp");
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}
dbconnection();

// const Library = require("./models/Library");


app.post('/api/library', async (req, res) => {
    try {
        const book = await Book.create(req.body);

        res.json({
            success: true,
            msg: "Book added successfully",
            data: book
        });
    } catch (error) {
        res.json({ success: false, error: error.message});
    }
});
app.get('/api/library', async(req, res) => {
    try {
        const books = await Book.find().populate("author");
        res.json({
            success: true,
            count: books.length,
            data: books
        });
    }catch (error) {
        res.json({success: false, error: error.message});
    }
});
app.post('/api/author', async (req, res) => {
    try {
        const author = await Author.create(req.body);
        res.json({
            success: true,
            msg: "Author added successfully",
            data: author
        });
    } catch (error) {
        res.json({ success: false, error: error.message});
    }
});

app.post('/api/book', async(req, res) => {
    try {
        const Book = await Book.create(req.body);
        res.json({
            success: true,
            msg: "Book created successfully! 📚",
            data: newBook
        });
    } catch (error) {
         res.json({success: false, error: error.message});
    }
});
app.get('/api/book', async(req, res) => {
    try {
        const Book = await Book.find();
        res.json({
            success: true,
            data: Book
        });
    }catch (error) {
        res.json({success: false, error: error.message});
    }
});

app.patch('/api/library/:id', async (req, res) => {
    try {
    const updatedBook = await Library.findByIdAndUpdate (
        req.params.id,
        req.body,
        {new: true, runValidators: true}
    );
    if (!updatedBook) {
        return res.json({success: false, msg: "Book not found"});
    }
    res.json({
        success: true,
        msg: "Book updated successfully!",
        data: updatedBook
    });
} catch (error) {
    res.json({success: false, error: error.message });
}
});
app.delete('/api/library/:id', async(req, res) => {
    try {
        const deletedBook = await Library.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.json({ success: false, msg: "Book not found"});
        }
        res.json({
            success: true,
            msg: "Book deleted successfully",
            data: deletedBook
        });
    } catch (error) {
        res.json({ success: false, error: Error.message});
    }
});




const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is running");
});
