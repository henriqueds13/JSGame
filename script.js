var fields, player;

class Field{
    constructor(columns, rows, containerId){
        this.columns = columns;
        this.rows = rows;
        this.container = document.querySelector(containerId);
        this.createField();
    }

    createField(){
        var field = [];
        for (var i = 0; i < this.rows; i++){
            field[i] =[]
            for (var j = 0; j < this.columns; j++){
                field[i].push(this.createRock())
            }
        }
        this.field = field;
        this.drawfield();
    }

    createRock(){
        return Math.trunc(Math.random() * 5) === 1 ? '@' : '';
    }

    drawfield(){
        var template = '';
        for(var i = 0; i < this.rows; i++){
            template += '<tr>';
            for(var j = 0; j < this.columns; j++){
                template += `<td>${this.field[i][j]}</td>`
            }
            template += '</tr>';
        }
        this.container.innerHTML = template;
    }
}


class Charater{
    constructor(field, x, y, face){
        this.face = face;
        this.x = x;
        this.y = y;
        this.table = field
       if(!this.setPosition(this.x, this.y)){
        throw Error();
       }
    }

    down(){
        if(this.y + 1 < this.table.rows){
            this.setPosition(this.x, this.y + 1)
        }
    }

    up(){
        if(this.y >0){
            this.setPosition(this.x, this.y -1)
        }
    }

    left(){
        if(this.x >0){
            this.setPosition(this.x - 1, this.y)
        }
    }

    right(){
        if(this.x + 1 < this.table.columns){
            this.setPosition(this.x + 1, this.y)
        }
    }

    setPosition(x, y){
        if(this.table.field[y][x] === ''){
            this.table.field[this.y][this.x] = '';
            this.x= x;
            this.y = y;
            this.table.field[this.y][this.x] = this.face
            this.table.drawfield();
            return true;
        }
        return false;
    }
}


class Player extends Charater{
    constructor(field){
        super(field, 0, 0, 'O_O')
    }
}

function startField(){
    field = new Field(3, 4, '#myTable')
    try{
        player = new Player(field);
    }catch(e){
        console.log("starting field again")
        startField();
    }
}

startField();