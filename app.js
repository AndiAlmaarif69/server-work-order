var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var app = express();

//import router component API
const participantRouter = require("./app/api/v1/participant/router");
const authCMSRouter = require("./app/api/v1/auth/router");
const ownerRouter = require("./app/api/v1/owner/router");
const imagesRouter = require("./app/api/v1/images/router");
const serviceRouter = require("./app/api/v1/service/router");
const ordersRouter = require("./app/api/v1/order/router");

// membuat variabel v1
const v1 = "/api/v1";

// middlewares
const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handler-error');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Welcome to api semina',
    });
  });

  // Gunakan categories router
  app.use(`${v1}`, participantRouter);
  app.use(`${v1}/cms`, authCMSRouter);
  app.use(`${v1}/cms`, ownerRouter);
  app.use(`${v1}/cms`, imagesRouter);
  app.use(`${v1}/cms`, serviceRouter);
  app.use(`${v1}/cms`, ordersRouter);

  // middlewares
  app.use(notFoundMiddleware);
  app.use(handleErrorMiddleware);

module.exports = app;
