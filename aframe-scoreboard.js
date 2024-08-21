// registering an entity
AFRAME.registerPrimitive('a-score-board',{
    // Attaches components by default.
    defaultComponents:{
        'score-board':{}
    },

    // Maps HTML attributes to the component's properties.
    mappings:{
        position: 'score-board.position'
    }
});

// registering a component
AFRAME.registerComponent('score-board', {
    schema:{
        position: {type:'vec3', default:'0 2.1 -3'},
        totalEnemies: {type:'number'}
    },

    init: function(){    
        var self = this;
        
        this.createBoard();
        this.createText();
    },

    createBoard: function(){
        let board = document.createElement('a-plane');

        board.setAttribute('color','black');
        board.setAttribute('width','1.3');
        board.setAttribute('height','.5');
        board.setAttribute('position', this.data.position);
            
        this.el.appendChild(board);
    },

    createText: function(){
        let position = {
            x:this.data.position.x,
            y:this.data.position.y - .055,
            z:this.data.position.z + .1
        };

        let text = document.createElement('a-text');

        text.setAttribute('id','textscore');
        text.setAttribute('value',`0 / ${this.data.totalEnemies}`);
        text.setAttribute('width','8');
        text.setAttribute('color','white');
        text.setAttribute('align','center');
        text.setAttribute('position',position);

        this.el.appendChild(text);
    }
});