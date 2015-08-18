// Namespace app
var app = app || {};

app.singleImg  = Backbone.Model.extend({

	defaults: {
		thumb: 'img/placeholder.jpg',
		alt: 'No alt text set!',
		name: 'No name set!',
		src: 'no src set!'
	},
	initialize: function() {
		console.log('A model instance named ' + this.get('name') + ( ' has been created'));

		// watch for changes in the model
		this.on('change', function() {
			console.log('Something in the model has changed');
		});
	}

});