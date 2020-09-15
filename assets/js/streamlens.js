// Grabbing settings
var ww = window.innerWidth;
var wh = window.innerHeight;
var video = document.getElementById('video');
var dst = document.getElementById('dst');


function camInitSuccess() {
    console.log('CamEngine starting...');
    CamEngine.start();
}


function lensTracker(evt) {
    // console.log(evt.type)
    if (evt.type == 'touchmove') {
        evt.preventDefault()
        var mp = LensModule.trackTouch(evt);
    } else {
        var mp = LensModule.trackMouse(evt);
    }
    LensModule.setCenter(mp.x, mp.y);
}


function lensloadStream(resolve) {
    console.log(resolve);
    LensModule.readImage(video);
    document.addEventListener('mousemove', lensTracker, false);
    document.addEventListener('touchmove', lensTracker, {passive: false});
}


function lensProcessor(imgData) {
    LensModule.readImage(video);
    LensModule.setImageDataDst(imgData);
    LensModule.process();
    return imgData;
}


CamEngine.init({
    video: video,
    captureWidth: ww,
    captureHeight: wh,
    procWidth: ww,
    procHeight: wh,
    outputCvs: dst,
    captureIntervalTime: 100,
    initSuccessCallback: camInitSuccess,
    processor: lensProcessor,
    tolerance: -15
});


LensModule.init({
    imageCtx: dst,
    imageWidth: ww,
    imageHeight: wh,
    radius: 300,
    initSuccessCallback: lensloadStream
});
