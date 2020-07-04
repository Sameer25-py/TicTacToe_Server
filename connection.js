logic = require('./game.js')
chat = require('./chat.js')

players  = []
spectators = []
icons = ['x','o']
counter = 0


handle_connection  = (io,socket)=>{
    
    //new player
    player ={}

    if(players.length == 0){
        player = {
            socket:socket,
            status:'connected',
            turn:null,
            name:counter,
            icon:'x',
            seq:1
        }
        players.push(player)
        counter +=1

        socket.emit('initialize',player.icon)
    }
    else if(players.length < 2){

        if(players[players.length -1].seq == 1){
            player = {
                socket:socket,
                status:'connected',
                turn:null,
                name:counter,
                icon:'o',
                seq:2
            }
        }
        else if(players[players.length - 1].seq == 2){
            player = {
                socket:socket,
                status:'connected',
                turn:null,
                name:counter,
                icon:'x',
                seq:1
            }
        }
        players.push(player)
        counter +=1

        socket.emit('initialize',player.icon)
    }         
    //room full
    else{
        board = logic.get_board()
        socket.emit('hello',{msg:'room-full',board:board})
    }

    //start game
    if(players.length == 2){
        //start game
        logic.start_game(players,io)

    } 

}

handle_disconnection = (io,socket)=>{

    players = players.filter(cl => cl.socket != socket)
    socket.broadcast.emit('discon')
    
}



module.exports  = {handle_connection,handle_disconnection}