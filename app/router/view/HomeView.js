define(['view/DefaultView'], function(DefaultView) {

    var HomeView = DefaultView.extend({
        rootUri: 'http://jsonplaceholder.typicode.com',


        loadDataOnce: function(req) {
            return $.get('../../../templates/post.tmpl.html')
                .done(this.bound(function(data) {
                    this.setData(data);
                }));
        },
        showContext: function(data) {
            var template = $('#personTpl').text();
            var html = $('<div/>');
            var parent = $('#postContainer');
            html.addClass('post');
            html.append(Mustache.to_html(template, data));
            parent.append(html);
        },
        init: function() {
            var self = this;
            $.getJSON(this.rootUri + '/posts')
                .done(function(data) {
                    data.forEach(self.showContext);
                });
            this.$('.js-posts').append(this.getLoadedData());
        }
    });

    return HomeView;
});
