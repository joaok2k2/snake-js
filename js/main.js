//Sprites and background || vars
var snake_img = new Image;
var body_img = new Image;
body_img.src = "./img/snakebody1_green_R.png";
snake_img.src = "./img/snakehead_green_R.png";
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let apple_img = document.getElementById("apple");
let rotten_img = document.getElementById("rotten_apple");
let bg_img = document.getElementById("bg");
var dif = 70;



//SnakeStart
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

//StartPosition
let direction = "right";

//RandomFood
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y:Math.floor(Math.random() * 15 + 1) * box
}
let rotten_food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y:Math.floor(Math.random() * 15 + 1) * box
}

//BackgroundDraw
function criarBG(){
    background = context.createPattern(bg_img, "repeat")
    context.fillStyle = background;
    context.fillRect(0, 0, 16 * box, 16 * box);
}

//DrawSnake
function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        if(i == 0){
            let snake_head = context.createPattern(snake_img, "repeat");
            context.fillStyle = snake_head;
            context.fillRect(snake[i].x, snake[i].y, box, box);
        }
        if(i != 0){
            let snake_body = context.createPattern(body_img, "repeat");
            context.fillStyle = snake_body;
            context.fillRect(snake[i].x, snake[i].y, box, box);

        }
    }   
}

//Draw Apple
function drawFood(){
    apple = context.createPattern(apple_img, "repeat");
    context.fillStyle = apple;
    context.fillRect(food.x, food.y, box, box);
    
}

//Draw Rotten Apple
function drawRottenApple(){
    rotten_apple = context.createPattern(rotten_img, "repeat")
    context.fillStyle = rotten_apple;
    context.fillRect(rotten_food.x, rotten_food.y, box, box);
}

//Event Listener to keys press
document.addEventListener("keydown", update);

function update(event){
    if((event.keyCode == 37 || event.keyCode == 65) && direction != "right"){
        direction = "left";
        snake_img.src = "./img/snakehead_green_L.png"
        body_img.src = "./img/snakebody1_green_L.png"
    }
        
    if((event.keyCode == 38|| event.keyCode == 87) && direction != "down"){ 
        direction = "up";
        snake_img.src = "./img/snakehead_green_U.png"
        body_img.src = "./img/snakebody1_green_U.png"
    }
    if((event.keyCode == 39 || event.keyCode == 68) && direction != "left"){
        direction = "right";
        snake_img.src = "./img/snakehead_green_R.png"
        body_img.src = "./img/snakebody1_green_R.png"
    }
    if((event.keyCode == 40 || event.keyCode == 83) && direction != "up"){
        direction = "down"; 
        snake_img.src = "./img/snakehead_green_D.png"
        body_img.src = "./img/snakebody1_green_D.png"
    } 
}




//Process
function iniciarJogo(){
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Game Over!");
            location.reload();
        }
    }
    
    criarBG();
    criarCobrinha();
    drawFood();
    drawRottenApple();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Movimentação em pixel X e Y.
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    // Apple
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        dif--;
    }
    
    //Rotten Apple
    if(snakeX != rotten_food.x || snakeY != rotten_food.y){
        
    }else{
        rotten_food.y = Math.floor(Math.random() * 15 + 1) * box;
        rotten_food.x = Math.floor(Math.random() * 15 + 1) * box;
        snake.pop()
        dif++;
        if(snake.length <= 0){
            clearInterval(jogo);
            alert("Game Over!");
            location.reload();
        }
    }
    document.getElementById("pontos").innerHTML = snake.length;
    
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    // Append to snake[]
    snake.unshift(newHead);
    //console.log(snake);
    
}

//Update
let jogo = setInterval(iniciarJogo, dif);
