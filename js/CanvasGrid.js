var CanvasGrid = function(canvas, size, margin) {
    this.canvas = canvas;
    /**
     * @type CanvasRenderingContext2D
     */
    this.ctx = canvas.getContext("2d");
    this.size = size;
    this.margin = margin;
};

CanvasGrid.prototype.clear = function() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.size, this.size);
}

CanvasGrid.prototype.drawAxis = function() {
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(this.margin, this.margin);
    this.ctx.lineTo(this.margin, this.size - this.margin);
    this.ctx.lineTo(this.size - this.margin, this.size - this.margin);
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
};

/**
 *
 * @param points array
 */
CanvasGrid.prototype.drawPoints = function(points) {
    for(let i in points) {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.getColorForCluster(points[i][2]);
        this.ctx.arc(points[i][0] + this.margin, this.size - points[i][1] - this.margin, 5, 0, 2*Math.PI, false);
        this.ctx.fill();
    }
}

CanvasGrid.prototype.drawCentroids = function(points) {
    for(let i in points) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 2;
        this.ctx.arc(points[i][0] + this.margin, this.size - points[i][1] - this.margin, 8, 0, 2*Math.PI, false);
        this.ctx.stroke();
    }
}

CanvasGrid.prototype.getColorForCluster = function(cluster) {
    switch (cluster) {
        case 0:
            return "red";
        case 1:
            return "#00aa00";
        case 2:
            return "blue";
        case 3:
            return "orange";
        case 4:
            return "gray";
        case 5:
            return "yellow";
        case 6:
            return "black";
        case 7:
            return "lightblue";
        case 8:
            return "purple";
    }
}

module.exports = CanvasGrid;