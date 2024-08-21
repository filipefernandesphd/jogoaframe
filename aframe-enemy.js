AFRAME.registerComponent('enemy',{
    schema: {
        amount: {'type': 'number', default: 3} //ex. no html enemy="amount:3"
    },

    init: function() {
        this.create_enemies();   
    },

    create_enemies: function(){
        for(let i=1; i<=this.data.amount; i++){
            let emeny = document.createElement('a-box');
            emeny.classList.add('collidable');  
            // emeny.setAttribute('dynamic-body','');
            // enemy.setAttribute('static-body','');
            emeny.setAttribute('random-position',{
                min: `${this.getRandomNumber(-2, 0, 2)} ${this.getRandomNumber(.5, 1, 2)} ${this.getRandomNumber(0, 0, 2)}`,
                max: `${this.getRandomNumber(0, 2, 2)} ${this.getRandomNumber(.5, 5, 2)} ${this.getRandomNumber(0, -5, 2)}`
            }
            );
            emeny.setAttribute('random-color','');

            this.el.sceneEl.append(emeny);
        }
    },

    // função que retorna um número aleatório
    getRandomNumber: function(min, max, decimalPlaces = 0) {
        const factor = Math.pow(10, decimalPlaces);
        const randomNum = Math.random() * (max - min) + min;
        return Math.round(randomNum * factor) / factor;
    }
});