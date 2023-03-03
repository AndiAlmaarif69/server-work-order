var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var app = express();

//import router component API
const adminRouter = require("./app/api/v1/admin/router");
const participantRouter = require("./app/api/v1/participant/router");

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
  app.use(`${v1}/cms`, adminRouter);
  app.use(`${v1}/cms`, participantRouter);

  // middlewares
  app.use(notFoundMiddleware);
  app.use(handleErrorMiddleware);

module.exports = app;
