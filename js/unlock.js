var ctx = null, usingWebAudio = true;

try {
  if (typeof AudioContext !== 'undefined') {
      ctx = new AudioContext();
  } else if (typeof webkitAudioContext !== 'undefined') {
      ctx = new webkitAudioContext();
  } else {
      usingWebAudio = false;
  }
} catch(e) {
    usingWebAudio = false;
}

// context state at this time is `undefined` in iOS8 Safari
if (usingWebAudio && ctx.state === 'suspended') {
  var resume = function () {
    ctx.resume();

    setTimeout(function () {
      if (ctx.state === 'running') {
        document.body.removeEventListener('touchend', resume, false);
      }
    }, 0);
  };

  document.body.addEventListener('touchend', resume, false);
}
