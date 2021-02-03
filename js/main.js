var $ = require("jquery");
var CanvasGrid = require("./CanvasGrid");
var KMeans = require("./KMeans");

$(document).ready(function () {

    let $canvas = $("#canvas");
    let canvas = new CanvasGrid($canvas[0], 500, 20);
    let timeout = 500;

    let points = [
        [50, 50, 0],
        [100, 200, 0],
        [50, 150, 0],
        [100, 50, 0],
        [30, 30, 0],
        [300, 300, 0],
        [350, 310, 0],
        [400, 370, 0],
        [420, 270, 0],
    ];

    let kMeans = new KMeans(points, 2, 480);

    $canvas.on('click', function (e) {
        const x = e.originalEvent.clientX;
        const y = e.originalEvent.clientY;
        points.push([x - canvas.margin - 5, canvas.size - y - canvas.margin + 5, 0])
        kMeans.assignPoints()
        redraw()
    });

    let redraw = function () {
        canvas.clear();
        canvas.drawAxis();
        canvas.drawPoints(kMeans.points);
        canvas.drawCentroids(kMeans.centroids);
    }

    $("#assign").on('click', function () {
        kMeans.assignPoints();
        redraw();
    });

    $("#recenter").on('click', function () {
        kMeans.recenter();
        redraw();
    });

    $("#reset").on('click', function() {
        kMeans.setK(kMeans.k);
        redraw();
    });

    var takeTurn = function() {
        kMeans.assignPoints();
        redraw();

        setTimeout(function() {
            const didChange = kMeans.recenter();
            redraw();

            if(didChange) {
                setTimeout(takeTurn, timeout);
            } else {
                $autostart.removeAttr("disabled");
            }
        }, timeout);
    };

    const $autostart = $("#autostart");
    $autostart.on('click', function() {
        $autostart.attr("disabled", "disabled");
        takeTurn();
    })

    $("#range, #input").on('change', function(e) {
        const k = parseInt($(e.target).val());
        $("#range").val(k);
        $("#input").val(k);
        kMeans.setK(k);
        redraw();
    })
    redraw();
});
