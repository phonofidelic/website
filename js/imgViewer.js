// store img objects here
var model = {
  testList: [],
  currentSelect: null,

  imgArray: [
    // { id: 'img_1', src: 'img/projects/art_framed.jpg', thumb: 'img/thumbs/art_framed_s.jpg' },
    // { id: 'img_2', src: 'img/projects/art_like.jpg', thumb: 'img/thumbs/art_like_s.jpg' },
    { id: 'img_3', src: 'img/projects/art_pilot.jpg', thumb: 'img/thumbs/art_pilot_s.jpg' },
    // { id: 'img_4', src: 'img/projects/art_red_wall1.jpg', thumb: 'img/thumbs/art_red_wall1_s.jpg' },
    { id: 'img_5', src: 'img/projects/art_smoker.jpg', thumb: 'img/thumbs/art_smoker_s.jpg' },
    // { id: 'img_6', src: 'img/projects/art_stranden.jpg', thumb: 'img/thumbs/art_stranden_s.jpg' },
    { id: 'img_7', src: 'img/projects/art_suspended.jpg', thumb: 'img/thumbs/art_suspended_s.jpg' },
    { id: 'img_8', src: 'img/projects/art_unnamed1.jpg', thumb: 'img/thumbs/art_unnamed1_s.jpg' },
    { id: 'img_9', src: 'img/projects/art_unnamed2.jpg', thumb: 'img/thumbs/art_unnamed2_s.jpg' },
    // { id: 'img_11', src: 'img/projects/ill1.jpg', thumb: 'img/thumbs/ill1_s.jpg' },
    // { id: 'img_12', src: 'img/projects/ill2.jpg', thumb: 'img/thumbs/ill2_s.jpg' },
    { id: 'img_13', src: 'img/projects/ill3.jpg', thumb: 'img/thumbs/ill3_s.jpg' },
    { id: 'img_14', src: 'img/projects/ill4.jpg', thumb: 'img/thumbs/ill4_s.jpg' },
    { id: 'img_15', src: 'img/projects/ill5.jpg', thumb: 'img/thumbs/ill5_s.jpg' },
    { id: 'img_16', src: 'img/projects/ill6.jpg', thumb: 'img/thumbs/ill6_s.jpg' },
    { id: 'img_17', src: 'img/projects/kilroy.jpg', thumb: 'img/thumbs/kilroy_s.jpg' },
    { id: 'img_18', src: 'img/projects/kitchencd.jpg', thumb: 'img/thumbs/kitchencd_s.jpg' },
    { id: 'img_20', src: 'img/projects/p10.jpg', thumb: 'img/thumbs/p10_s.jpg' },
    { id: 'img_21', src: 'img/projects/p11.jpg', thumb: 'img/thumbs/p11_s.jpg' },
    { id: 'img_22', src: 'img/projects/p12.jpg', thumb: 'img/thumbs/p12_s.jpg' },
    { id: 'img_23', src: 'img/projects/p13.jpg', thumb: 'img/thumbs/p13_s.jpg' },
    { id: 'img_24', src: 'img/projects/p14.jpg', thumb: 'img/thumbs/p14_s.jpg' },
    { id: 'img_25', src: 'img/projects/p15.jpg', thumb: 'img/thumbs/p15_s.jpg' },
    { id: 'img_26', src: 'img/projects/p16.jpg', thumb: 'img/thumbs/p16_s.jpg' },
    { id: 'img_27', src: 'img/projects/p17.jpg', thumb: 'img/thumbs/p17_s.jpg' },
    { id: 'img_28', src: 'img/projects/p1.jpg', thumb: 'img/thumbs/p1_s.jpg' },
    { id: 'img_29', src: 'img/projects/p3.jpg', thumb: 'img/thumbs/p3_s.jpg' },
    { id: 'img_30', src: 'img/projects/p4.jpg', thumb: 'img/thumbs/p4_s.jpg' },
    { id: 'img_31', src: 'img/projects/p5.jpg', thumb: 'img/thumbs/p5_s.jpg' },
    { id: 'img_32', src: 'img/projects/p6.jpg', thumb: 'img/thumbs/p6_s.jpg' },
    { id: 'img_33', src: 'img/projects/p8.jpg', thumb: 'img/thumbs/p8_s.jpg' },
    { id: 'img_34', src: 'img/projects/p9.jpg', thumb: 'img/thumbs/p9_s.jpg' },
    { id: 'img_36', src: 'img/projects/scragcd.jpg', thumb: 'img/thumbs/scragcd_s.jpg' },
    { id: 'img_37', src: 'img/projects/vanjascd.jpg', thumb: 'img/thumbs/vanjascd_s.jpg' }
  ]
};

var controller = {
  testList: [],
  init: function() {
    listView.init();
    modalView.init();
  },

  controllerModel: function(condition) {
    for (var i; i < Model.length; i++) {
      var index = Model[i];
      if (index.category === condition) {
        this.testList.push(index);
        // return Model;
        console.log('match');
      } else {
        console.log('no match');
      }
    }
    model.testList.push(Model[i]);
    console.log('test');
    console.log(condition);
  },

  pointer: function(index) {
    return model.imgArray[index];
  },

  getList: function() {
    return model.imgArray;
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

var modalView = {
  init: function() {
    // Build modal elements
    var imgModal = document.createElement('div');
    $(imgModal).addClass('modal fade');
    $(imgModal).attr('id', 'img-modal');
    $(imgModal).attr('tabindex', -1);
    $(imgModal).attr('aria-labelledy', 'myModalLabel');

    imgModal.appendChild(
      this.modalDialog = document.createElement('div'),
      $(this.modalDialog).addClass('modal-dialog'),
      $(this.modalDialog).attr('role', 'document')
    );

    this.modalDialog.appendChild(
      this.modalContent = document.createElement('div'),
      $(this.modalContent).addClass('modal-content')
    );

    // Modal header
    this.modalContent.appendChild(
      this.modalHeader = document.createElement('div'),
      $(this.modalHeader).addClass('modal-header')
    );

    this.modalHeader.appendChild(
      this.close = document.createElement('button'),
      $(this.close).addClass('close'),
      $(this.close).attr('type', 'button'),
      $(this.close).attr('data-dismiss', 'modal'),
      $(this.close).attr('aria-label', 'Close')
    );

    this.close.appendChild(
      this.closeSpan = document.createElement('span'),
      $(this.closeSpan).attr('aria-hidden', 'true'),
      $(this.closeSpan).text('x')
    );

    // Modal body
    this.modalContent.appendChild(
      this.modalBody = document.createElement('div'),
      $(this.modalBody).addClass('modal-body'),
      $(this.modalBody).attr('id', 'project-img' /* TODO: dynamic id name? */) //*************************

    );
    // Modal Image
    this.modalContent.appendChild(
      this.modalImg = document.createElement('img'),
      $(this.modalImg).addClass('project-img img-responsive'),
      $(this.modalImg).attr('src', '')
    );

    // Modal footer
    this.modalContent.appendChild(
      this.modalFooter = document.createElement('div'),
      $(this.modalFooter).addClass('modal-footer')
    );

    $('body').append(imgModal);

    // Build modal-footer elements
    var leftNav = document.createElement('div');
    $(leftNav).addClass('arrow-nav left');
    $(leftNav).html('<span class="glyphicon glyphicon-arrow-left" data-target="#img-modal"></span>');
    $('.modal-footer').append(leftNav);

    var rightNav = document.createElement('div');
    $(rightNav).addClass('arrow-nav right');
    $(rightNav).html('<span class="glyphicon glyphicon-arrow-right" data-target="#img-modal"></span>');
    $('.modal-footer').append(rightNav);

    // Nav button eventlistiners
    leftNav.addEventListener('click', function() {
      controller.decSelect();
    });
    rightNav.addEventListener('click', function() {
      controller.incSelect();
    });

    this.render();
  },
  render: function() {
    this.selectedContent = controller.getSelect();
    $(this.modalImg).attr('src', this.selectedContent.src);

    console.log('modalView.render: ');
    console.log(this.selectedContent);
  }
};



controller.init();
