const Project = require('../model/Project');
const Joi = require('joi');
const Validator = require('../validator/schema');
const ObjectId = require('mongoose').Types.ObjectId;

exports.createTask = async (ctx) => {
  try {
    Joi.validate(ctx.request.body, Validator.registerTask);
    let categories = await Project.find({ _id: { $eq: ctx.params.id } }, {categories:1});
    categories = categories[0].categories;
    console.log(categories);

    let result;
    if (categories.includes(ctx.request.body.category)) {
      result = await Project.findOneAndUpdate(
        {'_id': ctx.params.id},
        {'$push': {tasks: ctx.request.body}}, 
        {new:true}
      );
    } else {
      throw new Error("The category is not defined in the project. Add the category to the project.");
    }
    if (!result) {
      throw new Error(error);
    } else {
      ctx.body = result;
    }
  } catch (error) {
    throw new Error(error);
  }
};

exports.getAllTasks = async (ctx) => {
  try {
    const project = await Project.findById(ctx.params.id);
    const tasks = project.tasks;
    if (!tasks) {
      throw new Error(error);
    } else {
      ctx.body = tasks;
    }
  } catch (error) {
    throw new Error(error);
  }
};

exports.updateTask = async (ctx) => {
  try {
    Joi.validate(ctx.request.body, Validator.updateTask);
    const tempresult = await Project.find({"tasks._id": ctx.params.id}, {"tasks.$" : 1})
    const task = tempresult[0].tasks[0];
    const currentTask = {...task._doc }
    const newTask = { ...currentTask, ...ctx.request.body };
    const result = await Project.update({'tasks._id': ctx.params.id},{$set: {'tasks.$': newTask}});
    if (!result) {
      throw new Error(error);
    } else {
      ctx.body = result;
    }
  } catch (error) {
    throw new Error(error);
  }
};

exports.deleteTask = async (ctx) => {
  try {
    const result = await Project.update({'tasks._id': ctx.params.id}, {
      $pull: {tasks: {'_id': ctx.params.id}},
    });
    if (!result) {
      throw new Error(error);
    } else {
      ctx.body = result;
    }
  } catch (error) {
    throw new Error(error);
  }
};
