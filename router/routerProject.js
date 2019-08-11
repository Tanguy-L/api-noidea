const project = require('../controller/projectController');

module.exports = ({router}) => {
  router.get('/v1/projects', project.getProjects);
  router.get('/v1/projects/:id', project.getProjectById);
  router.get('/throwerror', (ctx, next) => {
    throw new Error('Aghh! An error!');
  });
  router.post('/v1/projects', project.createProject);
  router.delete('/v1/projects/:id', project.deleteProject);
  router.put('/v1/projects/:id', project.updateProject);
};
