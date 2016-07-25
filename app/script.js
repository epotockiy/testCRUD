/*function ViewModel() {
    var self = this;
        self.posts = [],
        self.cpost = ko.observableArray([]),
        self.comments = ko.observableArray([]),
        self.textToAdd = ko.observable(""),
        self.nameToAdd = ko.observable(""),
        self.emailToAdd = ko.observable(""),
        self.newComment = ko.observable(),
        self.flag = ko.observable(true),
        self.saveFlag = ko.observable(false);

    self.lol = "some text";

    self.loadposts = function() {
        self.cpost(null);
        self.isEditable = false;

        $.getJSON("http://jsonplaceholder.typicode.com/posts", function(data) {
            self.posts=data;
            console.log(self.posts)
            // console.log(self.posts);
        });
    }();

        self.goToPost = function(post) {
        self.posts(null);
        self.choseid = post.id;
        console.log(choseid);
        $.get("http://jsonplaceholder.typicode.com/posts", {
            id: choseid
        }, self.cpost);
        $.getJSON("http://jsonplaceholder.typicode.com/posts/" + post.id + "/comments", function(comments) {
            self.comments(comments);
        });
    };

    self.isValidForm = function() {
        if (textToAdd().length > 0 && nameToAdd().length > 0 && emailToAdd().length > 0)
            return true;
    };

    self.addComment = function() {
        if (self.textToAdd() !== "" && nameToAdd() !== "" && emailToAdd() !== "") {
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
    };

    self.editComment = function(comment) {
        self.textToAdd(comment.body);
        self.nameToAdd(comment.name);
        self.emailToAdd(comment.email);
        self.flag(false);
        self.saveFlag(true);
    };

    self.removeComment = function(comment) {
        self.comments.remove(comment);
    };

     // FIXME: не знает, какой коммент передаю, т.к форма input вне видимости foreach. // второй способ: положить кнопку save в блок с комментом, но тогда она появляется у ВСЕХ комментариев,
     // * идея: отслеживать id поста и показывать кнопку save только для него
     
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
    };

    self.deletePost = function(post) {
        self.posts.remove(post);
    };

    // self.loadposts(); 
}

*/

/*function PostsViewModel() {
    var self = this;
    // self.posts = ko.observableArray([]);



    self.lolita = "lolita";
    self.lol = "lol";

    $.get("http://jsonplaceholder.typicode.com/posts", function(data) {
        console.log(data);
        self.posts(data);
        self.posts = ko.mapping.toJS([]);
        console.log(self.posts);
        console.log(self.posts());
    });
    console.log(self.posts());
    self.loadposts = function() {
        console.log('lol');
    };
}
*/


/*$(function() {
    pager.Href.hash = '#/';
    // pager.extendWithPage(ViewModel.prototype);
    // ko.applyBindings(new ViewModel());
    pager.extendWithPage(PostsViewModel.prototype);
    ko.applyBindings(new PostsViewModel());
    pager.start();
});*/

// ko.applyBindings(ViewModel());


/*ko.components.register('zhuk',{
    viewModel: class Zhuk{
        constructor(){
            this.a = ko.observable("My name is zhuk");
        }
    },
    template: '<div data-bind="text:a"></div>'
})

ko.components.register('app', {
  viewModel: class App {
    constructor() {
      this.routes = {
        '/': 'home',
        '/user': 'user'
      }
    }
  },
  template: '<ko-component-router params="routes: routes, hashbang: false"></ko-component-router>'
})

ko.components.register('user',{
    
    viewModel: class User{
        constructor(ctx){
            var self = this;
            self.rootUri = "http://jsonplaceholder.typicode.com";
            self.posts = ko.observableArray([]);
            self.text_ = ko.observable("Some text");
        }
        getData(){
            $.getJSON(self.Uri + '/posts', function(data) {
                  return self.posts(data);
            });
        
             // self.posts;
        }
    },
     template: 'User: <div>LOLITA!</div>'
})

ko.components.register('home',{
    viewModel: class Post{
        constructor(){

        }
    },
     template: 'Post: <div>User</div>'
});


ko.applyBindings();*/

"use strict";
import 'babel-polyfill';

import ko from 'knockout';
import 'ko-component-router';

ko.components.register('app', {
  viewModel: class App {
    constructor() {
      this.routes = {
        '/': 'home',
        '/user/:id': 'user'
      }
    }
  },
  template: '<ko-component-router params="routes: routes, hashbang: false"></ko-component-router>'
})

ko.components.register('home', {
    viewModel: class Home {
        constructor(){

    /*    var self = this;
        console.log(this);
        console.log(self);
        self.posts = ko.observableArray([]),
        self.cpost = ko.observableArray([]),
        self.comments = ko.observableArray([]),
        self.textToAdd = ko.observable(""),
        self.nameToAdd = ko.observable(""),
        self.emailToAdd = ko.observable(""),
        self.newComment = ko.observable(),
                self.flag = ko.observable(true);
                self.saveFlag = ko.observable(false);
         self.testFunction = function(){
            alert();
        }
        self.testFunction();
        self.loadposts = function() {
            self.cpost(null);
            self.isEditable = false;

            $.getJSON("http://jsonplaceholder.typicode.com/posts", function(posts) {
                    console.log(posts);
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
              /*  self.saveComment = function(comment) {
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

        self.loadposts();*/

           // handler();
            // returnTemplate();
        }
    },
    // template: '<link rel="import" href="../templates/home.html" id="import"> '
    // template: '<a href="user/1234">Userasdsdsd</a>'
    template: {element: home}
})

ko.components.register('user', {
  viewModel: class User {
    constructor(ctx) {
      // ctx contains a bunch of information about the
      // current state of the router
      // many are read/write observables,
      // see each section for more info
         this.buyer = { name: 'Franklin', credits: 250 };
         this.seller = { name: 'Mario', credits: 5800 };
      console.log(ctx);
      ko.router.update();
    }
  },
  // template: 'User: <!-- ko text: $router.params.id  --><!-- /ko -->'
  template: {element: user}
})
var MyViewModel =  function() {
                 this.buyer = { name: 'Franklin', credits: 250 };
                 this.seller = { name: 'Mario', credits: 5800 };
}

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




