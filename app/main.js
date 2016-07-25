requirejs.config({
	paths: {"ko-component-router": "../node_modules/ko-component-router/dist/ko-component-router", "knockout": "../vendor/bower_components/knockout/dist/knockout"}
})
require(["mainScript", "knockout", "ko-component-router"], function(util) {

});