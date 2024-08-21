AFRAME.registerComponent('shooting', {
    init: function(){
        var self = this; //garante acessar o elemento indepentente do nível de escopo do JS

        this.shooting();
        this.getRemoveEnemies();
    },

    tick: function(){
        
    },

    getRemoveEnemies: function(){
        setTimeout(function(){ // O setTimeout foi usado para que o collidables pudesse pegar todos os objetos .collidable criados dinamicamente
            // seleciona os objetos que serão colididos e removidos da cena
            let collidables = document.querySelectorAll('.collidable');

            for(let enemy of collidables){
                // adiciona o evento de raycaster-intersected em cada objeto
                enemy.addEventListener('raycaster-intersected', function(e){
                    console.log('Colisão detectada');
                });
            }
        },100);
    },

    // função que identifica a ação de click na cena
    shooting: function(){
        this.el.sceneEl.addEventListener('click', ()=>{
            // obtém a direção a partir da posição global 
            let direction = new THREE.Vector3();
            this.el.object3D.getWorldDirection(direction);

            // obtém a posição a partir da posição global
            let position = new THREE.Vector3();
            this.el.object3D.getWorldPosition(position);

            // cria o objeto bala
            let bullet = this.createShooting(position, direction, 50);

            // adiciona a bala na cena
            this.el.sceneEl.appendChild(bullet);

            // remove a bala da cena depois de 500 milissegundos
            setTimeout(()=>{
                this.el.sceneEl.removeChild(bullet);
            }, 500);
        });
    },

    // função que cria o objeto bala
    createShooting: function(position, direction, speed){
        let bullet = document.createElement('a-sphere');

        bullet.setAttribute('scale','.2 .2 .2'); 
        bullet.setAttribute('color','black'); 
        bullet.setAttribute('raycaster','objects: .collidable');
        bullet.setAttribute('animation', {
            property: 'position',
            from: position,
            to: `${position.x+(direction.x*-1)*speed} ${position.y+(direction.y*-1)*speed} ${position.z+(direction.z*-1)*speed}`,
            dur: 500,
            easing: 'linear'
          });

        return bullet;
    },

    // função que retorna um número aleatório
    getRandomNumber: function(min, max, decimalPlaces = 0) {
        const factor = Math.pow(10, decimalPlaces);
        const randomNum = Math.random() * (max - min) + min;
        return Math.round(randomNum * factor) / factor;
    }
});