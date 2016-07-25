/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

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

	import 'babel-polyfill';

	import ko from 'knockout';
	import 'ko-component-router';

	ko.components.register('zhuk',{
	    viewModel: class Zhuk{
	        constructor(){
	            this.a = ko.observable("My name is zhuk");
	        }
	    },
	    template: '<div data-bind="text:a"></div>'
	})

	ko.components.register('app',{
	    
	    template: '<ko-component-router params="routes: routes,hashbang: false"></ko-component-router>',
	    viewModel: class App{
	        constructor(){
	            this.routes = {
	                '/': 'home',
	                '/user/:id': 'user'
	            }
	        }
	    }
	})
	ko.components.register('home',{
	    
	    viewModel: class Post{
	        constructor(){
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
	     template: '<div>LOLITA!</div>'
	})

	ko.components.register('user',{
	    viewModel: class User{
	        constructor(ctx){

	        }
	    },
	     template: '<!-- ctx is also available as $router in the binding context -->'
	});


	ko.applyBindings();



/***/ }
/******/ ]);