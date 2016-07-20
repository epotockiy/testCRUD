exports.helloWorld = function () {
	alert('Hello browserify world!');
}
var test_3 = require('./test_3');
test_3.workIt();
exports.CONST = function(){

	return "CONST";
};