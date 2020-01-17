



let room = []
let room1 = []
function socket(server) {
 var io = require('socket.io')(server);
 io.on('connect', onConnect);

 function onConnect(socket) {

  // 进入聊天室发起的链接 
  socket.on("login", function (msg) {
   console.log(msg)
   io.emit("login", `${msg.user}进入聊天室了`) //将新消息广播出去
  })

  // // // 发送给当前客户端
  socket.on("lobby", function (msg) {
   // console.log(msg)
   io.emit("lobby", msg) //将新消息广播出去
  })



// 增加聊天室 
  
  socket.on("addroom", function (msg) {
   console.log(msg)
   if (msg) {
    let title = `${room.length}号聊天室`
    let time = new Date().getTime()
    room.push({ password: msg.password, title, time, })
    room1.push({  title, time, })
   }
   io.emit("addroom", room1) //将新消息广播出去
  })

  // 校验聊天室密码

 
  socket.on("verify", function (data) {
  
   let state = room[data.key].password == data.password ||false
   io.emit("verify", { state, ...room1[data.key]}) //将新消息广播出去
  })

  // // 私密房间

  // 进入聊天室发起的链接 
  socket.on("loginprivacy", function (msg) {
   console.log(msg)

   io.to(msg.time).emit('loginprivacy', `${msg.user}进入聊天室了`);
   // io.emit("loginprivacy", ) //将新消息广播出去
  })



  socket.on("privacyRoom", function (data) {
   socket.join(data.time, function () {
    console.log(socket.rooms);
   }); // 加入房间后，打印出socket和room的信息
   io.to(data.time).emit('privacyRoom', data);
  })



  // var roomNum = 'room' + count;//自增实现socket进入不同房间
  // socket.join(roomNum, function () {
  //  // console.log(socket.rooms);
  // }); //加入房间后，打印出socket和room的信息
  // socket.on('chatmessage', function (msg) {
  //  var room = Object.keys(socket.rooms)[1]; //这是当前socket的房间，这个对象设置得有点怪，但是事实如此。
  //  // io.to(room).emit('chatmessage', msg);
  //  // console.log(room);//打印出房间。
  //  socket.broadcast.emit('chatmessage', 'hello friends!');
  // });
 }














}


module.exports = socket;


// function onConnect(socket) {

//  // // 发送给所有客户端，除了发送者


//  // // 发送给同在 'game' 房间的所有客户端，除了发送者
//  // socket.to('game').emit(
//  //  'nice game',
//  //  "let's play a game"
//  // );

//  // // 发送给同在 'game1' 或 'game2' 房间的所有客户端，除了发送者
//  // socket.to('game1').to('game2').emit(
//  //  'nice game',
//  //  "let's play a game (too)"
//  // );

//  // // 发送给同在 'game' 房间的所有客户端，包括发送者
//  // io.in('game').emit(
//  //  'big-announcement',
//  //  'the game will start soon'
//  // );

//  // // 发送给同在 'myNamespace' 命名空间下的所有客户端，包括发送者
//  // io.of('myNamespace').emit(
//  //  'bigger-announcement',
//  //  'the tournament will start soon'
//  // );

//  // // 发送给指定 socketid 的客户端（私密消息）
//  // // socket.to(<socketid>).emit(
//  // //   'hey',
//  // //   'I just met you'
//  // // );

//  // // 包含回执的消息
//  // socket.emit(
//  //   'question',
//  //   'do you think so?',
//  //    function (answer) {}
//  //  );

//  //  // 不压缩，直接发送
//  //  socket.compress(false).emit(
//  //    'uncompressed', 
//  //    "that's rough"
//  //  );

//  //  // 如果客户端还不能接收消息，那么消息可能丢失
//  //  socket.volatile.emit(
//  //    'maybe', 
//  //    'do you really need it?'
//  //  );

//  //  // 发送给当前 node 实例下的所有客户端（在使用多个 node 实例的情况下）
//  //  io.local.emit(
//  //    'hi', 
//  //    'my lovely babies'
//  //  );
// };





// io.on('connect', function (socket) {
//  console.log('ccccccc')

//  socket.on("join", function (name) {
//   usocket[name] = socket
//   io.emit("join", name)
//  })

//  socket.on("message", function (msg) {
//   io.emit("message", msg) //将新消息广播出去
//  })

//  socket.on("login", function (msg) {
//   console.log(msg)
//   io.emit("login", 'msg') //将新消息广播出去
//  })

//  socket.broadcast.emit(
//   'broadcast',
//   'hello friends!'
//  );
//  socket.emit(
//   'hello',
//   'can you hear me?',
//   1,
//   2,
//   'abc'
//  );

// });