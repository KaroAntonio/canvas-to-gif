

var canvas, ctx, gif, grad, h2, i, info, j, p, ref2, startTime, w2;

var now = ((ref = window.performance) != null ? (ref1 = ref.now) != null ? ref1.bind(window.performance) : void 0 : void 0) || Date.now;

var width = 100;
var height = width;
var num_frames = 60
var text = 'HYPNO TOAD';
var textSize = 70;

function draw() {

    init()

    // DRAW GIF FRAMES 
    // ~ forgive the ugliness
    ctx.font = "bold " + textSize + "px Helvetica";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 3;
    w2 = width / 2;
    h2 = height / 2;
    
    var i, j, ref2;
    for (i = j = 0, ref2 = num_frames; 0 <= ref2 ? j < ref2 : j > ref2; i = 0 <= ref2 ? ++j : --j) {
        p = i / (num_frames - 1); // in range [0,1]

        // Define Grad
        //grad = ctx.createRadialGradient(w2, h2, 0, w2, h2, w2);
        //grad.addColorStop(0, hsl(p, 1, 0.5));
        //grad.addColorStop(1, hsl((p + 0.2) % 1, 1, 0.4));
        //grad.addColorStop(1, 'rgba(0,0,0,0)');

        // Draw Text
        //ctx.strokeStyle = hsl((p + 0.8) % 1, 1, 0.9);
        //ctx.fillText(text, w2, h2);
        //ctx.strokeText(text, w2, h2);

        // Draw BG
        ctx.fillStyle = '#d1e09f';
        ctx.fillRect(0, 0, width, height);

        // Draw circles
        var nCircles = 4;
        for  (var k = 0; k < nCircles; k++) {
            drawCircle( ctx, width/2, height/2, width/2-16+(2*(Math.sin(p*Math.PI*2 + k/nCircles*Math.PI*2/nCircles)+1))*2 ) 
        }

        gif.addFrame(ctx, {
            copy: true,
            delay: 20
          });
    }

    return gif.render();
}

function init() {

    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    startTime = null;
    ctx = canvas.getContext('2d');

    gif = new GIF({
        workers: 4,
        workerScript: '/scripts/gif.worker.js',
        width: width,
        height: height
        });
        gif.on('start', function() {
        startTime = now();
        });
        gif.on('progress', function(p) {
        document.id('info').set('text', Math.round(p * 100) + '%');
        });
        gif.on('finished', function(blob) {
        var delta, img;
        img = document.id('result');
        img.src = URL.createObjectURL(blob);
        delta = now() - startTime;
        return document.id('info').set('text', "100%\n" + ((delta / 1000).toFixed(2)) + "sec\n" + ((blob.size / 1000).toFixed(2)) + "kb");
        });
}

function drawCircle( ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.stroke();
}

rgb = function() {
    var rgb;
    rgb = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return "rgb(" + (rgb.map(function(v) {
      return Math.floor(v * 255);
    }).join(',')) + ")";
  };
  
hsl = function() {
    var hsl;
    hsl = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    hsl = hsl.map(function(v, i) {
      if (i === 0) {
        return v * 360;
      } else {
        return (v * 100) + "%";
      }
    });
    return "hsl(" + (hsl.join(',')) + ")";
  };

  