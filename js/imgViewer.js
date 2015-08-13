var imgArray = [
	{
		src: '../img/',
		thumb: '../img/',
		alt: 'this is an immage'
	}
];

function Img(src, thumb, alt) {
	this.prototype.src = src;
	this.prototype.thumb = thumb;
	this.prototype.alt = alt;

	if (thumb == null){
		console.log('no thumb specified');
	}
		if (alt == null){
		console.log('no alt specified');
	}
};

for (var i = 0; i < imgArray.length; i++) {
	var img = new Img(imgArray[i].src, null, null)
}