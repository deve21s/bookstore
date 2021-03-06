var mongoose = require("mongoose");
//Schema
var bookSchema = new mongoose.Schema({
    isbn: Number,
    name: String,
    price: String,
    image: String,
    description: String,
    author: String,
    publisher : String,
    publisherYear : Number,
    oldStock : Number,
    newStock : Number


});
module.exports = mongoose.model("Book", bookSchema);
