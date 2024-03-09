import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import connectDB from './config/connextDB';
import cors from 'cors';
require('dotenv').config();

let app = express();
app.use(cors()); 
let port = process.env.PORT || 6969;

// Add headers before the routes are defined
app.use(cookieParser('hfaofuwh'));
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

viewEngine(app);

//config app
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb' }));

// init web router
initWebRoutes(app);

connectDB();

app.listen(port, () => {
    console.log('Backend Nodejs is runing on the port : ' + port);
});





// import express from 'express';
// import bodyParser from 'body-parser';
// import viewEngine from './config/viewEngine';
// import initWebRoutes from './route/web';
// import connectDB from './config/connextDB';
// var cors = require("cors");
// require('dotenv').config();

// let app = express();
// app.use(cors()); 

// viewEngine(app);
// initWebRoutes(app);
// connectDB();


// app.use(function(req, res, next) {
//     next(createError(404));
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// });
  
//   // error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
  
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

// let port = process.env.PORT || 6969;    
// app.listen(port, () => {
//     console.log('Backend Nodejs is runing on the port : ' + port);
// })







