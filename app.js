
const logger = require('morgan');
const express = require('express');
const cors = require('cors');
const { DataSource } = require('typeorm');

const dotenv = require("dotenv").config();

const routes = require("./routes");

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(routes);



app.get('/ping', function(req, res, next){
    res.status(200).json({message: 'pong'})
});

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`server listening on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}

start();