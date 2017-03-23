
// configuration    =============================================================================================================================
  // Load required modules
  var http        = require('http');    // http server core module
  var express     = require('express'); // web framework external module
  var api         = require('./lib/api');     // api
  var httpApp     = express();

  // Start Express http server on port 5050
  var webServer = http.createServer(httpApp).listen(5050);

  // Setup and configure Express http server. Expect a subfolder called "public" to be the web root.
  httpApp.use("/", express.static("../public"));
  httpApp.use("/api", api);
