var img13 = new app.singleImg({
	name: 'p13',
	src: 'img/p13',
	thumb: 'img/p13_s.jpg'
});

var img14 = new app.singleImg({
	name: 'p14',
	src: 'img/p14',
	thumb: 'img/p14_s.jpg'
});

var img15 = new app.singleImg({
	name: 'p15',
	src: 'img/p15',
	thumb: 'img/p15_s.jpg'
});

var img16 = new app.singleImg({
	name: 'p16',
	src: 'img/p16',
	thumb: 'img/p16_s.jpg'
});

var img17 = new app.singleImg({
	name: 'p17',
	src: 'img/p17',
	thumb: 'img/p17_s.jpg'
});


var gallery = new app.ImgCollection([
	img16, img17
]);

gallery.add([img13, img14, img15])

console.log(gallery.toJSON());

var galleryView = new app.allImgView({collection: gallery});

$('#viewer').html(galleryView.render().el);