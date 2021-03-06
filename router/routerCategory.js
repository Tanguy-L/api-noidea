const category = require('../controller/categoryController');

module.exports = ({router}) => {
  router.post('/v1/categories', category.CreateCategory);
  router.get('/v1/categories', category.getCategories);
  router.delete('/v1/categories/:id', category.deleteCategory);
  router.patch('/v1/projects/:id/categories', category.addCategoryToProject);
  router.patch('/v1/projects/:id/categories/remove', category.removeCategoryToProject);
};
