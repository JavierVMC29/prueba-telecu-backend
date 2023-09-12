require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var departamentosRouter = require('./routes/departamentos');
var visitantesRouter = require('./routes/visitantes');
var visitasRouter = require('./routes/visitas');
var loginRouter = require('./routes/login');

const { errorHandler, invalidPathHandler } = require('./error');

const authMiddleware = require('./middlewares/auth');

var app = express();

app.use(errorHandler);

if (process.env.ENVIRONMENT === 'prod') {
  const allowedOrigins = ['http://example1.com', 'http://example2.com'];

  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    preflightContinue: false
  };

  app.use(cors(corsOptions));
}

if (process.env.ENVIRONMENT === 'dev') {
  // Enable CORS for all routes
  app.use(cors());
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/departamentos', authMiddleware, departamentosRouter);
app.use('/api/visitantes', authMiddleware, visitantesRouter);
app.use('/api/visitas', authMiddleware, visitasRouter);
app.use('/api/login', loginRouter);

app.use(errorHandler);
app.use(invalidPathHandler);

module.exports = app;
