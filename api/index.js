require('dotenv').config();
const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// const whiteList = ['http://localhost:5555'];
// const options = {
//     origin: (origin, callback) => {
//         if(whiteList.includes(origin)){
//             callback(null, true)
//         }else{
//             callback(new Error(`Not allowed`));
//         }
//     }
// }
// app.use(cors(options)) // Solo acceden orifenes en el array
app.use(cors()) // todos los origenes

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port,() => { console.log(`APP run in port ${port}`) })