const task = require('../controller/taskController');

module.exports = ({router}) => {
  router.post('/v1/projects/:id/tasks', task.createTask);
  router.get('/v1/projects/:id/tasks', task.getAllTasks);
  router.put('/v1/projects/tasks/:id', task.updateTask);
  router.delete('/v1/projects/tasks/:id', task.deleteTask);
};
