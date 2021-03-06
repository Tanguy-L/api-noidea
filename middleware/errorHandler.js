module.exports = async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404) {
      ctx.body = 'The route that you search is not exist';
    }
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;

    if (err.message.includes('duplicate key error')) {
      ctx.body = 'Error, you try to create object with duplicate key';
    }
    if (err.message.includes('Path `versionProject` is invalid')) {
      ctx.body = 'Invalid Regex for version Project';
    }
    ctx.app.emit('error', err, ctx);
  }
}
;
