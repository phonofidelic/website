var controller = {
  init: function() {
    printView.init();
    modalView.init();
    // contactView.init();
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
var model = {currentSelect: {category: null, src: null, thumb: null, id: null}};

// controller.init();
