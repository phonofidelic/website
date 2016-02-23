var artView = {
  init: function() {
    this.render();
  },
  render: function() {
    var imgList = controller.getList('art');

    // create viewer element
    for (var i = 0; i < 5; i++) {

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

          console.log('artView.render: ');
          console.log(imgCopy);
        }
      })(imgList[i]));

      thumbDiv.appendChild(thumbImg);
      $('#artViewer').append(thumbDiv);
    }
  }
};

artView.init();