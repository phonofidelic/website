// store img objects here
var webModel = {
  currentImg: null,

  imgArray: [
    {
      id: 'web_1',
      src: [
        'img/web/hoodMap1.jpg',
        'img/web/hoodMap2.jpg'
      ],
      thumbs: [
        'img/web/hoodMap1_s.jpg',
        'img/web/hoodMap2_s.jpg'
      ]
    },
    {
      id: 'web_2',
      src: [
        'img/web/hanna1.jpg',
        'img/web/hanna2.jpg'
      ],
      thumbs: [
        'img/web/hanna1_s.jpg',
        'img/web/hanna2_s.jpg'
      ]
    }
  ]
};

var webControler = {
  init: function() {
    webListView.init();
    // webModalView.init();
  },
  getCurrentImg: function() {

  }
};

var webListView = {
  init: function() {
    this.render();
  },
  render: function() {
    // create viewer element
    for (var i = 0; i < webModel.imgArray.length; i++) {
      // itterate through imgArray
      var img = webModel.imgArray[i];

      // Build each img-viewer thumb element
      var thumbDiv = document.createElement('span');
      $(thumbDiv).addClass('thumb');
      var thumbImg = document.createElement('img');
      $(thumbImg).attr('src', webModel.imgArray[i].thumbs[0]);
      $(thumbImg).attr('data-toggle', 'modal');
      $(thumbImg).attr('data-target', '#img-modal');

      // click event
      thumbImg.addEventListener('click', (function(imgCopy) {
        return function() {

          // Set content for modal-body
          $('.modal-body').html('<img src="'+imgCopy.src[0]+'" class="project-img img-responsive">');
          console.log(imgCopy);

          currentImg = imgCopy.id;
        }
      })(img));

      thumbDiv.appendChild(thumbImg);
      $('#webViewer').append(thumbDiv)
    }
  }
};

//---------------------------------------------------!!!! NAV ARROWS SHOWING UP DOUBLE
// var webModalView = {
//   init: function() {
//     this.render();
//   },
//   render: function() {
//   // Build modal-footer elements
//   var leftNav = document.createElement('div');
//   $(leftNav).addClass('arrow-nav left');
//   $(leftNav).html('<span class="glyphicon glyphicon-arrow-left" data-target="#img-modal"></span>');
//   $('.modal-footer').append(leftNav);

//   var rightNav = document.createElement('div');
//   $(rightNav).addClass('arrow-nav right');
//   $(rightNav).html('<span class="glyphicon glyphicon-arrow-right" data-target="#img-modal"></span>');
//   $('.modal-footer').append(rightNav);
//   }
// };



webControler.init();
