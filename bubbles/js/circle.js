function Circle(x, y, radius, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.maxRadius = 4.5 * radius;
    this.minRadius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;

    this.setColor = function(newColor) {
        this.color = newColor;
    }

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.fillStyle = this.color;
        c.stroke();
        c.fill();
    }
    this.update = function() {
        // movement
        this.x += this.dx;
        this.y += this.dy;
        // bouncing off walls
        if (this.x < this.radius || this.x > innerWidth - this.radius) {
            this.dx = -this.dx;
        }
        if (this.y < this.radius || this.y > innerHeight - this.radius) {
            this.dy = -this.dy;
        }
        // interact with mouse
        if (Math.abs(mouse.x - this.x) < 100 
            && Math.abs(mouse.y - this.y) < 100) {
            if (this.radius < this.maxRadius) {
                this.radius += 2;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 2;
        }
        //update color


        // display on canvas
        this.draw();
    }
}