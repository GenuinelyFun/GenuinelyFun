const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello, World!");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, console.log(`listening on PORT ${PORT}`));
//https://www.golinuxcloud.com/http-get-request-in-node-js/