AFRAME.registerSystem('game',{
    schema: {
        gameover: {type:'boolean', default: false}
    },

    tick: function(){
        if(this.data.gameover){
            this.data.gameover = !this.data.gameover;
            this.el.pause();
            this.gameOver();
        }
    },

    gameOver: function(){
        console.log('GAME OVER');
    }
});