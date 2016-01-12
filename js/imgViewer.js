// store img objects here
var model = {
  testList: [],
  currentSelect: null,
};

var controller = {
  init: function() {
    listView.init();
    modalView.init();
    contactView.init();
  },

  getList: function() {
    var list = Model.filter(function(list){
      return list.category == 'print';
    });
    // reverse to show newest to oldest
    return list.reverse();
  },
  setSelect: function(select) {
    return model.currentSelect = select;
    console.log('setSelect: '+select);
  },
  getSelect: function() {
    return model.currentSelect;
  },
  incSelect: function() {
    model.currentSelect.id++;
    modalView.render();
    console.log('incSelect +');
  },
  decSelect: function() {
    model.currentSelect.id--;
    modalView.render();
    console.log('decSelect -');
  }
};

var listView = {
  init: function() {
    this.render();
  },
  render: function() {
    var imgList = controller.getList();

    // create viewer element
    for (var i = 0; i < imgList.length; i++) {

      imgList[i].id = i;

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

          console.log('listView.render: ');
          console.log(imgCopy);
        }
      })(img));

      thumbDiv.appendChild(thumbImg);
      $('#viewer').append(thumbDiv)
    }
  }
};

controller.init();
