function viewModel() {
    var self = this;
    self.posts = ko.observableArray([]),
        self.cpost = ko.observableArray([]),
        self.comments = ko.observableArray([]),
        self.textToAdd = ko.observable(""),
        self.nameToAdd = ko.observable(""),
        self.emailToAdd = ko.observable(""),
        self.newComment = ko.observable(),
                self.flag = ko.observable(true);
                self.saveFlag = ko.observable(false);


        self.loadposts = function() {
            self.cpost(null);
            self.isEditable = false;

            $.getJSON("http://jsonplaceholder.typicode.com/posts", function(posts) {
                    self.posts(posts)
                }

            );
        }

        self.goToPost = function(post) {
            self.posts(null);
            self.choseid = post.id;
            console.log(choseid);
            $.get("http://jsonplaceholder.typicode.com/posts", {
                id: choseid
            }, self.cpost);
            $.getJSON("http://jsonplaceholder.typicode.com/posts/" + post.id + "/comments", function(comments) {
                self.comments(comments)
            });
        }

        self.isValidForm = function() {
            if (textToAdd().length > 0 && nameToAdd().length > 0 && emailToAdd().length > 0)
                return true;
        }

        self.addComment = function() {
            if (self.textToAdd() != "" && nameToAdd() != "" && emailToAdd() != "") {
                self.newComment = {
                    name: self.nameToAdd(),
                    email: self.emailToAdd(),
                    body: self.textToAdd()
                };
                self.comments.push(self.newComment);
                self.textToAdd("");
                self.emailToAdd("");
                self.nameToAdd("");
            }
        }

        self.editComment = function(comment) {
                    self.textToAdd(comment.body);
            self.nameToAdd(comment.name);
            self.emailToAdd(comment.email);
                    self.flag(false);
                    self.saveFlag(true);
        }

                self.removeComment = function (comment) {
                    self.comments.remove(comment);
                }

                /* FIXME: не знает, какой коммент передаю, т.к форма input вне видимости foreach. // второй способ: положить кнопку save в блок с комментом, но тогда она появляется у ВСЕХ комментариев,
                * идея: отслеживать id поста и показывать кнопку save только для него
              */
                self.saveComment = function(comment) {
                    console.log(comment.body);
                    console.log(self.textToAdd());
                    // comment = {
                    //  body: self.textToAdd()
                    // }
                    comment.body = self.textToAdd();
                    self.flag(true);
                    self.saveFlag(false);
                    self.textToAdd("");
                    self.emailToAdd("");
                    self.nameToAdd("");
                }

                self.deletePost = function (post) {
                    self.posts.remove(post);
                }

        self.loadposts();
};

ko.applyBindings(viewModel());
