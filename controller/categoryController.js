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

exports.addCategoryToProject = async (ctx) => {
  try {
    let categories = ctx.request.body.categories;
    let result;
    if (categories.length > 0) {
      switch (categories.length) {
        case 1:
            result = await Project
            .update({ _id: { $eq: ctx.params.id } }, { $push: { categories: categories[0] } });
          break;
        case 2:
          result = await Project
            .update({ _id: { $eq: ctx.params.id } }, { $push: { categories: { $each: [ categories[0], categories[1] ] } } });
          break;
        case 3:
          result = await Project
            .update({ _id: { $eq: ctx.params.id } }, { $push: { categories: { $each: [  categories[0], categories[1], categories[2] ] } } });
          break;
        default:
          result = null;
      }
    }
    if (!result) {
      throw new Error('Can\t update a project ! ');
    } else {
      ctx.body = result;
    }
  } catch (error) {
    throw new Error(error);
  }
}

exports.removeCategoryToProject = async (ctx) => {
  try {
    let categories = ctx.request.body.categories;
    let result;
    switch (categories.length) {
      case 1:
          result = await Project
          .update({ _id: { $eq: ctx.params.id } }, { $pull: { categories: categories[0] } });
        break;
      case 2:
        result = await Project
          .update({ _id: { $eq: ctx.params.id } }, { $pull: { categories: { $each: [ categories[0], categories[1] ] } } });
        break;
      case 3:
        result = await Project
          .update({ _id: { $eq: ctx.params.id } }, { $pull: { categories: { $each: [  categories[0], categories[1], categories[2] ] } } });
        break;
      default:
        result = null;
    }
    categories.forEach(async category => {
      console.log(category);
      try {
        await Project.update({'tasks.category': category}, {
          $pull: {tasks: {'category': category}},
        });
      } catch (error) {
        console.error(error);
      }
    });
    if (!result) {
      throw new Error('Can\t update a project ! ');
    } else {
      ctx.body = result;
    }
  } catch (error) {
    throw new Error(error);
  }
};
