/*jslint plusplus: true */
var size = 500;
var inside = 0;
var outside = 0;
var pi = 0.0;
var digits = 6;

var myTimer;
var running = true;
var interval = 100;

$( "#slider" ).slider({
    min: 0,
    max: 400,
    value: 100,
    change: function(event, ui) {
        interval = Math.pow(10, 4.0 - ui.value/100.0) / 10.0;
        
        if (running) {
            clearInterval(myTimer);
            myTimer = setInterval(newPoint, interval);
        }
    }
});

var numberTxt = document.getElementById("number");
var insideTxt = document.getElementById("inside");
var outsideTxt = document.getElementById("outside");
var piTxt = document.getElementById("pi");

var pausePlayButton = document.getElementById("pausePlayButton");

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
c.width = size;
c.height = size;

restart();

function update() {
    numberTxt.innerHTML = parseInt(inside + outside);
	insideTxt.innerHTML = inside.toString();
	outsideTxt.innerHTML = outside.toString();
	piTxt.innerHTML = pi.toFixed(digits).toString();
}

function newPoint() {
	var x = size * Math.random() - size / 2, y = size * Math.random() - size / 2;

	if (Math.pow(size / 2, 2) > Math.pow(x, 2) + Math.pow(y, 2)) {
		inside++;
		ctx.fillStyle = "#4cba6f";
	} else {
		outside++;
		ctx.fillStyle = "#f65e3b";
	}

	ctx.beginPath();
	ctx.arc(x + size / 2, y + size / 2, 2, 0, 2 * Math.PI);
	ctx.fill();

	pi = 4.0 * inside / (inside + outside);

    update();
}

function restart() {
	inside = 0;
	outside = 0;
	pi = 0.0;
    
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
	ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
	ctx.strokeStyle = "#d3d3d3";
	ctx.stroke();
    
    update();
}

function pausePlay() {
    if (running) {
        clearInterval(myTimer);
        pausePlayButton.innerHTML = "<i class='fa fa-play'></i> Resume";
        pausePlayButton.style.backgroundColor = "#4cba6f";
    } else {
        myTimer = setInterval(newPoint, interval);
        pausePlayButton.innerHTML = "<i class='fa fa-pause'></i> Pause";
        pausePlayButton.style.backgroundColor = "#f65e3b";
    }
    running = !running;
}

myTimer = setInterval(newPoint, interval);