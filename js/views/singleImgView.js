// Namespace
var app = app || {};

app.singleImgView = Backbone.View.extend({

	tagName: 'div',
	className: 'thumbs',

	template: _.template($('#img-thumb').html()),

	render: function() {
		var imgTemplate = this.template(this.model.toJSON());
		this.$el.html(imgTemplate);
		return this;
	},

	events: {
		'click': 'eventFire'
	},
	eventfire: function() {
		console.log('click!');
	}
});