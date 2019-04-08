// db.js
const mongoose = require('mongoose'); 

//defining schema/collection
const personSchema = new mongoose.Schema({
	question: String,
	answer: String
});

//create model/constructor for creating new docs
let person = mongoose.model("Person", personSchema);

mongoose.connect('mongodb://localhost/VIP');