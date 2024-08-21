AFRAME.registerSystem('game',{
    schema: {
        gameover: {type:'boolean', default: false},
        winner: {type:'boolean', default: false},
        minenimies: {type: 'number', default: 3},
    },

    init: function(){
        const enemiesStorage = localStorage.getItem('enemies');  

        if(!enemiesStorage || enemiesStorage=='undefined' || enemiesStorage==null){ // salva o mínimo de inimigos
            localStorage.setItem('enemies', JSON.stringify(this.data.minenimies));
        }else{ // atualiza o numero de inimigos
            let level = JSON.parse(localStorage.getItem('level'));
            
            const camera = document.querySelector('a-camera');    
            camera.setAttribute('shooting', {
                total: enemiesStorage,
            });      

            const scoreboard = document.querySelector('#scoreboard');    
            scoreboard.setAttribute('score-board', {
                totalEnemies: enemiesStorage
            });

            const enemy = document.getElementById('enemy');
            enemy.setAttribute('enemy', {
                amount: enemiesStorage 
            });    
        }
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
        var overlay = document.getElementById('msggameover');
        overlay.style.display = 'flex';

        console.log('GAME OVER');
    }
});