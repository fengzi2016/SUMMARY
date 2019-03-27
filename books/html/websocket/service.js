var http = require('http');
var ws = require('nodejs-websocket');
/**
 * 这是运行在NodeJS上的服务器端Javascript
 * 在HTTP服务器上，它运行了一个WebSokcet服务器
 */
var clientui = require('fs').readFileSync('index.html');
var httpserver = new http.Server();
httpserver.on('request',function(request,response){
  if(request.url === '/'){
    // 请求聊天ui
    response.writeHead(200,{"Content-Type":"text/html"});
    response.write(clientui);
    response.end();
  }else{
    response.writeHead(404);
    response.end();
  }
});
//在http服务器上包装一个WebSocket服务器
var wsserver = ws.createServer({server: httpserver});
wsserver.on("connection",function(socket){
  socket.send('welcome');
  socket.on('message',function(msg){
    // 将它们广播给每个人
    wsserver.broadcast(msg);
  })
})
console.log('into');
wsserver.listen(8000);