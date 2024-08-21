AFRAME.registerSystem('game',{
    schema: {
        gameover: {type:'boolean', default: false},
        winner: {type:'boolean', default: false}
    },

    tick: function(){
        if(this.data.winner){
            this.data.winner = !this.data.winner;
            this.el.pause();      
            this.winner();
        }
        
        if(this.data.gameover){
            this.data.gameover = !this.data.gameover;
            this.el.pause();
            this.gameOver();
        }
    },

    winner: function(){
        console.log('YOU WON');
    },

    gameOver: function(){
        console.log('GAME OVER');
    }
});