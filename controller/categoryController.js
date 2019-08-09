const Category = require('../model/Category');

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
    const result = await Category.findOneAndRemove({'_id': ctx.params.id});
    if (!result) {
      throw new Error('Category failed to delete.');
    } else {
      ctx.status = 203;
      ctx.body = {message: 'success!'};
    }
  } catch (error) {
    throw new Error(error);
  }
};
