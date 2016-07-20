///////////////////////////////////////////////////Main/////////////////////////////////////////////////////////
var root = 'http://jsonplaceholder.typicode.com';

$.ajax({
  url: root + '/posts',
  method: 'GET'
}).then(function(data){
	handler(data);
});

function createOneElement(dataId, userId, title, body){
	$container = $('.col-md-8');

	$a = $('<a/>').append(title);

	$h2 = $('<h2/>').append($a);

	$aByUser = $('<a/>');
	$pByUser = $('<p/>').addClass('lead').append('id by:   ');
	$pByUser.append($aByUser).append(dataId);

	$p = $('<p/>').append(body);

	$span = $('<span/>').addClass('glyphicon glyphicon-chevron-right');
	$aButton = $('<a href="messages.html?' + dataId + '"/>').addClass('btn btn-primary')
						.append("Read more")
						.append($span);
	$hr = $('<hr/>');

	$container.append($h2);
	$container.append($pByUser);
	$container.append($p);
	$container.append($aButton);
	$container.append($hr);
}
function handler(data) {
  	console.log(data);
    // createOneElement(data.id, data.userId, data.title, data.body);
	$.each(data, function(key, value){

		createOneElement(value.id, value.userId, value.title, value.body);
	})
}
