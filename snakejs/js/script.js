let field = document.createElement('div');
let startBtn = document.querySelector('.startBtn')
document.body.appendChild(field);

field.classList.add('field')

for (let i=1; i<101; i++) {
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel')
}

let excel = document.getElementsByClassName('excel');

let x = 1
let y = 10

for (let i=0; i < excel.length; i++) {
    if (x > 10) {
        x = 1;
        y--;
    }
    excel[i].setAttribute('posX', x);
    excel[i].setAttribute('posY', y);
    x++;
}

function createSnake() {
    let posX = Math.round(Math.random() * (10 - 3) + 3);
    let posY = Math.round(Math.random() * (10 - 3) + 3);
    return [posX, posY] 
}

let coordinates = createSnake()

let snakeBody = [document.querySelector('.excel[posX="' + coordinates[0] + '"][posY="'+ coordinates[1] +'"]'),
                 document.querySelector('.excel[posX="' + (coordinates[0] - 1) + '"][posY="'+ coordinates[1] +'"]'),
                 document.querySelector('.excel[posX="' + (coordinates[0] - 2) + '"][posY="'+ coordinates[1] +'"]')]


for (let i = 0; i < snakeBody.length; i++) {
    if (i == 0){
        snakeBody[i].classList.add('snakeHead')
        snakeBody[i].classList.add('snakeBody')
    } else {
        snakeBody[i].classList.add('snakeBody')
    }
}

let mouse;

function createMouse(){
    function genereateMouse() {
        let posX = Math.round(Math.random() * (10 - 3) + 3);
        let posY = Math.round(Math.random() * (10 - 3) + 3);
        return [posX, posY] 
    }

    let mouseCoord = genereateMouse();
    
    mouse = document.querySelector('.excel[posX="' + mouseCoord[0] + '"][posY="'+ mouseCoord[1] +'"]')

    while(mouse.classList.contains('snakeBody')) {
        let mouseCoord = genereateMouse();
        mouse = document.querySelector('.excel[posX="' + mouseCoord[0] + '"][posY="'+ mouseCoord[1] +'"]')
    }

    mouse.classList.add('mouse')
}

let direction = 'right'

function move(){
    let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('snakeHead');
    snakeBody[(snakeBody.length)-1].classList.remove('snakeBody')
    snakeBody.pop();

    if (direction == 'right') {
        if (snakeCoordinates[0] < 10) {
            snakeBody.unshift(document.querySelector('.excel[posX="' + (+snakeCoordinates[0] + 1) + '"][posY="'+ snakeCoordinates[1] +'"]'))
            snakeBody[0].classList.add('snakeHead');
        } else {
            snakeBody.unshift(document.querySelector('.excel[posX="1"][posY="'+ snakeCoordinates[1] +'"]'))
            snakeBody[0].classList.add('snakeHead');
        }
    } else if (direction == 'left') {
        if (snakeCoordinates[0] > 1) {
            snakeBody.unshift(document.querySelector('.excel[posX="' + (+snakeCoordinates[0] - 1) + '"][posY="'+ snakeCoordinates[1] +'"]'))
            snakeBody[0].classList.add('snakeHead');
        } else {
            snakeBody.unshift(document.querySelector('.excel[posX="10"][posY="'+ snakeCoordinates[1] +'"]'))
            snakeBody[0].classList.add('snakeHead');
        }
    } else if (direction == 'up') {
        if (snakeCoordinates[1] < 10) {
            snakeBody.unshift(document.querySelector('.excel[posX="' +snakeCoordinates[0] + '"][posY="'+ (+snakeCoordinates[1] + 1) +'"]'))
            snakeBody[0].classList.add('snakeHead');
        } else {
            snakeBody.unshift(document.querySelector('.excel[posX="' +snakeCoordinates[0] + '"][posY="1"]'))
            snakeBody[0].classList.add('snakeHead');
        }
    } else if (direction == 'down') {
        if (snakeCoordinates[1] > 1) {
            snakeBody.unshift(document.querySelector('.excel[posX="' + snakeCoordinates[0] + '"][posY="'+ (snakeCoordinates[1] -1) +'"]'))
            snakeBody[0].classList.add('snakeHead');
        } else {
            snakeBody.unshift(document.querySelector('.excel[posX="' +snakeCoordinates[0] + '"][posY="10"]'))
            snakeBody[0].classList.add('snakeHead');
        }
    }

    if (snakeBody[0].getAttribute('posx') == mouse.getAttribute('posx') &&
        snakeBody[0].getAttribute('posy') == mouse.getAttribute('posy')) {
            mouse.classList.remove('mouse')
            let a = snakeBody[snakeBody.length-1].getAttribute('posx');
            let b = snakeBody[snakeBody.length-1].getAttribute('posy');
            snakeBody.push(document.querySelector('[posx = "' + a + '"][posy = "' + b + '"]'))
            createMouse();
        }

        if (snakeBody[0].classList.contains('snakeBody')) {
            alert('Game OVER')
            clearInterval(interval);
            document.location.reload()
        }    

    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].classList.add('snakeBody')
    } 
}




window.addEventListener('keydown', function(e) {
    if (e.keyCode == 37 && direction != 'right') {
        direction = 'left'
    }
    if (e.keyCode == 38 && direction != 'down') {
        direction = 'up'
    }
    if (e.keyCode == 39 && direction != 'left') {
        direction = 'right'
    }
    if (e.keyCode == 40 && direction != 'up') {
        direction = 'down'
    }
});



startBtn.addEventListener('click', function(){
    createMouse();
    let interval = setInterval(move, 500);
});