// array containing info for each slide img

// var slideImages = [
// 	{
// 		'img': 'images/img_1789.jpg',
// 		'info': 'This is the first slide'
// 	},
// 		{
// 		'img': 'images/img_1922.jpg',
// 		'info': 'This is the secons slide'
// 	},
// 		{
// 		'img': 'images/img_1982.jpg',
// 		'info': 'This is the third slide'
// 	},
// 		{
// 		'img': 'images/img_1987.jpg',
// 		'info': 'This is the fourth slide'
// 	},
// 		{
// 		'img': 'images/img_1988.jpg',
// 		'info': 'This is the fifth slide'
// 	},
// 		{
// 		'img': 'images/img_2014.jpg',
// 		'info': 'This is the sixth slide'
// 	},
// 		{
// 		'img': 'images/img_2016.jpg',
// 		'info': 'This is the seventh slide'
// 	}
// ];

// var slideContent = function() {

// 	for (var i = 0; i < slideImages.length; i++) {

// 		// create div element and set id for each slide
// 		slideDiv = document.createElement('div');
// 		slideDiv.setAttribute('id', 'img'+[i]);
// 		slideDiv.setAttribute('class', 'slide-info');

// 		//create img element and set path for each slide
// 		slideImg = document.createElement('img');
// 		slideImg.setAttribute('src', slideImages[i].img);

// 		$('.slides-container').append(slideDiv);
// 		$('#img'+[i]).append(slideImg);
// 	}
// }
// slideContent();
// append each info object to corresponding img div id

$('#img1').append('<div class="slide-info">,<h2>This is the first slide</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed ligula id nulla laoreet commodo. Vestibulum quis metus sit amet leo ultricies ultricies ut ut tellus. Suspendisse scelerisque vulputate purus.</p></div>');
$('#img2').append('<div class="slide-info">,<h2>This is the second slide</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus erat ut lacus porttitor fringilla. Nunc at auctor tortor. Donec sodales porttitor dolor ac efficitur. Integer vitae libero eget ante.</p></div>');
$('#img3').append('<div class="slide-info">,<h2>This is the third slide</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus gravida nisi in placerat. Nullam rhoncus libero quis neque eleifend, eget sodales justo viverra. Duis gravida velit ut diam pulvinar.</p></div>');
$('#img4').append('<div class="slide-info">,<h2>This is the fourth slide</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In arcu neque, euismod elementum venenatis eget, vestibulum at nibh. Cras dui purus, ultrices eget dictum a, auctor eu arcu. Donec tortor.</p></div>');
$('#img5').append('<div class="slide-info">,<h2>This is the fifth slide</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In arcu neque, euismod elementum venenatis eget, vestibulum at nibh. Cras dui purus, ultrices eget dictum a, auctor eu arcu. Donec tortor.</p></div>');
$('#img6').append('<div class="slide-info">,<h2>This is the sixth slide</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dictum est sed mi commodo, congue tincidunt metus eleifend. Donec ligula erat, sollicitudin a felis ut, aliquet vulputate neque. Phasellus libero.</p></div>');
$('#img7').append('<div class="slide-info">,<h2>This is the seventh slide</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vehicula magna sodales magna tincidunt porta. Donec at risus sapien. Vivamus lobortis lectus nec enim eleifend, in tempor nibh porta. Vivamus.</p></div>');


// var slideDisplay = function() {
// 	$('#img'+[i]).append(slideDiv);
// }