var fs = require('fs'),
  path = require('path');

// read contents of img directory
var imgDir = fs.readdirSync('img');
// console.log(imgDir);

// set paths to images in img directory
//and store them as objects in an array

/*

[
	{'img1'},
	{'img2'},
	{'img3'}
]

*/

for (var i = 0; i < imgDir.length; i++) {
	// console.log(imgDir[i]);
	console.log(path.extname(imgDir[i]));
}

// path.extname()