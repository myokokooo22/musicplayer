const navbars = document.getElementsByClassName('navbars')[0];
const musicListTag = document.getElementsByClassName('musicList')[0];
const audioTag = document.getElementsByClassName('audio')[0];
const musicNameTag = document.getElementsByClassName('musicName')[0];
const playAndCurrentTimeTag = document.getElementsByClassName('playAndCurrentTime')[0];
const currentProgressTag = document.getElementsByClassName('currentProgress')[0];
const playButtonTag = document.getElementsByClassName('play')[0];
const pauseButtonTag = document.getElementsByClassName('pause')[0];
const forwardButtonTag = document.getElementsByClassName('forward')[0];
const backwardButtonTag = document.getElementsByClassName('backward')[0];
const body = document.body;

//Navbar
navbars.addEventListener('click', ()=>{
    musicListTag.classList.toggle('active');
});

//Music
const tracks = [
    {trackId:"music/track1.mp3", title:"The Fat Rat - Fly Away"},
    {trackId: "music/track2.mp3", title: "Ed-Shreen - Shape of you"},
    {trackId: "music/track3.mp3", title: "Chinese Remix - Betrayal"},
    {trackId: "music/track4.mp3", title: "Egzod & Anna Yvette - My City"},
    {trackId: "music/track5.mp3", title: "Around The Sea - Scandinavianz"},
    {trackId: "music/track6.mp3", title: "Aakash Gandhi - Raga - Dance of Music"},
];

for (let i =0; i < tracks.length; i++){
    const trackTag = document.createElement('div');
    trackTag.classList.add('musicListItems');
    trackTag.addEventListener('click',()=>{
        audioTag.src = tracks[i].trackId;
        audioTag.play();

        body.style.backgroundImage = tracks[i].img;
        currentPlayingIndex = i;
        currentMusicName = i;
  
         displayMusic();
    });
    trackTag.textContent = (i+1).toString()+ ". " + tracks[i].title;
    musicListTag.append(trackTag);
}

const displayMusic = () => {
    const musicName = tracks[currentMusicName].title;
    musicNameTag.textContent = musicName;
}

musicNameTag.textContent = tracks[0].title;

let durationText = "00:00";
let duration = "00:00";

audioTag.addEventListener('loadeddata',()=>{
    // console.log("Duration ",audioTag.duration);
     duration = Math.floor(audioTag.duration);
     durationText = createMinuteAndSecond(duration);
});

audioTag.addEventListener('timeupdate',()=>{
    // console.log("Current Time ", audioTag.currentTime);
    const currentTime = Math.floor(audioTag.currentTime);
    const currentText = createMinuteAndSecond(currentTime);
    const updateCurrentTimeTextAndDurationText = currentText + " / " + durationText;
    playAndCurrentTimeTag.textContent = updateCurrentTimeTextAndDurationText;
    currentProgressUpdate(currentTime);
});

const createMinuteAndSecond = (totalSecond) => {
    const minutes = Math.floor(totalSecond / 60);
    const seconds = totalSecond % 60;

    const minutesText = minutes < 10 ? "0" + minutes.toString() : minutes;
    const secondsText = seconds < 10 ? "0" + seconds.toString() : seconds;
    
    return minutesText + ":" + secondsText;
};

const currentProgressUpdate = (currentTime) => {
    const currentProgressWidth = (400 / duration) * currentTime;
    currentProgressTag.style.width = currentProgressWidth.toString() + "px";
};

let isPlaying = false;
let currentPlayingIndex = 0;
let currentMusicName = '';

playButtonTag.addEventListener('click',() => {
    const currentTime = Math.floor(audioTag.currentTime);
    isPlaying = true;

    if(currentTime === 0){
        playSong();
    }else{
        audioTag.play();
        updatePlayAndPauseButton();
    }
});

pauseButtonTag.addEventListener('click',()=>{
    isPlaying = false;
    audioTag.pause();
    updatePlayAndPauseButton();
});

backwardButtonTag.addEventListener('click',()=>{
    
    if(currentPlayingIndex === 0){
        return;
    }else{
        currentPlayingIndex -=1;
        currentMusicName --;
        playSong();

        displayMusic();
    }
});

forwardButtonTag.addEventListener('click',()=>{
    
    if(currentPlayingIndex === tracks.length -1){
        return;
    }else{
        currentPlayingIndex += 1;
        currentMusicName ++;
        playSong();

        displayMusic();
    }
});

const updatePlayAndPauseButton = () => {
    if(isPlaying){
        pauseButtonTag.style.display = 'block';
        playButtonTag.style.display = 'none';
    }else{
        pauseButtonTag.style.display = 'none';
        playButtonTag.style.display = 'block';
    }
};

const playSong = () => {
    const songIdToPlay = tracks[currentPlayingIndex].trackId;
    audioTag.src = songIdToPlay;
    audioTag.play();
    
    isPlaying = true;
    updatePlayAndPauseButton();
};