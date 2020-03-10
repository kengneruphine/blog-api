const http = require('http');
const app = require('./app');
require('dotenv').config();

const server = http.createServer(app);
const port = process.env.PORT;

app.set('port', port);

server.listen(port);

server.on('listening', () => {
    console.log('Server started on http://localhost:4000');
});
