///////////////////////////////////////////////////Messages/////////////////////////////////////////////////////////
// alert(window.location.href);
var dataId = window.location.search;
dataId = dataId.slice(1);

var root = 'http://jsonplaceholder.typicode.com';

$.ajax({
  url: root + '/comments',
  method: 'GET'
}).then(function(data){
	handler(data);
});
function createOneElement(name, email, body){

	$aPullLeft = $('<a/>').addClass('pull-left href="#" ');

	$small = $('<small/>').append("said by: ");
	$small.append(email);
	$h4 = $('<h4/>').addClass('media-heading').append(name);
	$h4.append($small);

	$divMediaBody = $('<div/>').addClass('media-body').append($h4);
	$divMediaBody.append(body);

	$buttonEdit = $('<input type="button" value="Edit"/>').addClass('btn btn-primary').attr('id', 'edit');;
	$buttonDelete = $('<input type="button" value="Delete"/>').addClass('btn btn-primary').attr('id', 'delete');;

	$divMedia = $('<div/>').addClass('media').append($aPullLeft);
	$divMedia.append($divMediaBody);
	$divMedia.append($buttonEdit);
	$divMedia.append($buttonDelete);

	$(".col-lg-8").append($divMedia);

}
function saved(){
	var title = $("#title").val();
	var email = $("#email").val();
	var comment = $("#comment").val();
	if((title != "" ) && (email != "") && (comment != "")){

		createOneElement(title, email, comment);	
	}
	else{
		alert("проверьте введеные вами данные!");
	}
}
function deleteElement(){

}
function edit(){

}
function handler(data){
	console.log(data);
	// createOneElement(data.id, data.postId, data.name, data.email, data.body);
	$.each(data, function(key, value){

	if(value.postId == dataId) createOneElement(value.name, value.email, value.body); });

	$("#btn-submit").click(function(){
		saved();
	});
	$('#delete').click(function(){
		deleteElement();
	});
	$('#edit').click(function(){
		edit();
	});
}