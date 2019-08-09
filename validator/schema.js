const joi = require('joi');

exports.registerProject = joi.object({
  name: joi.string().required(),
  version: joi.string().required().regex(/\b[v][\d]\b\.\b[\d]\b\.\b[\d]\b/),
  tasks: joi.array().required()
      .items(joi.string(), joi.string(), joi.object(), joi.boolean()),
  date: joi.date().required(),
})
;

exports.registerCategory = joi.object({
  name: joi.string().required(),
});

exports.registerTask = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  category: joi.object().required(),
  done: joi.boolean().required(),
});

exports.updateTask = joi.object({
  name: joi.string().optional(),
  description: joi.string().optional(),
  category: joi.object().optional(),
  done: joi.boolean().optional(),
});
