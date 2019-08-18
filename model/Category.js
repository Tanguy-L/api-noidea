import * as mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const Category = new Schema ({
  name: {type: String, required: true, unique: true},
});

let category = mongoose.model('category', Category);
module.exports = category;
