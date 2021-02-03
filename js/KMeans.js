var KMeans = function (points, k, max) {
    this.points = points;
    this.max = max;
    this.setK(k);
}

KMeans.prototype.assignPoints = function () {
    for (let pointIndex in this.points) {
        let newCentroid = -1;
        let maxDistance = Infinity;

        for (const centroidIndex in this.centroids) {
            let distance = Math.sqrt(
                Math.pow(this.centroids[centroidIndex][0] - this.points[pointIndex][0], 2) +
                Math.pow(this.centroids[centroidIndex][1] - this.points[pointIndex][1], 2)
            );

            if (maxDistance > distance) {
                newCentroid = centroidIndex;
                maxDistance = distance;
            }
        }

        this.points[pointIndex][2] = parseInt(newCentroid);
    }
};

KMeans.prototype.recenter = function () {
    let didChange = false;

    for (const centroidIndex in this.centroids) {
        const points = this.points.filter(point => point[2] == centroidIndex);
        if (points.length === 0) {
            didChange = true;
            this.centroids[centroidIndex] = [
                Math.floor(Math.random() * this.max),
                Math.floor(Math.random() * this.max)
            ];
            continue;
        }
        var x = 0;
        var y = 0;

        for (const pointIndex in points) {
            x += points[pointIndex][0];
            y += points[pointIndex][1];
        }

        const newX = Math.round(x / points.length);
        const newY = Math.round(y / points.length);
        if (newX != this.centroids[centroidIndex][0] || newY != this.centroids[centroidIndex][1]) didChange = true;
        this.centroids[centroidIndex][0] = newX;
        this.centroids[centroidIndex][1] = newY;
    }

    return didChange;
}

KMeans.prototype.setK = function (k) {
    this.k = k;
    for (let pointIndex in this.points) {
        this.points[pointIndex][2] = 0;
    }

    this.centroids = [];

    for (let i = 0; i < k; i++) {
        this.centroids.push([
            Math.floor(Math.random() * this.max),
            Math.floor(Math.random() * this.max)
        ]);
    }
}

module.exports = KMeans;