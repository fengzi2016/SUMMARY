window.onload = function() {
  var nick = prompt('enter your nickname');
  var input = document.getElementById('input');
  input.focus();

  var socket = new WebSocket('ws://'+location.host + '/');
  socket.onmessage = function(e){
    var msg = e.data;
    var node = document.createTextNode(msg);
    var div = document.createElement('DIV');
    div.append(node);
    document.body.insertBefore(div,input);
    input.scrollIntoView();
  }
  input.onchange = function(){
    var msg = nick + ":" + input.value;
    socket.send(msg);
    input.value = "";
  }
}