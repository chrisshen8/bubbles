console.log('Testing');
var canvas = document.querySelector('canvas');

// jQuery prevents spacebar scroll
window.onkeydown = function(e) { 
    return !(e.keyCode == 32);
};

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// Mousemove event listener stores coordinates in mouse object
var mouse = {
    x: undefined,
    y: undefined,
}
window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    })
//Resize event listener
window.addEventListener('resize',
    function(event) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        //init();
    })

// MOUSE CLICK event listener
var snd = new Audio('assets/pop.wav');
window.addEventListener('mousedown',
    function(event) {
        snd.play();
        reColor();
    })
// SPACE BAR Change color of all circles
window.addEventListener('keydown',
    function(event) {
        if (event.keyCode === 32) {
            snd.play();
            reColor();
        }
    })

//LOCAL STORAGE - Cycle thru color schemes in order
/*
if (sessionStorage.getItem('position') === null) {
    sessionStorage.setItem('position','0');
} else {
    let position = sessionStorage.getItem('position');
    position = (parseInt(position) + 1) % 6;
    sessionStorage.setItem('position', position.toString());
}
var position = parseInt(sessionStorage.getItem('position'));
var colorArray = colorSchemes[position];
*/

var colorSchemeIndex = Math.floor(Math.random() * colorSchemes.length);
var colorArray = colorSchemes[colorSchemeIndex];


// create a bunch of circles and store them into an array
var numOfCircles = 600;
var circleArray = [];
function init() {
    circleArray = [];
    for (let i = 0; i < numOfCircles; i++) {
        let r = Math.random() * 15 + 5;
        let x = Math.random() * (innerWidth - 2*r) + r;
        let y = Math.random() * (innerHeight - 2*r) + r;
        let dx = Math.random() * 4 - 2; // speed b/w 2 and -2
        let dy = Math.random() * 4 - 2;
        let color = Math.floor(Math.random() * 5); // color schemes have exactly five colors
        circleArray.push(new Circle(x,y,r,dx,dy,colorArray[color]));
    }
}
// Animation goes here
init();
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
    wasKeyPressed = false;
}
animate();

function reColor() {
    colorSchemeIndex = (colorSchemeIndex + 1) % colorSchemes.length;
    let reColorScheme = colorSchemes[colorSchemeIndex];
    for (let i = 0; i < numOfCircles; i++) {
        let newColor = reColorScheme[Math.floor(Math.random() * colorSchemes.length)];
        circleArray[i].setColor(newColor);
    }
}

/*
function drawText() {
    c.font = '42px Arial';
    c.textAlign = 'center';
    c.fillStyle = 'black';
    c.fillText("HTML5 Canvas Text", innerWidth/2, innerHeight/2);
}
*/