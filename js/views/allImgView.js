// Namespace galleryApp
var app = app || {};

// View for all images (thumbs)
app.allImgView = Backbone.View.extend({

	tagName: 'div',
	className: 'img-collection',
	render : function() {
		this.collection.each(this.addImg, this);
		return this;
	},
	addImg : function(img) {
		var imgView = new app.singleImgView({model: img});
		this.$el.append(imgView.render().el);
	}
});