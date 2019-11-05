var isWebAudioUnlocked = false;
var isHTMLAudioUnlocked = false;

function unlock() {
    if (isWebAudioUnlocked  && isHTMLAudioUnlocked) return;

    // Unlock WebAudio - create short silent buffer and play it
    // This will allow us to play web audio at any time in the app
    var buffer = myContext.createBuffer(1, 1, 22050); // 1/10th of a second of silence
    var source = myContext.createBufferSource();
    source.buffer = buffer;
    source.connect(myContext.destination);
    source.onended = function()
    {
        console.log("WebAudio unlocked!");
        isWebAudioUnlocked = true;
        if (isWebAudioUnlocked && isHTMLAudioUnlocked)
        {
            console.log("WebAudio unlocked and playable w/ mute toggled on!");
            window.removeEventListener("mousedown", unlock);
        }
    };
    source.start();

    // Unlock HTML5 Audio - load a data url of short silence and play it
    // This will allow us to play web audio when the mute toggle is on
    var silenceDataURL:string = "data:audio/mp3;base64,//MkxAAHiAICWABElBeKPL/RANb2w+yiT1g/gTok//lP/W/l3h8QO/OCdCqCW2Cw//MkxAQHkAIWUAhEmAQXWUOFW2dxPu//9mr60ElY5sseQ+xxesmHKtZr7bsqqX2L//MkxAgFwAYiQAhEAC2hq22d3///9FTV6tA36JdgBJoOGgc+7qvqej5Zu7/7uI9l//MkxBQHAAYi8AhEAO193vt9KGOq+6qcT7hhfN5FTInmwk8RkqKImTM55pRQHQSq//MkxBsGkgoIAABHhTACIJLf99nVI///yuW1uBqWfEu7CgNPWGpUadBmZ////4sL//MkxCMHMAH9iABEmAsKioqKigsLCwtVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVV//MkxCkECAUYCAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
    var tag:HTMLAudioElement = document.createElement("audio");
    tag.controls = false;
    tag.preload = "auto";
    tag.loop = false;
    tag.src = silenceDataURL;
    tag.onended = function()
    {
        console.log("HTMLAudio unlocked!");
        isHTMLAudioUnlocked = true;
        if (isWebAudioUnlocked && isHTMLAudioUnlocked)
        {
            console.log("WebAudio unlocked and playable w/ mute toggled on!");
            window.removeEventListener("mousedown", unlock);
        }
    };
    var p = tag.play();
    if (p) p.then(function(){console.log("play success")}, function(reason){console.log("play failed", reason)});
}

window.addEventListener("mousedown", unlock);
