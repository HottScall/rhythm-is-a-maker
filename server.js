'use strict';

const express = require('express');
const SocketServer = require('ws').Server;

const PORT = process.env.PORT || 3000;

const server = express()
  .use(express.static('public'))
  .use('/', require('./routes/index'))
  .set('view engine', 'ejs')
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});
