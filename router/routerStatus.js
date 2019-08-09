module.exports = ({router}) => {
  router.get('/v1', (ctx, next) => {
    ctx.body = {
      name: 'ApiNoIdea',
      version: 'v1.0.0',
      date: new Date(Date.now()),
      status: 'everything is ok !',
    };
  });
};
