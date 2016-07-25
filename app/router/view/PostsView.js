define(['view/DefaultView'], function(DefaultView) {

    var PostsView = DefaultView.extend({

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
            var parent = $('#aPostContainer');
            html.addClass('post');
            html.append(Mustache.to_html(template, data));
            parent.append(html);
        },

        showComments: function(data) {
            var tmpl = $('#commentTpl').text();
            var comment = $('<div/>').data('id', data.id);
            comment.append(Mustache.to_html(tmpl, data));


            var prnt = $('.commentBox');
            prnt.append(comment)
        },

        addComment: function() {



            var self = this;
            $('.btn[type="submit"]').click(function() {

                var formData = $('#commentForm').serializeArray();

                formData.push({ name: "id", value: Math.floor(Math.random() * 10) + 101 })
                $.post(self.rootUri + '/comments', $.param(formData))
                    .done(function(res) {
                        $.post(self.rootUri + '/comments', function(data) {
                            console.log(res);
                            var cmnt = $('<div/>');
                            cmnt.append(Mustache.to_html($('#commentTpl').text(), res));
                            $('.commentBox').prepend(cmnt);
                        });
                    });




            });

        },

        deleteComment: function() {
            var self = this;
            $('.js-comments').on('click', '.btn[data-type="delete"]', function() {
                var that = $(this);
                $.ajax({
                        url: self.rootUri + '/comments/' + $(this).parent().data('id'),
                        type: 'DELETE'
                    })
                    .done(function(data) {
                        that.parent().remove();
                    });
            });
        },

        init: function() {
            var self = this;
            var postId = self.request.params.id;
            $.getJSON(this.rootUri + '/posts/' + postId)
                .done(this.bound(function(data) {
                    self.showContext(data);
                }));

            $.get('../../../templates/comment.tmpl.html', function(data) {
                self.$('.js-comments').append(data);
            });

            $.getJSON(this.rootUri + '/comments')
                .done(function(data) {
                    $.each(data, function(key, value) {
                        if (value.postId == postId) {
                            self.showComments(value);
                        }
                    });
                });


            this.$('.js-post').append(this.getLoadedData());

            this.deleteComment();
            this.addComment();


        }
    });
    // Export
    return PostsView;
});
