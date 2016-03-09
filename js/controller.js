var controller = {
  init: function() {
    // printView.init();
    modalView.init();
    // contactView.init();
    this.renderPortfolio();

  },

  // return all items where category is equal to 'print'
  getList: function(type) {
    var list = Model.filter(function(list){
      return list.category == type;
    });

    //return random selection from list
    var shuffle = function(arr) {
      for (var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
        return arr;
    }
    return shuffle(list);
  },

  setSelect: function(select) {
    return model.currentSelect = select;
    console.log('setSelect: '+select);
  },
  getSelect: function() {
    return model.currentSelect;
  },

  //** TODO **
  incSelect: function() {
    controller.indexRef += 1;
    model.currentSelect = Model[controller.indexRef];
    modalView.render();
  },
  decSelect: function() {
    controller.indexRef -= 1;
    model.currentSelect = Model[controller.indexRef];
    modalView.render();
  },
  //** TODO **

  renderPortfolio: function() {
    var portfolio = [];
    var printGallery = new Gallery('#printViewer', 'print', 5);
    var webGallery = new Gallery('#webViewer', 'web', 3);
    var artGallery = new Gallery('#artViewer', 'art', 1);

    portfolio.push(printGallery, webGallery, artGallery);

    for (var i = 0; i < portfolio.length; i++) {
      portfolio[i].makeThumbs();
    }
    return portfolio;
  },

  getModelLength: function() {
    return Model.length;
  }
};

// set initial model state
var model = {currentSelect: {category: null, src: null, thumb: null, id: null}};

controller.init();
