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
        var overlay = document.getElementById('msgwinner');
        overlay.style.display = 'flex';

        console.log('YOU WON');
    },

    gameOver: function(){
        console.log('GAME OVER');
    }
});