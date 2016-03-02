var Gallery = function (name, type, maxLength) {
    // set up private values for the gallery object
    this.imgList = controller.getList(type);
    this.elementId = name;
    this.galleryLength = maxLength;
};

Gallery.prototype.makeThumbs = function() {
    // create thumbnail elements
    for (var i = 0; i < this.galleryLength; i++) {
        var thumbDiv = document.createElement('span');
        $(thumbDiv).addClass('thumb');
        var thumbImg = document.createElement('img');
        $(thumbImg).attr('src', this.imgList[i].thumb);
        $(thumbImg).attr('data-toggle', 'modal');
        $(thumbImg).attr('data-target', '#img-modal');

        // click event
        thumbImg.addEventListener('click', (function(imgCopy) {
            return function() {
            // Set current sellection in model
            controller.setSelect(imgCopy);
            // Set selected content for modal body
            modalView.render();
            }
        })(this.imgList[i]));

        // attach thumb img to div element
        thumbDiv.appendChild(thumbImg);

        // append each div element to gallery section
        $(this.elementId).append(thumbDiv)
    }
};
