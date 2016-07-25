  var saveComment = require('./saveComment'); 
  exports.editComment = function() {
    if(boolEdit){
    _this = this;
    var div = _this.closest('.media').firstChild;
    var p = div.lastChild;
    var text = p.innerHTML;
    var input = document.createElement('textarea');
    input.value = text;
    input.className = 'form-control';
    input.setAttribute('rows', 5);
    div.removeChild(p);
    div.appendChild(input);

    

        var btnSave = document.createElement('a');
        btnSave.innerHTML = 'save';
        btnSave.className = 'btn btn-success';
        boolEdit = 0;
        btnSave.onclick = saveComment.saveComment;

        _this.closest('.media').childNodes[1].appendChild(btnSave);
    }

  }