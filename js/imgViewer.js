var printView = {
  init: function() {
    this.render();
  },
  render: function() {
    var imgList = controller.getList('print');

    // create viewer element
    for (var i = 0; i < 5; i++) {

      // imgList[i].id = i;

      // itterate through imgArray
      var img = imgList[i];

      // Build each img-viewer thumb element
      var thumbDiv = document.createElement('span');
      $(thumbDiv).addClass('thumb');
      var thumbImg = document.createElement('img');
      $(thumbImg).attr('src', imgList[i].thumb);
      $(thumbImg).attr('data-toggle', 'modal');
      $(thumbImg).attr('data-target', '#img-modal');

      // click event
      thumbImg.addEventListener('click', (function(imgCopy) {
        return function() {

          // Set current sellection in model
          controller.setSelect(imgCopy);
          // Set selected content for modal body
          modalView.render();

          console.log('printView.render: ');
          console.log(imgCopy);
        }
      })(img));

      thumbDiv.appendChild(thumbImg);
      $('#viewer').append(thumbDiv)
    }
  }
};

controller.init();
