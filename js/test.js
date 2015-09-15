var fs = require('fs'),
  path = require('path'),
  fileArray = [];

// read contents of img directory and greates img object for each file in dir
fs.readdir('img/projects', function(err, files) {
	for (var i = 0; i < files.length; i++) {
		// instantiate File class and push new object to fileArray
		var file = new File('img_'+i, 'img/projects/'+files[i], 'img/thumbs/'+files[i]+'_s');
		fileArray.push(file);
	}

	console.log(fileArray);
	if (err) throw err;
});

// set paths to images in img directory
//and store them as objects in an array

// File constructor function
function File(name, src, thumb) {
	this.name = name;
	this.src = src;
	this.thumb = thumb;
};

/*** OUTPUT

[
	{ id: 'img_0', src: 'img/.DS_Store' },
	{ id: 'img_1', src: 'img/art_framed_s.jpg' },
	{ id: 'img_2', src: 'img/art_like_s.jpg' },
	...
]

*/