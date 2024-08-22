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
            this.confetti();
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

        const audio = document.getElementById('sound_gamewinner');
        audio.play();
    },

    gameOver: function(){
        var overlay = document.getElementById('msggameover');
        overlay.style.display = 'flex';

        const audio = document.getElementById('sound_gameover');
        audio.play();
    },

    confetti: function(){
        const duration = 15 * 1000,
          animationEnd = Date.now() + duration,
          defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };
    
        function randomInRange(min, max) {
          return Math.random() * (max - min) + min;
        }
    
        const interval = setInterval(function() {
          const timeLeft = animationEnd - Date.now();
    
          if (timeLeft <= 0) {
            return clearInterval(interval);
          }
    
          const particleCount = 50 * (timeLeft / duration);
    
          // since particles fall down, start a bit higher than random
          confetti(
            Object.assign({}, defaults, {
              particleCount,
              origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            })
          );
          confetti(
            Object.assign({}, defaults, {
              particleCount,
              origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            })
          );
        }, 250);    
      }
});