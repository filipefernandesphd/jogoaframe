function nextlevel(){
    let enemies = JSON.parse(localStorage.getItem('enemies')); 

    if(enemies != null){
        salvaDadosEatualiza(enemies);
    }else{
        const enemy = document.getElementById('enemy');
        const enemies = enemy.getAttribute('enemy').amount;

        salvaDadosEatualiza(enemies);
    }
}

function salvaDadosEatualiza(enemies) {
    let newEnemies = enemies + (Math.floor(enemies / 2));
    localStorage.setItem('enemies', JSON.stringify(newEnemies));
    window.location.reload(); 
}