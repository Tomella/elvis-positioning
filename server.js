/**
 * This server is only to be used in DEV on a desktop. The 
 * real services are provided through the application server.
 * 
 * When the application is deployed on EC2 only the static
 * content is deployed and the API gateway routes service 
 * calls to the correct server.
 * 
 * At the time of writing this comment the services are 
 * provided through fsdf-elvis so if you need change
 * services change them there.
 * 
 */


process.env.NO_PROXY = "localhost";

var config = require("./lib/config");
var express = require("express");
var fs = require("fs");
var os = require('os');
var request = require('request');

//var httpProxy = require('http-proxy');
var app = express();
var url = require('url');


var StringDecoder = require('string_decoder').StringDecoder;
var yargs = require('yargs').options({
    'port': {
        'default': 3000,
        'description': 'Port to listen on.'
    },
    'public': {
        'type': 'boolean',
        'description': 'Run a public server that listens on all interfaces.'
    },
    'upstream-proxy': {
        'description': 'A standard proxy server that will be used to retrieve data.  Specify a URL including port, e.g. "http://proxy:8000".'
    },
    'bypass-upstream-proxy-hosts': {
        'description': 'A comma separated list of hosts that will bypass the specified upstream_proxy, e.g. "lanhost1,lanhost2"'
    },
    'help': {
        'alias': 'h',
        'type': 'boolean',
        'description': 'Show this help.'
    }
});
var argv = yargs.argv;
var port = process.env.PORT || argv.port;
var dontProxyHeaderRegex = /^(?:Host|Proxy-Connection|Accept-Encoding|Connection|Keep-Alive|Transfer-Encoding|TE|Trailer|Proxy-Authorization|Proxy-Authenticate|Upgrade)$/i;
// There should only ever be a couple. We do a contains on the requested host.
var validHosts = config.validHosts;
var upstreamProxy = argv['upstream-proxy'];

// eventually this mime type configuration will need to change
// https://github.com/visionmedia/send/commit/d2cb54658ce65948b0ed6e5fb5de69d022bef941
var mime = express.static.mime;
mime.define({
    'application/json': ['czml', 'json', 'geojson', 'topojson'],
    'model/vnd.gltf+json': ['gltf'],
    'model/vnd.gltf.binary': ['bgltf'],
    'text/plain': ['glsl']
});

// serve static files
app.use(express.static("dist"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.post('/positioning/upload', async (req, res, next) => {
    
    console.log(req);
    
    res.status(200).send("Goodo!");

});


app.all('/service/*', function (req, res, next) {
    var method, r;

    method = req.method.toLowerCase();

    console.log("URL: " + method + " " + SERVICES_ROOT + req.url);

    switch (method) {
        case "get":
            r = request.get({
                uri: SERVICES_ROOT + req.url,
                json: req.body
            });
            break;
        case "put":
            r = request.put({
                uri: SERVICES_ROOT + req.url,
                json: req.body
            });
            break;
        case "post":
            r = request.post({
                uri: SERVICES_ROOT + req.url,
                json: req.body
            });
            break;
        case "delete":
            r = request.del({
                uri: SERVICES_ROOT + req.url,
                json: req.body
            });
            break;
        default:
            return res.send("invalid method");
    }
    return req.pipe(r).pipe(res);
});

app.listen(port, function (err) {
    console.log("running server on port " + port);
});
