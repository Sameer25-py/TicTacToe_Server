logic = require('./game.js')
chat = require('./chat.js')

players  = []
spectators = []
icons = ['x','o']



handle_connection  = (io,socket)=>{
    
        if(players.every(player => player.socket !== socket) && players.length < 2)
        {    //new player
            player ={}
            if(players.length != 0 && players[0].icon == 'x')
            {
                //player1
                player = {
                    socket:socket,
                    status:'connected',
                    turn:null,
                    name:null,
                    icon:'o'
                }

                if(players[0].seq == 2){
                    player.seq = 1
                }
                else{
                    player.seq = 2
                }
                
            }
            else if (players.length != 0 && players[0].icon == 'o'){
                
                //player 2
                player = {
                    socket:socket,
                    status:'connected',
                    turn:null,
                    name:null,
                    icon:'x'
                }
                if(players[0].seq == 2){
                    player.seq = 1
                }
                else{
                    player.seq = 2
                }

            }
            else{
                //no player
                player = {
                    socket:socket,
                    status:'connected',
                    turn:null,
                    name:null,
                    seq:1,
                    icon:'x'
                }
                
            }
            
            players.push(player)
            
            socket.emit('initialize',player.icon)           
        
        }
        //room full
        else{
            socket.emit('hello','room-full')
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