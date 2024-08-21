AFRAME.registerComponent('enemy',{
    schema: {
        amount: {'type': 'number', default: 3} //ex. no html enemy="amount:3"
    },

    init: function() {
        this.create_enemies();   
    },

    create_enemies: function(){
        for(let i=1; i<=this.data.amount; i++){
            let enemy = document.createElement(this.random_primitive());
            enemy.classList.add('collidable');  
            enemy.setAttribute('enemy-element','');
            enemy.setAttribute('dynamic-body','');
            enemy.setAttribute('random-position',{
                min: `${this.getRandomNumber(-2, 0, 2)} ${this.getRandomNumber(.5, 1, 2)} ${this.getRandomNumber(0, 0, 2)}`,
                max: `${this.getRandomNumber(0, 2, 2)} ${this.getRandomNumber(.5, 5, 2)} ${this.getRandomNumber(0, -5, 2)}`
            }
            );
            enemy.setAttribute('random-color','');
            enemy.setAttribute('random-scale','');
            enemy.setAttribute('random-rotation','');

            this.el.sceneEl.append(enemy);
        }
    },

    // retorna um formato diferente para o inimigo
    random_primitive: function(){
        const elements = ['a-box', 'a-cone', 'a-cylinder', 'a-sphere'];
        const randomIndex = Math.floor(Math.random() * elements.length);
        return elements[randomIndex];
      },

    // função que retorna um número aleatório
    getRandomNumber: function(min, max, decimalPlaces = 0) {
        const factor = Math.pow(10, decimalPlaces);
        const randomNum = Math.random() * (max - min) + min;
        return Math.round(randomNum * factor) / factor;
    }
});

AFRAME.registerComponent('enemy-element', {
    schema: {
        distance: {type: 'number', default: 1}
    },

    tick: function (time, timeDelta) {
        // console.log(timeDelta);

        //Obter camera
        const camera = document.querySelector('[camera]');
        const camPostion = camera.object3D.position.clone();

        //Obter posicao do elemento
        const elPosition = this.el.object3D.position;

        const targetPostion = new THREE.Vector3(camPostion.x , camPostion.y, camPostion.z);
        
        //Direção do Movimento
        const direction = new THREE.Vector3().subVectors(targetPostion,elPosition).normalize();
        const velocity = direction.multiplyScalar(5);

        if(this.el.body){
          this.el.body.velocity.set(velocity.x,velocity.y,velocity.z);
        }

        const distance = camPostion.distanceTo(elPosition);
        if (distance  < this.data.distance +0.2){
          console.log("GAME OVER");
          this.el.sceneEl.pause();
        } 
    }
})