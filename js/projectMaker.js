//projects array
var projects = [
	{
		'id' : 'p1',
		'img_s' : 'images/p1_s.jpg',
		'img' : 'images/p1.jpg'
	},
		{
		'id' : 'p2',
		'img_s' : 'images/p2_s.jpg',
		'img' : 'images/p2.jpg'
	},
		{
		'id' : 'p3',
		'img_s' : 'images/p3_s.jpg',
		'img' : 'images/p3.jpg'
	},
		{
		'id' : 'p4',
		'img_s' : 'images/p4_s.jpg',
		'img' : 'images/p4.jpg'
	},
		{
		'id' : 'p5',
		'img_s' : 'images/p5_s.jpg',
		'img' : 'images/p5.jpg'
	},
		{
		'id' : 'p6',
		'img_s' : 'images/p6_s.jpg',
		'img' : 'images/p6.jpg'
	},
		{
		'id' : 'p7',
		'img_s' : 'images/p7_s.jpg',
		'img' : 'images/p7.jpg'
	},
		{
		'id' : 'p8',
		'img_s' : 'images/p8_s.jpg',
		'img' : 'images/p8.jpg'
	},
		{
		'id' : 'p9',
		'img_s' : 'images/p9_s.jpg',
		'img' : 'images/p9.jpg'
	},
		{
		'id' : 'p10',
		'img_s' : 'images/p10_s.jpg',
		'img' : 'images/p10.jpg'
	},
		{
		'id' : 'p11',
		'img_s' : 'images/p11_s.jpg',
		'img' : 'images/p11.jpg'
	},
		{
		'id' : 'p12',
		'img_s' : 'images/p12_s.jpg',
		'img' : 'images/p12.jpg'
	},
		{
		'id' : 'p13',
		'img_s' : 'images/p13_s.jpg',
		'img' : 'images/p13.jpg'
	},
		{
		'id' : 'p14',
		'img_s' : 'images/p14_s.jpg',
		'img' : 'images/p14.jpg'
	},
		{
		'id' : 'p15',
		'img_s' : 'images/p15_s.jpg',
		'img' : 'images/p15.jpg'
	},
		{
		'id' : 'p16',
		'img_s' : 'images/p16_s.jpg',
		'img' : 'images/p16.jpg'
	}
];

//array to hold created img elements
imgArray = [];

//make project thumbs and append to #projects
var projectMaker = function() {

	// loop through projects array and create div element for each one
	for (var i = 0; i < projects.length; i++) {

		var id = projects[i].id;
		var img_s = projects[i].img_s;
		var img = projects[i].img;

		//make project div element
		projElem = document.createElement('div');

		//make img element
		imgElem = document.createElement('img');

		//set project div atributes
		projElem.setAttribute('class', 'col-xs-1 col-sm-1 col-md-1 project')

		//set project id
		projElem.setAttribute('id', id);

		//set img src for thumbs
		imgElem.setAttribute('src', img_s);


		//push created img elements to imgArray
		imgArray.push(imgElem);

		//append project divs to #projects
		$('#projects').append(projElem);


		// $('.project').append(imgArray[i]);
			for (var img in imgArray) {

		$('#p'+img).append(imgArray[img]);
	}

	}
}

// var imgElemMaker = function () {

// 	for (var img in imgArray) {

// 		$('#p'+img).append(imgArray[img]);
// 	}
// }

var projectsRow = '<div class="row" id="projects"><!-- project thumbs --></div>';

$('#center-col').append(projectsRow);

projectMaker();
// imgElemMaker();