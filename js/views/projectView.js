
var app = app || {};

app.projectView = Backbone.View.extend({

	tagName: 'div',
	className: 'project',

	template: _.template($('#project-view').html()),

	render: function() {
		var projectTemplate = this.template(this.model.toJSON());
		this.$el.html(projectTemplate);
		return this;
	}
});