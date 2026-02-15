const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        Type: mongoose.Schema.Types.ObjectId, 
        Ref:"Author",
        required: true,
    },
});

module.exports = mongoose.model("Book", bookSchema);
