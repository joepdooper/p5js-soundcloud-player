# p5js-soundcloud-player

Music-player with visualisation loading Soundcloud tracks! **Deprecated**   
https://joepdooper.github.io/p5js-soundcloud-player

## Note from SoundCloud
> The support for JS SDK is deprecated

## Built With

[P5.js](https://p5js.org/reference/#/libraries/p5.sound) - p5.sound extends p5 with Web Audio functionality including audio input, playback, analysis and synthesis.   
[SoundCloud API](https://developers.soundcloud.com/docs/api/guide) - [SoundCloud API on GitHub](https://github.com/soundcloud/api) - Using the SoundCloud API, you can build applications that take sound on the web to the next level.

## Note from SoundCloud
> Due to the high amount of requests recently received, we will no longer be processing API application requests at this time. We are working to re-evaluate our process to make it more efficient.

## How it works

Edit [sketch.js](https://github.com/joepdooper/p5js-soundcloud-player/blob/master/js/sketch.js#L20) with your own SoundCloud `client_id`. More info at https://soundcloud.com/you/apps

```javascript
var CLIENT_ID = 'GET-YOURS-AT-SOUNDCLOUD';
```

Edit [sketch.js](https://github.com/joepdooper/p5js-soundcloud-player/blob/master/js/sketch.js#L21) if you want to load Soundcloud user's tracks or user's sets.

### user/tracks
```javascript
var PLAYLIST_URL = 'https://soundcloud.com/USER/tracks';
```
```javascript
for(var i=0;i<playlist.length;i++) {
  urlList.push(playlist[i].stream_url + '?client_id=' + CLIENT_ID);
  nameList.push(playlist[i].title);
}
```

### user/sets
```javascript
var PLAYLIST_URL = 'https://soundcloud.com/USER/sets/SETNAME';
```
```javascript
for(var i=0;i<playlist.tracks.length;i++) {
  urlList.push(playlist.tracks[i].stream_url + '?client_id=' + CLIENT_ID);
  nameList.push(playlist.tracks[i].title);
}
```

## Issues
https://github.com/soundcloud/api/issues/107#issuecomment-908285769  
https://github.com/processing/p5.js-sound/issues/506 (Solved with latest release)  
https://github.com/processing/p5.js-sound/issues/372 (Solved)  
https://github.com/processing/p5.js-sound/issues/357 (Solved with latest release)  
https://github.com/processing/p5.js-sound/issues/430 (Solved)

## Thanks
Thank you [Spencer Evans](https://github.com/swevans) for the [unmute.min.js](https://github.com/swevans/unmute) file; it enables web audio playback with the ios mute switch on.

## Authors
* **Joep Dooper** - [Joep Dooper](https://github.com/joepdooper)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
