// store img objects here
var model = {
  testList: [],
  currentSelect: null,

  // imgArray: [
  //   // { id: 'img_1', src: 'img/projects/art_framed.jpg', thumb: 'img/thumbs/art_framed_s.jpg' },
  //   // { id: 'img_2', src: 'img/projects/art_like.jpg', thumb: 'img/thumbs/art_like_s.jpg' },
  //   { id: 'img_3', src: 'img/projects/art_pilot.jpg', thumb: 'img/thumbs/art_pilot_s.jpg' },
  //   // { id: 'img_4', src: 'img/projects/art_red_wall1.jpg', thumb: 'img/thumbs/art_red_wall1_s.jpg' },
  //   { id: 'img_5', src: 'img/projects/art_smoker.jpg', thumb: 'img/thumbs/art_smoker_s.jpg' },
  //   // { id: 'img_6', src: 'img/projects/art_stranden.jpg', thumb: 'img/thumbs/art_stranden_s.jpg' },
  //   { id: 'img_7', src: 'img/projects/art_suspended.jpg', thumb: 'img/thumbs/art_suspended_s.jpg' },
  //   { id: 'img_8', src: 'img/projects/art_unnamed1.jpg', thumb: 'img/thumbs/art_unnamed1_s.jpg' },
  //   { id: 'img_9', src: 'img/projects/art_unnamed2.jpg', thumb: 'img/thumbs/art_unnamed2_s.jpg' },
  //   // { id: 'img_11', src: 'img/projects/ill1.jpg', thumb: 'img/thumbs/ill1_s.jpg' },
  //   // { id: 'img_12', src: 'img/projects/ill2.jpg', thumb: 'img/thumbs/ill2_s.jpg' },
  //   { id: 'img_13', src: 'img/projects/ill3.jpg', thumb: 'img/thumbs/ill3_s.jpg' },
  //   { id: 'img_14', src: 'img/projects/ill4.jpg', thumb: 'img/thumbs/ill4_s.jpg' },
  //   { id: 'img_15', src: 'img/projects/ill5.jpg', thumb: 'img/thumbs/ill5_s.jpg' },
  //   { id: 'img_16', src: 'img/projects/ill6.jpg', thumb: 'img/thumbs/ill6_s.jpg' },
  //   { id: 'img_17', src: 'img/projects/kilroy.jpg', thumb: 'img/thumbs/kilroy_s.jpg' },
  //   { id: 'img_18', src: 'img/projects/kitchencd.jpg', thumb: 'img/thumbs/kitchencd_s.jpg' },
  //   { id: 'img_20', src: 'img/projects/p10.jpg', thumb: 'img/thumbs/p10_s.jpg' },
  //   { id: 'img_21', src: 'img/projects/p11.jpg', thumb: 'img/thumbs/p11_s.jpg' },
  //   { id: 'img_22', src: 'img/projects/p12.jpg', thumb: 'img/thumbs/p12_s.jpg' },
  //   { id: 'img_23', src: 'img/projects/p13.jpg', thumb: 'img/thumbs/p13_s.jpg' },
  //   { id: 'img_24', src: 'img/projects/p14.jpg', thumb: 'img/thumbs/p14_s.jpg' },
  //   { id: 'img_25', src: 'img/projects/p15.jpg', thumb: 'img/thumbs/p15_s.jpg' },
  //   { id: 'img_26', src: 'img/projects/p16.jpg', thumb: 'img/thumbs/p16_s.jpg' },
  //   { id: 'img_27', src: 'img/projects/p17.jpg', thumb: 'img/thumbs/p17_s.jpg' },
  //   { id: 'img_28', src: 'img/projects/p1.jpg', thumb: 'img/thumbs/p1_s.jpg' },
  //   { id: 'img_29', src: 'img/projects/p3.jpg', thumb: 'img/thumbs/p3_s.jpg' },
  //   { id: 'img_30', src: 'img/projects/p4.jpg', thumb: 'img/thumbs/p4_s.jpg' },
  //   { id: 'img_31', src: 'img/projects/p5.jpg', thumb: 'img/thumbs/p5_s.jpg' },
  //   { id: 'img_32', src: 'img/projects/p6.jpg', thumb: 'img/thumbs/p6_s.jpg' },
  //   { id: 'img_33', src: 'img/projects/p8.jpg', thumb: 'img/thumbs/p8_s.jpg' },
  //   { id: 'img_34', src: 'img/projects/p9.jpg', thumb: 'img/thumbs/p9_s.jpg' },
  //   { id: 'img_36', src: 'img/projects/scragcd.jpg', thumb: 'img/thumbs/scragcd_s.jpg' },
  //   { id: 'img_37', src: 'img/projects/vanjascd.jpg', thumb: 'img/thumbs/vanjascd_s.jpg' }
  // ]
};

var controller = {
  init: function() {
    listView.init();
    modalView.init();
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
