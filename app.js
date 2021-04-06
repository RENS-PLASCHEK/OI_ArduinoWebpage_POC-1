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