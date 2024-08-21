AFRAME.registerComponent('shooting', {
    init: function(){
        var self = this; //garante acessar o elemento indepentente do nível de escopo do JS

        // função que identifica a ação de click na cena
        self.el.sceneEl.addEventListener('click', ()=>{
            self.el.sceneEl.appendChild(this.createShooting());
        });
    },

    // função que cria o objeto bala
    createShooting: function(){
        let bullet = document.createElement('a-sphere');

        bullet.setAttribute('scale','.2 .2 .2'); 
        bullet.setAttribute('color','black'); 
        bullet.setAttribute('position',{
            x: `${this.getRandomNumber(-2,2,1)}`,
            y: `${this.getRandomNumber(0.5,3,1)}`,
            z: `${this.getRandomNumber(-1,-5,1)}`
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