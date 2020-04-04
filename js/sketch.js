//Variable
var sound, seconds, minutes, bass, mid, treble, list, percent;
var urlList = [];
var nameList = [];
var currentIndex = 0;
var buttonPlay = document.getElementById('play');
var buttonPrev = document.getElementById('prev');
var buttonNext = document.getElementById('next');
var selectSound = document.getElementById('selectSound');
var songName = document.getElementById('songname');
var songTime = document.getElementById('songtime');
var loadingBar = document.getElementById('loadingBar');
var progressBar = document.getElementById('progressBar');
var start = true;
var end = false;

var seconds, minutes, bass, mid, treble, list, ntgr;

//SoundCloud
var CLIENT_ID = '95f22ed54a5c297b1c41f72d713623ef';
var PLAYLIST_URL = 'https://soundcloud.com/fftb/sets/party';
SC.initialize({
  client_id: CLIENT_ID
});
SC.resolve(PLAYLIST_URL).then(function(playlist){
  for(var i=0;i<playlist.tracks.length;i++) {
    urlList.push(playlist.tracks[i].stream_url + '?client_id=' + CLIENT_ID);
    nameList.push(playlist.tracks[i].title);
  }
  selectSound.appendChild(createPlaylist(nameList));
}).catch(function(error){
  console.log(error);
});

//Buttons
buttonPlay.addEventListener('click', function() {
  if (start == true) {
    changeSong(buttonPlay);
  }
}, false);
buttonPrev.addEventListener('click', function() {
  if (start == true) {
    changeSong(buttonPrev);
  }
}, false);
buttonNext.addEventListener('click', function() {
  if (start == true) {
    changeSong(buttonNext);
  }
}, false);
selectSound.addEventListener('click', function(eve) {
  if (start == true) {
    listitem = eve.target;
    changeSong(selectSound);
  }
}, false);
progressBar.addEventListener("click", function(progbar) {
  percent = (progbar.offsetX / this.offsetWidth);
  changeSong(progressBar);
}, false);

//Keys
function keyPressed() {
  if (key == ' ') {
    if (start == true) {
      changeSong(buttonPlay);
    }
  } else if (keyCode === LEFT_ARROW) {
    if (start == true) {
      changeSong(buttonPrev);
    }
  } else if (keyCode === RIGHT_ARROW) {
    if (start == true) {
      changeSong(buttonNext);
    }
  }
}

//loadSound callbacks
function success() {
  start = true;
  sound.playMode('restart');
  sound.onended(endSong);
  sound.play();
  console.log('Sound is loaded : ' + sound.isLoaded());
}
function error(fail) {
  console.log(fail);
}
function progress(percent) {
  progressBar.value = 0;
  start = false;
  loadingBar.value = (percent*100) + 1;
  console.log((percent*100) + 1);
  songName.innerHTML = nameList[currentIndex];
  songTime.innerHTML = ((percent*100) + 1).toFixed() + '%';
}

//Preload
function preload() {
  sound = loadSound('audio/unmute.mp3');
  unmute(sound);
}

function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}

//Setup
function setup(loadsong) {
  sound = loadSound(loadsong, success, error, progress);
  fft = new p5.FFT();
  amplitude = new p5.Amplitude();
  peakDetect = new p5.PeakDetect(20,100);
  fft.setInput(sound);
  amplitude.setInput(sound);
  pixelDensity(1);
  var cnv = createCanvas(document.getElementById('canvaswrapper').offsetWidth, document.getElementById('canvaswrapper').offsetHeight);
  cnv.parent('canvaswrapper');
  noFill();
};

//Draw
function draw() {

  clear();

  seconds = Math.floor(sound.currentTime() % 60);
  minutes = Math.floor(sound.currentTime() / 60);
  if (sound.isLoaded() && !sound.isPaused()) {
    songTime.innerHTML = ('0' + minutes).substr(-2) + ':' + ('0' + seconds).substr(-2);
    progressBar.value = 100 * (sound.currentTime() / sound.duration());
    if (Math.floor(sound.currentTime()) == Math.floor(sound.duration()) && end != true) {
      console.log('song ended');
      end = true;
    }
  }
  fft.analyze();

  //energy
	bass = fft.getEnergy("bass") / 100;
	treble = fft.getEnergy("treble") / 100;
	mid = fft.getEnergy("mid") / 100;

  //amplitude
  var level = amplitude.getLevel();

  //peakDetect
  peakDetect.update(fft);
  if ( peakDetect.isDetected ) {

  } else {

  }
  //spectrum
  var spectrum = fft.analyze();
  beginShape();
  strokeWeight(2);
   for (i = 0; i<spectrum.length; i++) {
    vertex((width/spectrum.length)*i, map((spectrum[i]), 0, 255, height/2, 0));
   }
   endShape();
};

//Controls
function playCurrentSound() {
  if (!sound.isPlaying() && !sound.isPaused()) {
    setup(urlList[currentIndex]);
    setSong();
	buttonPlay.id = "pause";
  } else if (sound.isPaused()) {
    sound.play();
    buttonPlay.id = "pause";
  } else {
    sound.pause();
    buttonPlay.id = "play";
  }
}
function changeSong(btn) {
  if (btn == buttonPlay) {
    playCurrentSound();
  } else if (btn == buttonNext) {
    sound.playMode('sustain'); //Safari-Hack
    sound.play(); //Safari-Hack
    sound.stop();
    if (currentIndex == (urlList.length - 1)) {
      currentIndex = '0';
    } else {
      currentIndex = Math.min(currentIndex + 1, urlList.length - 1);
    }
    playCurrentSound();
  } else if (btn == buttonPrev) {
    sound.playMode('sustain'); //Safari-Hack
    sound.play(); //Safari-Hack
    sound.stop();
    if (currentIndex == 0) {
      currentIndex = (urlList.length - 1)
    } else {
        currentIndex = Math.max(currentIndex - 1, 0);
    }
    playCurrentSound();
  } else if (btn == selectSound) {
    for (var i=0;i<urlList.length;i++) {
      if (nameList[i] == listitem.innerHTML) {
        sound.stop();
        currentIndex = i;
        playCurrentSound();
      }
    }
  } else if (btn == progressBar) {
      buttonPlay.id = "pause";
      sound.jump(sound.duration() * percent);
  }
}
//Playlist
function createPlaylist(array) {
  var list = document.createElement('ul');
  for(var i = 0; i < array.length; i++) {
    listitem = document.createElement('li');
    if (ntgr == "odd") {
      listitem.classList.add('even');
      ntgr = "even";
    } else {
      listitem.classList.add('odd');
      ntgr = "odd";
    }
    if (i == 0) {
      listitem.classList.add('active');
    }
    listitem.appendChild(document.createTextNode(array[i]));
    list.appendChild(listitem);
  }
  return list;
}
function setSong() {
  for (var i=0;i<urlList.length;i++) {
    selectSound.getElementsByTagName("li")[i].classList.remove('active');
    if (nameList[i] == nameList[currentIndex]) {
      selectSound.getElementsByTagName("li")[i].classList.add('active');
    }
  }
}
//endSong
function endSong() {
  if (!sound.isPaused() && end == true && (sound.currentTime() == '0' || sound.currentTime().toString().split(".")[0] == sound.duration().toString().split(".")[0])) {
    if (currentIndex == (urlList.length - 1)) {
      currentIndex = '0';
    } else {
      currentIndex = Math.min(currentIndex + 1, urlList.length - 1);
    }
    setup(urlList[currentIndex]);
    setSong();
    progressBar.value = sound.currentTime();
    end = false;
  }
}
