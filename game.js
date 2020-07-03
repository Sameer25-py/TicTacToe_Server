const chat = require('./chat.js')

last_turn = 0
latest_board = [
    ['','',''],
    ['','',''],
    ['','','']
]


start_game = (players,io,last_turn)=>{

    players_copy = players
    player1 = player2 = {}
    
    players.forEach(player=>{
        if(player.seq == 1){
            player1 = player
        }
        else if(player.seq == 2){
            player2 = player
        }
    })

    if(last_turn == player1.seq){
        player1.turn = false
        player2.turn = true
        last_turn = player2.seq
    }

    else if (last_turn == player2.seq){
        player1.turn = true
        player2.turn = false
        last_turn = player1.seq
    }

    else{
    //first turn
    player1.turn = true
    player2.turn = false
    last_turn = player1.seq
    }


    //emitting
    player1.socket.emit('start',{turn:player1.turn,board:latest_board})
    player2.socket.emit('start',{turn:player2.turn,board:latest_board})

    chat.initialize(io)
}

broadcast = (io,socket,board)=>{
    //broadcasting board cords
    socket.broadcast.emit('index',board)
    latest_board = board
    last_turn = players_copy.filter(pl => pl.socket === socket)[0].seq
  
}


module.exports = {start_game,broadcast}