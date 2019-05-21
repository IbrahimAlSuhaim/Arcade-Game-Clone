// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x=x;
    this.y=y;
    this.speed=speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

var scoreCounter=0; // the player Score to be displayed

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x+=dt*this.speed;
    if((Math.round(this.x)+30>=player.x&&Math.round(this.x)-30<=player.x)&&this.y-20===player.y){// if the enemy hits the player
        player.x=200;
        player.y=360;
        if(scoreCounter!==0){
            decreaseScore();
        }
    }
    if(this.x>500){ //return enemy back to left
        this.x=-400;
    }



};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player =function() {
    this.x=200;
    this.y=360;
    this.sprite = 'images/char-boy.png';

};

Player.prototype.update = function() {
    if(player.y<40) {
        increaseScore();
        player.x = 200;
        player.y = 360;
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if(key==='left'){
        if(this.x>=100)
            this.x-=100;
    }
    else if(key==='right'){
        if(this.x<400)
            this.x+=100;
    }
    else if(key==='up'){
        this.y-=80;
    }
    else if(key==='down'){
        if(this.y<360)
            this.y+=80;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

function generateRandomEnemies() { // generate 2 enemies with random positions
    xArr = [-500, -800, -1200];
    yArr = [60, 140, 220];
    speedArr = [300, 500];
    for (let i = 0; i < 2; i++) {
        var x = xArr[Math.floor(Math.random() * xArr.length)];
        var y = yArr[Math.floor(Math.random() * yArr.length)];
        var speed = speedArr[Math.floor(Math.random() * speedArr.length)];
        var enemy = new Enemy(x, y, speed);
        allEnemies.push(enemy);
    }
}
function generateFixedEnemies(){ //generate 3 enemies with fixed y position
    var xArr = [-500, -800, -1200];
        y=60;
        speedArr=[300, 450];

    for(let i=0;i<3;i++){
        var x = xArr[Math.floor(Math.random() * xArr.length)];
        var speed = speedArr[Math.floor(Math.random() * speedArr.length)];
        var enemy = new Enemy(x,y,speed);
        allEnemies.push(enemy);
        y+=80;
    }
}

generateFixedEnemies();
generateRandomEnemies();

var chars=document.querySelectorAll('img');
var selector = document.querySelector('#select');
for (let i=0;i<chars.length;i++){
    chars[i].addEventListener('click',function () { //listen for choose a player
        player.sprite=chars[i].getAttribute('src');
        Engine(window); //start Engine
        selector.remove();
        updateScore(); //show score


    });
}
var player = new Player();

function updateScore(){ //method to show and update the score
    var score = document.querySelector('#score');
    score.innerHTML= '<p>Score: '+scoreCounter+'</p>';
}

function increaseScore(){ //if the player get into the water this method increases the score by one
    var score = document.querySelector('#score');
    var support = document.querySelector('#support');
    ++scoreCounter;
    updateScore();
    score.classList.toggle('increase');
    support.innerHTML="<p class='increase'>+1</p>";
    setTimeout(function () {
        score.classList.toggle('increase');
        support.innerHTML='';
    },600);
}

function decreaseScore(){ //if the enemy hit the player this method decreases the score by one
    var score = document.querySelector('#score');
    var support = document.querySelector('#support');
    --scoreCounter;
    updateScore();
    score.classList.toggle('decrease');
    support.innerHTML="<p class='decrease'>-1</p>";
    setTimeout(function () {
        score.classList.toggle('decrease');
        support.innerHTML='';
    },600);
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
