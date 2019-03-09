function loadFile(url, timeout, callback){
  var args = Array.prototype.slice.call(arguments, 3);
  var xhr = new XMLHttpRequest();
  xhr.ontimeout = function(){
    console.error('the request for '+ ulr +'timed out.');
  }
  xhr.onload = function(){
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        callback.apply(xhr,args);
      }else{
        console.error(xhr.statusText);
      }
    }
  }
  xhr.open('get',url,true);
  xhr.timeout = timeout;
  xhr.send(null);
}