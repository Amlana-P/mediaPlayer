let trackArt = document.querySelector(".track-art");
let trackName = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");

let playPauseBtn = document.querySelector(".play-pause-track");
let nextBtn = document.querySelector(".next-track");
let prevBtn = document.querySelector(".prev-track");

let seekSlider = document.querySelector(".seek-slider");
let volumeSlider = document.querySelector(".volume-slider");
let currTime = document.querySelector(".current-time");
let totalDuration = document.querySelector(".total-duration");

let trackIndex = 0;
let isPlaying = false;
let updateTimer;

let currTrack = document.createElement('audio');

let trackList = [
    {
        name: "Futuristic Beat",
        artist: "Lemon Music",
        image: "./media/IUID1.jpg",
        path: "./media/futuristic-beat.mp3"
    },
    {
        name: "Leva Eternity",
        artist: "Lemon Music Studio",
        image: "./media/IUID2.jpg",
        path: "./media/leva-eternity.mp3"
    },
    {
        name: "Waterfall",
        artist: "Lemon",
        image: "./media/IUID3.jpg",
        path: "./media/waterfall.mp3"
    }
  ];

let loadTrack = (trackIndex) => {
    clearInterval(updateTimer);
    resetValues();

    currTrack.src = trackList[trackIndex].path;
    currTrack.load();

    trackArt.src = trackList[trackIndex].image;
    trackName.textContent = trackList[trackIndex].name;
    trackArtist.textContent = trackList[trackIndex].artist;

    updateTimer = setInterval(seekUpdate, 1000);

    currTrack.addEventListener("ended", nextTrack);
};

let resetValues = () => {
    currTime.textContent = "00:00";
    totalDuration.textContent = "00:00";
    seekSlider.value = 0;
};

let prevTrack = () => {
    if (trackIndex > 0)
        trackIndex -= 1;
    else 
        trackIndex = trackList.length - 1;

    loadTrack(trackIndex);
    playTrack();
};

let playPauseTrack = () => {
    if(!isPlaying)
        playTrack();
    else 
        pauseTrack();
};

let playTrack = () => {
    currTrack.play();
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
};

let pauseTrack = () => {
    currTrack.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
};

let nextTrack = () => {
    if(trackIndex < trackList.length - 1)
        trackIndex += 1;
    else trackIndex = 0;

    loadTrack(trackIndex);
    playTrack();

};

let seekTo = () => {
    let seekto = currTrack.duration * (seekSlider.value / 100);
    currTrack.currentTime = seekto;
};

let setVolume = () => {
    currTrack.volume = volumeSlider.value / 100;
};

let seekUpdate = () => {
    let seekPosition = 0;
 
    if (!isNaN(currTrack.duration)) {
    seekPosition = currTrack.currentTime * (100 / currTrack.duration);
    seekSlider.value = seekPosition;
 
    let currentMinutes = Math.floor(currTrack.currentTime / 60);
    let currentSeconds = Math.floor(currTrack.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(currTrack.duration / 60);
    let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);
 
    // Add a zero to the single digit time values
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
 
    // Display the updated duration
    currTime.textContent = currentMinutes + ":" + currentSeconds;
    totalDuration.textContent = durationMinutes + ":" + durationSeconds;
  }
};

window.addEventListener('load', function() {
    loadTrack(trackIndex);
  }, true);