(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//var viewCommentController = require('./viewCommentController');

//var root = 'http://jsonplaceholder.typicode.com';
//ar url = root + '/posts' + window.location.search,
  var parentPost = document.getElementById('showpost'),
  px = new XMLHttpRequest();

px.open("GET", 'http://jsonplaceholder.typicode.com' + '/posts/' + window.location.search, true);
px.onload = function (){
  var data = JSON.parse(px.responseText);
  showPostContext(parentPost, data[0]);
  //viewCommentController.viewCommentController(data[0].id);
}
px.send(null);

function showPostContext(data){
    var template = document.getElementById('postTpl').innerHTML;
    var html = document.createElement('div');
    html.className='postdata';
    html.innerHTML = Mustache.to_html(template, data);
    parentPost.appendChild(html);
  }
},{}]},{},[1]);
