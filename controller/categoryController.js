const Category = require('../model/Category');
const Project = require('../model/Project');

exports.CreateCategory = async (ctx) => {
  try {
    const result = await Category.create({
      name: ctx.request.body.name,
    });
    if (!result) {
      throw new Error('Category failed to create category');
    } else {
      ctx.body = result;
    }
  } catch (error) {
    throw new Error(error);
  }
};

exports.getCategories = async (ctx) => {
  try {
    const result = await Category.find({});
    if (!result) {
      throw new Error('There was an error retrieving your categories.');
    } else {
      ctx.body = result;
    }
  } catch (error) {
    throw new Error(error);
  }
};

exports.deleteCategory = async (ctx) => {
  try {
    const result = await Category.deleteOne({'_id': ctx.params.id});
    const result2 = await Project.update({'tasks.category': ctx.params.id}, {
      $pull: {tasks: {'category': ctx.params.id}},
    });
    if (!result && !result2) {
      throw new Error('Category failed to delete.');
    } else {
      ctx.status = 203;
      ctx.body = {message: 'success!'};
    }
  } catch (error) {
    throw new Error(error);
  }
};
