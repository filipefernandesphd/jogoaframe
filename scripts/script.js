// muda o ambiente conforme avança o nível
const env = ["default", "contact", "egypt", "checkerboard", "forest", "goaland", "yavapai", "goldmine", "threetowers", "poison", "arches", "tron", "japan", "dream", "volcano", "starry", "osiris", "moon"];
const envEl = document.getElementById('environment');

let level = JSON.parse(localStorage.getItem('level'));

if(level == null || level == 'undefined'){
    localStorage.setItem('level' , 0);
}

envEl.setAttribute('environment', {
    preset: env[JSON.parse(localStorage.getItem('level'))]
});

const minEnemies = 3; // mínimo de inimigos

const scene = document.querySelector('a-scene');
scene.setAttribute('game', {
    minenimies: minEnemies
});

function nextlevel(){
    if(JSON.parse(localStorage.getItem('level')) == env.length){
        window.location.href = "https://www.youtube.com/watch?v=QlT6YGtU2Js";
    }else{
        const enemy = document.getElementById('enemy');
        const enemies = enemy.getAttribute('enemy').amount;
        salvaDadosEatualiza(enemies);

        localStorage.setItem('level', ++level);
    }
}

function salvaDadosEatualiza(enemies) {
    let newEnemies = enemies + (Math.floor(enemies / 2));
    localStorage.setItem('enemies', JSON.stringify(newEnemies));
    window.location.reload(); 
}

function restartgame(){    
    localStorage.setItem('enemies', JSON.stringify(minEnemies));
    localStorage.setItem('level' , 0);
    window.location.reload(); 
}