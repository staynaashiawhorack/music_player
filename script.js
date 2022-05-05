console.log("Welcome to Spotify")

//initialize the variables
let songIndex = 0;
let audioElement = new Audio('dreamynight.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressbar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));



let songs = [
    {songName:"dreamynight", filepath: "/dreamynight.mp3", coverpath: "/cover.jpg"},
    {songName:"doobey", filepath: "/doobey-gehraiyaan.mp3", coverpath: "/cover.jpg"},
    {songName:"excuses", filepath: "/excuses.mp3", coverpath: "/cover.jpg"},
    {songName:"ranjha", filepath: "/ranjha.mp3", coverpath: "/cover.jpg"}
];


songItems.forEach((element, i)=>{
   
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    document.getElementsByClassName("songName")[i].innerText = songs[i].songName;


})


//audioElement.play();

//handle play/pause/click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;

    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;

    }
})

//listen to events
audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressbar.value = progress;

})

myProgressbar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressbar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })


}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i)=>{
    element.addEventListener('click',(e)=>{
        
        makeAllPlays();
        // songIndex = parseInt(e.target.id); Wrong song index, will always play 1st song, fixed below  
        songIndex = i;
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `${songs[songIndex].filepath}`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex==3){
        songIndex = 0;
    }
    else{
    songIndex ++;
    }
    audioElement.src = `${songs[songIndex].filepath}`;
    // this will not work when next button is pressed after 3 times, because there are no songs after index 3, try to understand the logic I used here
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})


document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex==0)
        songIndex = 3;
    else
        songIndex--;
    
    audioElement.src = `${songs[songIndex].filepath}`;
    //Have used the same logic as above, -1 me jaate hi index dikkat de rha tha, ab infinitely click ho skti hai back button
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

