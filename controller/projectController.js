const Project = require('../model/Project');
const Category = require('../model/Category');
const Validator = require('../validator/schema');
const Joi = require('joi');

exports.getProjects = async (ctx) => {
  // const projects = await Project.find({}).populate('tasks.category');
  const projects = await Project.find({});
  if (!projects) {
    throw new Error('There was an error retrieving your projects.');
  } else {
    ctx.body = projects;
  }
};

exports.getProjectById = async (ctx) => {
  try {
    const result = await Project.findById(ctx.params.id);
    if (!result) {
      throw new Error('Project failed to delete all documents');
    } else {
      ctx.body = result;
    }
  } catch (error) {
    throw new Error(error.errors.version.message);
  }
};

exports.createProject = async (ctx) => {
  Joi.validate(ctx.request.body, Validator.registerProject);
  const result = await Project.create({
    name: ctx.request.body.name,
    versionProject: ctx.request.body.version,
    date: ctx.request.body.date,
    categories: ctx.request.body.categories,
    tasks: ctx.request.body.tasks,
  });
  if (!result) {
    throw new Error(error);
  } else {
    ctx.body = result;
  }
};

exports.updateProject = async (ctx) => {
  try {
    const result = await Project
        .findByIdAndUpdate(ctx.params.id, ctx.request.body, {new: true});
    if (!result) {
      throw new Error('Can\t update a project ! ');
    } else {
      ctx.body = result;
    }
  } catch (error) {
    throw new Error(error);
  }
};

exports.deleteProject = async (ctx) => {
  const result = await Project.findOneAndRemove({'_id': ctx.params.id});
  if (!result) {
    throw new Error('Project failed to delete.');
  } else {
    ctx.status = 200;
    ctx.body = 'Project deleted';
  }
};

exports.deleteAll = async (ctx) => {
  try {
    const result = await Project.deleteMany({});
    if (!result) {
      throw new Error('Project failed to delete all documents');
    }
  } catch (error) {
    throw new Error(error.errors.version.message);
  }
};
