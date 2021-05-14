status = ""
objects = []

function preload() {
    vid = loadImage("Warning-sound.mp3")
}

function setup() {
    canvas = createCanvas(380, 380)
    canvas.center();
    video = createCapture(VIDEO)
    video.hide()
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
}

function modelLoaded() {
    console.log("Object Detector Loaded");
    status = true
    
}

function gotResult(error, results) {
    if (error) {
        console.log(error)
    }
    console.log(results);
    objects = results
}

function draw() {
    image(video, 0, 0, 380, 380)

    if (status != "") {
        r = random(255)
        g = random(255)
        b = random(255)

        objectDetector.detect(video, gotResult)
        for (let i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected"
            objects = objects[i].label
            fill(r, g, b)
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15)
            noFill()
            stroke(r, g, b)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
        if (objects == "person") {
             document.getElementById("safety_or_not").innerHTML = "Baby is safe"
             if (status = true) {
                 status = false
             }
             vid.stop()
        } else {
            vid.play()
            document.getElementById("safety_or_not").innerHTML = "Baby is not safe."
        }
    }
}