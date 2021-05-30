var w=window.innerWidth;
var h=window.innerHeight;
let maintext=document.querySelector('.intro');
let button=document.querySelector('.click');
let overlay=document.querySelector('.overlay');
let modal=document.querySelector('.modal');
let resetButton=document.querySelector('.restart');
var score=0;
button.addEventListener('click',function(){
	button.innerHTML="START";
	$(".intro").slideUp("slow");
    
	init();
	
})
function init(){
	canvas = document.getElementById('mycanvas');
	W = canvas.width =w/1.2;
    H  = canvas.height = h/1.2;
	pen = canvas.getContext('2d');
	cs = 65;
	game_over = false;
	score = 0;


	//Create a Image Object for food
	food_img = new Image();
	food_img.src = "Assets/apple.png";

	trophy = new Image();
	trophy.src = "Assets/trophy.png";

	food = getRandomFood();
	snake = {
		init_len:5,
		color:"blue",
		cells:[],
		direction:"right",


		createSnake:function(){
			for(var i=this.init_len;i>0;i--){
				this.cells.push({x:i,y:0});
			}
		},
		drawSnake:function(){

			for(var i=0;i<this.cells.length;i++){
				pen.fillStyle = this.color;
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
			}
		},

		updateSnake:function(){
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;

			if(headX==food.x && headY==food.y){
				console.log("Food eaten");
				food = getRandomFood();
				score++;
				sound();

			}
			else
			{
				this.cells.pop();
			}


			var nextX,nextY;

			if(this.direction=="right"){
				nextX = headX + 1;
				nextY = headY;
			}
			else if(this.direction=="left"){
				nextX = headX - 1;
				nextY = headY;
			}
			else if(this.direction=="down"){
				nextX = headX;
				nextY = headY + 1;
			}
			else{
				nextX = headX;
				nextY = headY - 1;
			}

			this.cells.unshift({x: nextX,y:nextY});

		
			var last_x = Math.round(W/cs);
			var last_y = Math.round(H/cs);

			if(this.cells[0].y<0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y)
			{
				game_over = true;
			}

		}

	};

	snake.createSnake();
	//Add an Event Listener on the Document Object
	function keyPressed(e){
		//Conditional Statments
		if(e.key=="ArrowRight"){
			snake.direction = "right";
		}
		else if(e.key=="ArrowLeft"){
			snake.direction = "left";
		}
		else if(e.key=="ArrowDown"){
			snake.direction = "down";
		}
		else{
			snake.direction = "up";
		}
		console.log(snake.direction);
	}


	document.addEventListener('keydown',keyPressed) ;

}


function draw(){
	//console.log("In Draw");

	//erase the old frame
	pen.clearRect(0,0,W,H);
	snake.drawSnake();

	pen.fillStyle = food.color;
	pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);

	pen.drawImage(trophy,18,20,cs,cs);
	pen.fillStyle = "blue";
	pen.font = "20px Roboto"
	pen.fillText(score,50,50);


}

function update(){
	//console.log("In Update");
	snake.updateSnake();
}

function getRandomFood(){

	var foodX = Math.round(Math.random()*(W-cs)/cs);
	var foodY = Math.round(Math.random()*(H-cs)/cs);

	var food = {
		x:foodX,
		y:foodY,
		color:"red",
	}
	return food;

}
let finalScore=document.querySelector('.score');
function gameloop(){
	if(game_over==true){
		finalScore.innerHTML=score;
		modal.classList.remove('hidden');
		overlay.classList.remove('hidden');
		return;
	}

	draw();
	update();
}

// gameloop();
///;lsasd;lfjsda;lfj
var f = setInterval(gameloop,100);
var x=document.getElementById("myaudio");
function sound(){
	x.play();
}
var diesound=document.getElementById("daudio");
function dsound(){
	diesound.play();
}
resetButton.addEventListener('click',function(){
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
	init();
})