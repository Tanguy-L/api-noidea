const Project = require('../model/Project');
const Joi = require('joi');
const Validator = require('../validator/schema');
const ObjectId = require('mongoose').Types.ObjectId;

exports.createTask = async (ctx) => {
  try {
    Joi.validate(ctx.request.body, Validator.registerTask);
    const result = await Project.update(
        {'_id': ctx.params.id},
        {'$push': {tasks: ctx.request.body}}
    );
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
    const result = await Project.update({'tasks._id': ctx.params.id},
        {$set: {'tasks.$': ctx.request.body}});
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
