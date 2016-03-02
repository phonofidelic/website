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
  // incSelect: function() {
  //   model.currentSelect.id++;
  //   modalView.render();
  //   console.log('incSelect +');
  // },
  // decSelect: function() {
  //   model.currentSelect.id--;
  //   modalView.render();
  //   console.log('decSelect -');
  // },
  //** TODO **

  renderPortfolio: function() {
    var portfolioTest = [];
    var printGallery = new Gallery('#viewer', 'print', 5);
    var webGallery = new Gallery('#webViewer', 'web', 3);
    var artGallery = new Gallery('#artViewer', 'art', 2);

    portfolioTest.push(printGallery, webGallery, artGallery);

    for (var i = 0; i < portfolioTest.length; i++) {
      portfolioTest[i].makeThumbs();
    }
    return portfolioTest;
  }
};
var model = {currentSelect: {category: null, src: null, thumb: null, id: null}};

controller.init();
