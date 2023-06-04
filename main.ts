var canvas = document.querySelector('canvas');

canvas!.width = window.innerWidth;
canvas!.height = window.innerHeight;

var c = canvas!.getContext("2d")

window.addEventListener("keypress", function(event){
    if(event.code == "Space"){
        for(var i=0; i<ballArr.length; i++){
            c!.beginPath();
            ballArr[i].dy = randomise(0,50)+10;
        }
    }
})

window.addEventListener("touchmove", function(event){
        for(var i=0; i<ballArr.length; i++){
            c!.beginPath();
            ballArr[i].dy = randomise(0,50)+10;
        }
    }
)

window.addEventListener('resize', function(event){
    canvas!.width = window.innerWidth;
    canvas!.height = window.innerHeight;
})

var colorArray = [
    "#080202",
    "#ECF8F9",
    "#068DA9",
    "#7E1717",
    "#E55807"
]

function randomise(min: number, max: number) : number{
    return Math.random() * max + min;
}

class Ball{
    x: number;
    y: number;
    radius: number;
    color: string;
    dy: number;
    gravity: number = 1;
    friction:number = 0.9;

    constructor(x:number, y:number, radius:number, dy:number){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = colorArray[Math.floor(randomise(0, colorArray.length))];
        this.dy = dy;
    }

    draw(){
        c!.beginPath();
        c!.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        c!.fillStyle = this.color;
        c!.fill();
    }
    
    animate(){
        if (this.y+this.radius > canvas!.height){
            this.dy = -this.dy * this.friction;    
        }

        else {
            this.dy += this.gravity;
        }

        this.y += this.dy;

        this.draw();
    }

}

var ball: Ball;
var ballArr: Array<Ball> = [];
function init(){
    for(var i=0; i<100; i++){
        var radius = randomise(10,100);
        ballArr.push(new Ball(randomise(radius, canvas!.width-radius),randomise(radius, canvas!.height-radius*5),radius,1));
    }
}


function animation(){
    requestAnimationFrame(animation);
    c!.clearRect(0,0,canvas!.width,canvas!.height);
    for(var i=0; i<ballArr.length; i++){
        c!.beginPath();
        ballArr[i].animate();
    }
}

init();
animation();