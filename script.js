const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEL = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


// music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist:'Jacinto Design',
    },
    {
        name: 'No time for caution',
        displayName: 'No time for caution',
        artist:'Hans Zimmer',
    },
    {
        name: 'Flight',
        displayName: 'Flight',
        artist:'Hans Zimmer',
    },
    {
        name: "Kai's theme",
        displayName: "Kai's Theme",
        artist:'Hans Zimmer',
    }

];


// check play
let isPlaying = false;


// play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}
// pause
function pauseSong(){
    isPlaying  =false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();
}


// play or plause
playBtn.addEventListener('click', ()=>(isPlaying ? pauseSong():playSong()));

// update DOM
function loadSong(song){
    title.textContent=song.displayName;
    artist.textContent=song.artist;
    music.src =`music/${song.name}.mp3`;
    image.src=`img/${song.name}.jpg`;
 }

// currrent song
let songIndex = 0;

// prev song
function prevSong(){
    songIndex--;
    if (songIndex<0){
        songIndex=songs.length -1;
    }
    
    loadSong(songs[songIndex]);
    playSong();
}

// next song
function nextSong(){
    songIndex++;
    if (songIndex>songs.length -1){
        songIndex=0;
    }
    
    loadSong(songs[songIndex]);
    playSong();
}
// onload = select first song
loadSong(songs[songIndex]);

// update progressbar and time
function updateProgressBar(e){
    if (isPlaying){
        const {duration, currentTime} = e.srcElement;
        
        // upadte progress bar width
        const progressPercent=(currentTime/duration)*100;
        progress.style.width = `${progressPercent}%`;
        // calculation
        const durationMinutes = Math.floor(duration / 60);
        
        let durationSeconds  = Math.floor(duration%60);
        if (durationSeconds<10){
            durationSeconds=`0${durationSeconds}`;
        }

        // delay
        if (durationSeconds){
            durationEL.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // calculation
        const currentMinutes = Math.floor(currentTime / 60);
        
        let currentSeconds  = Math.floor(currentTime%60);
        if (currentSeconds<10){
            currentSeconds=`0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}
// set progress bar  
function setProgressBar(e){
    
    const width = this.clientWidth;
    
    const clickX = e.offsetX;
    
    const {duration} = music;
   
    music.currentTime= ((clickX/width))*duration;

}

//  eventlisteners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click',setProgressBar)