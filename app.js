// The package.json-file communicates the Node.js server with my Arduino.

// This file listens to the serial port and console.log anything that it receives.

var http = require('http');
var fs = require('fs');
var index = fs.readFileSync( 'index.html');

var SerialPort = require('serialport');

// create parser.
const parsers = SerialPort.parsers;

// tell node.js how to receive data coming in to the serial port.
// receive data anytime it receives a new line.  
const parser = new parsers.Readline({
    delimiter: '\r\n'
});

// opens up the port.
// specify the location of the port.
var port = new SerialPort('/dev/cu.usbmodem14401',{ 

    // specify settings.
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

// Attach port to parser.
port.pipe(parser);



// Create server called 'app'.
var app = http.createServer(function(req, res) {

    // returns value and context index.html-file. 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});


// io connection-setup.
var io = require('socket.io').listen(app);
// var io = require('socket.io')(app); 

// wait for connection event.
io.on('connection', function(socket) {
    
    // when connection happens, return 'Node is listening to port'.
    console.log('Node is listening to port');
    
});

// add on data event to parser. 
// Every data it receives will be placed in this data argument. 
parser.on('data', function(data) {
    
    console.log('Received data from port: ' + data);
    
    io.emit('data', data);
    
});

app.listen(3000);

