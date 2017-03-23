// configuration    =============================================================================================================================
  // Load required modules
  var http	      = require('http');				// http server core module
  var express 		= require('express');			// web framework external module
  var httpApp 		= express();

  // Start Express http server on port 8080
  var webServer = http.createServer(httpApp).listen(3000);

  // Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
  httpApp.use("/", express.static("public"));
