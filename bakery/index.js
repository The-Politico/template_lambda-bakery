/* DEVELOPMENT SERVER */
require('dotenv').config();

const server = require('./src');
const port = 3333;
server.listen(port, () => console.log(`Example app listening on port ${port}!`));
