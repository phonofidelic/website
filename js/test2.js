var readdirp = require('readdirp'),
	    path = require('path'),
	      es = require('event-stream');

var stream = readdirp({ root: 'img', fileFilter: '*.jpg' });
stream
	.on('data', function (entry) {
		console.log(typeof(entry.path));
		console.log(entry.path);
	});