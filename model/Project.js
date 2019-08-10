import * as mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const ProjectSchema = new Schema ({
  name: {type: String, required: true, match: /[A-Za-z\W]/},
  versionProject: {
    type: String,
    required: true,
    match: /\b[v][\d]\b\.\b[\d]\b\.\b[\d]\b/},
  date: {type: Date, required: true},
  tasks: [{
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    category: {
      type: ObjectId,
      ref: 'category',
      required: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
    required: false,
  }],
});

let project = mongoose.model('Project', ProjectSchema);
module.exports = project;
