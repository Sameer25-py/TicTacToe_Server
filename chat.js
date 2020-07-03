
initialize = (io)=>{
    io.of('/player').emit('chat-success','Chat Connected')
}

broadcast  = (io,socket,msg)=>{
    socket.broadcast.emit('msg',msg)
}




module.exports = {initialize,broadcast}