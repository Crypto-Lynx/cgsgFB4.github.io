const http = require("http"); //loading http module
const fs = require('fs').promises; //load the HTML file in place

const host = 'localhost'; //localhost is a special private address that computers use to refer to themselves
const port = 8000; //the port is a number that servers use as an endpoint or “door” to our IP address 

let messages = [];

const requestListener = function (req, res) { //this function is meant to handle an incoming HTTP request and return an HTTP response
    /*console.log(
        `Request: ${req.method}, ${req.url}`
    );
       console.log(
           `Request headers: ${JSON.stringify(req.headers)}`
       );*/

    let fileName;
    let contentType;

    if (req.url === "/msg" && req.method === "POST") {
        let data = "";
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            messages.push(JSON.parse(data));
            res.end();
        })
        return;


    } else if (req.url === "/msg" && req.method === "GET") {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify(messages));
        return;
    }

    if (req.url === "/") {
        fileName = "index.html";
        contentType = "text/html";
    }
    else if (req.url.endsWith(".css")) {
        fileName = req.url.substr(1);
        contentType = "text/css";
    } else {
        res.writeHead(500);
        res.end("Error, unsupported");
        return;
    }

    fs.readFile(`${__dirname}/${fileName}`)
        .then(contents => {
            res.setHeader("Content-Type", contentType);
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err.message);
            return;
        });
};

const server = http.createServer(requestListener); //this server accepts HTTP requests and passes them on to our requestListener() function.
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});