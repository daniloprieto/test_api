const express = require('express');
const app = express();
const port = 3000;
const routerApi = require('./routes');

const { logErrors, errorHandler } = require('./middlewares/error.handler');

app.use(express.json());

routerApi(app);

app.use(logErrors);
app.use(errorHandler);

app.listen(port,() => { console.log(`APP run in port ${port}`) })