const logic = require('./game.js')
const connection = require('./connection.js')
const chat = require('./chat.js')

PORT = 9000;
const io = require('socket.io').listen(PORT)

io.on('connection',()=>{
    
    //droping default namepsace connections
})

io.of('/player').on('connection',client_soc=>{
    console.log('a user appeared')
    
    connection.handle_connection(io,client_soc)

    client_soc.on('disconnect',()=>{
        connection.handle_disconnection(io,client_soc)
    })

    client_soc.on('index',index=>{
        logic.broadcast(io,client_soc,index)
    })

    client_soc.on('msg',msg=>{
        chat.broadcast(io,client_soc,msg)
        
    })

})




module.exports = io


    
   