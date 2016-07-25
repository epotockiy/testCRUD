define(['view/DefaultView'], function (DefaultView) {
	

	var CommentView = DefaultView.extend({
		

		loadDataOnce: function (req) {
			return $.get('http://jsonplaceholder.typicode.com/posts')
				.done(this.bound(function(data){
					this.setData(data);
				}))
		},

		init: function () {

			console.log('comment');
			// console.log(this.getLoadedData());
		}
	});
	// Export
	return CommentView;
});
