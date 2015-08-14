// store img objegts here
var imgArray = [
	{ id: 'img_0', src: 'img/.DS_Store' },
  { id: 'img_1', src: 'img/art_framed_s.jpg' },
  { id: 'img_2', src: 'img/art_like_s.jpg' },
  { id: 'img_3', src: 'img/art_pilot_s.jpg' },
  { id: 'img_4', src: 'img/art_red_wall1_s.jpg' },
  { id: 'img_5', src: 'img/art_smoker_s.jpg' },
  { id: 'img_6', src: 'img/art_stranden_s.jpg' },
  { id: 'img_7', src: 'img/art_suspended_s.jpg' },
  { id: 'img_8', src: 'img/art_unnamed1_s.jpg' },
  { id: 'img_9', src: 'img/art_unnamed2_s.jpg' },
  { id: 'img_10', src: 'img/box_s.jpg' },
  { id: 'img_11', src: 'img/ill1_s.jpg' },
  { id: 'img_12', src: 'img/ill2_s.jpg' },
  { id: 'img_13', src: 'img/ill3_s.jpg' },
  { id: 'img_14', src: 'img/ill4_s.jpg' },
  { id: 'img_15', src: 'img/ill5_s.jpg' },
  { id: 'img_16', src: 'img/ill6_s.jpg' },
  { id: 'img_17', src: 'img/kilroy_s.jpg' },
  { id: 'img_18', src: 'img/kitchencd_s.jpg' },
  { id: 'img_19', src: 'img/logo.png' },
  { id: 'img_20', src: 'img/p10_s.jpg' },
  { id: 'img_21', src: 'img/p11_s.jpg' },
  { id: 'img_22', src: 'img/p12_s.jpg' },
  { id: 'img_23', src: 'img/p13_s.jpg' },
  { id: 'img_24', src: 'img/p14_s.jpg' },
  { id: 'img_25', src: 'img/p15_s.jpg' },
  { id: 'img_26', src: 'img/p16_s.jpg' },
  { id: 'img_27', src: 'img/p17_s.jpg' },
  { id: 'img_28', src: 'img/p1_s.jpg' },
  { id: 'img_29', src: 'img/p3_s.jpg' },
  { id: 'img_30', src: 'img/p4_s.jpg' },
  { id: 'img_31', src: 'img/p5_s.jpg' },
  { id: 'img_32', src: 'img/p6_s.jpg' },
  { id: 'img_33', src: 'img/p8_s.jpg' },
  { id: 'img_34', src: 'img/p9_s.jpg' },
  { id: 'img_35', src: 'img/palms.JPG' },
  { id: 'img_36', src: 'img/scragcd_s.jpg' },
  { id: 'img_37', src: 'img/vanjascd_s.jpg' }
];

//Img object constructor
function Img(src, thumb, alt) {
	this.src = src;

	if (!src){
		console.log('no src specified');
	}
	if (!thumb){
		console.log('no thumb specified');
	}
	if (!alt){
		console.log('no alt specified');
	}
};

// for (var i = 0; i < imgArray.length; i++) {
// 	var img = new Img(imgArray[i].src, null, null)
// }

function Viewer() {
	this.li = document.createElement('li');
	this.link = document.createElement('a');
	this.div = document.createElement('div');
}

// var liItem = document.createElement('li'),
// 			link = document.createElement('a'),
// 			 div = document.createElement('div');






// galleriffic plugin init
$(document).ready(function($) {
    var gallery = $('#thumbs').galleriffic({

    });
});