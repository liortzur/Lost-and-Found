const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = Schema({
    name: { type: String, required: true, unique: true }
});

const categoriesList = module.exports = mongoose.model("category", categorySchema);