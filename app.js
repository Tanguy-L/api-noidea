const Koa = require('koa');
import mongoose from 'mongoose';
const convert = require('koa-convert');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const error = require('koa-json-error');
const logger = require('koa-logger');
const koaRes = require('koa-res');
const cors = require('koa2-cors');
const app = new Koa();
const test = require('./middleware/errorHandler');
const http = require('http');

app.use(cors({
  origin: function(ctx) {
    if (ctx.url === '/test') {
      return false;
    }
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}
));

const router = new Router();


app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

app.on('error', (err, ctx) => {
  ctx.body = err.message;
  if (err.message.includes('is required.')) {
    const stringErr = err.message.split('`')[1];
    ctx.body = stringErr + ' is required';
  }
});

mongoose.Promise = require('bluebird');

const DATABASE_URL = process.env.DATABASE_URL || 'localhost:27017';

mongoose
    .connect(`mongodb://${DATABASE_URL}/api_no_idea`)
    .then((response) => {
      console.log('mongo connection created');
    })
    .catch((err) => {
      console.log('Error connecting to Mongo');
      console.log(err);
    });

app.use(bodyParser());

require('./router/routerProject')({router});
require('./router/routerTask')({router});
require('./router/routerStatus')({router});
require('./router/routerCategory')({router});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(error());
app.use(test);

// app.use(convert(koaRes()));
// logging
app.use(logger());

const server = http.createServer(app.callback()).listen(3000);
console.log('Server listen on localhost:3000');
module.exports = server;
