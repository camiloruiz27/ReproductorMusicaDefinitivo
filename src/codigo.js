// Select all the elements in the HTML page 
// and assign them to a variable 
let foto = document.querySelector(".foto"); 
let track_name = document.querySelector(".track-name"); 
let track_artist = document.querySelector(".track-artist"); 

let play_button = document.querySelector(".esplay"); 
let pause_button =document.querySelector(".espause"); 
let next_btn = document.querySelector(".next-track"); 
let prev_btn = document.querySelector(".prev-track"); 

let seek_slider = document.querySelector(".seek_slider"); 
let curr_time = document.querySelector(".current-time"); 
let total_duration = document.querySelector(".duration"); 

let volumeRange = document.querySelector('.volum');

// Specify globally used values 
let track_index = 0; 
let isPlaying = false; 
let updateTimer; 

// Create the audio element for the player 
let curr_track = document.createElement('audio'); 

// Define the list of tracks that have to be played 
let track_list = [ 
{ 
	name: "Volver al futuro", 
	artist: "Alan Silvestri", 
	image: "./assets/portadas/backtothefuture.jpg", 
	path: "./assets/canciones/back-to-the-future-from-back-to-the-future-original-scoreend-credits.mp3"
}, 
{ 
	name: "Nonstop", 
	artist: "Drake", 
	image: "./assets/portadas/drake8bit.jpg", 
	path: "./assets/canciones/nonstop.mp3"
}, 
{ 
	name: "Me libere", 
	artist: "Gran combo de Puerto rico", 
	image: "./assets/portadas/grancombo8bit.jpg", 
	path: "./assets/canciones/me-libere.mp3", 
},
{ 
	name: "Empire Satet of Mind", 
	artist: "Alicia Keys & Jay-z", 
	image: "./assets/portadas/jayz8bit.jpg", 
	path: "./assets/canciones/empire-state-of-mind.mp3", 
},
{ 
	name: "Agua", 
	artist: "J Balvin", 
	image: "./assets/portadas/jbalvin.jpg", 
	path: "./assets/canciones/agua-music-from-sponge-on-the-run-movie.mp3", 
},
{ 
	name: "Adios Amor", 
	artist: "Christian Nodal", 
	image: "./assets/portadas/nodal8bit.jpg", 
	path: "./assets/canciones/adios-amor.mp3", 
},
{ 
	name: "September", 
	artist: "Earth, Wind & Fire", 
	image: "./assets/portadas/september8bit.jpg", 
	path: "./assets/canciones/earth-wind-fire-september.mp3", 
},
{ 
	name: "Nel blu di pinto di blu", 
	artist: "Gipsy Kings", 
	image: "./assets/portadas/volare8bit.jpg", 
	path: "./assets/canciones/gipsy-kings-volare-nel-blu-di-pinto-di-blu-audio.mp3", 
},
{ 
	name: "Wake me up", 
	artist: "Avicii", 
	image: "./assets/portadas/avicii8bit.jpg", 
	path: "./assets/canciones/avicii-wake-me-up-lyric-video.mp3", 
},
{ 
	name: "Dont stop the party", 
	artist: "Black eyed peas", 
	image: "./assets/portadas/bep.jpg", 
	path: "./assets/canciones/dont-stop-the-party.mp3", 
},

]; 
let benormal =[];
    for (let i = 0; i < track_list.length; i++) {
        benormal[i] = track_list[i];    
    }
function loadTrack(track_index) { 
    // Clear the previous seek timer 
    clearInterval(updateTimer); 
    resetValues(); 
    
    // Load a new track 
    curr_track.src = track_list[track_index].path; 
    curr_track.load(); 
    curr_track.volume=0.5;
    // Update details of the track 
    foto.style.backgroundImage = "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name; 
    //track_artist.textContent = track_list[track_index].artist; 
    // Set an interval of 1000 milliseconds 
    // for updating the seek slider 
    updateTimer = setInterval(seekUpdate, 1000); 
    
    // Move to the next track if the current finishes playing 
    // using the 'ended' event 
    curr_track.addEventListener("ended", nextTrack); 
    } 
    // Functiom to reset all values to their default 
    function resetValues() { 
    curr_time.textContent = "00:00"; 
    total_duration.textContent = "00:00"; 
    seek_slider.value = 0; 
    }   
    // Load the first track in the tracklist 
loadTrack(track_index); 

    function songPlayTrack() { 
        // Switch between playing and pausing 
        // depending on the current state 
        if (!isPlaying) {
            playTrack();} 
        else pauseTrack(); 
        } 
        
        function playTrack() { 
        // Play the loaded track 
        curr_track.play(); 
        isPlaying = true; 
        } 
        
        function pauseTrack() { 
        // Pause the loaded track 
        curr_track.pause(); 
        isPlaying = false; 
        } 
        
        function nextTrack() { 
        // Go back to the first track if the 
        // current one is the last in the track list 
        if (track_index < track_list.length - 1) 
            track_index += 1; 
        else track_index = 0; 
        
        // Load and play the new track 
        loadTrack(track_index); 
        playTrack(); 
        } 
        
        function prevTrack() { 
        // Go back to the last track if the 
        // current one is the first in the track list 
        if (track_index > 0) 
            track_index -= 1; 
        else track_index = track_list.length; 
            
        // Load and play the new track 
        loadTrack(track_index); 
        playTrack(); 
        } 
        
        function seekTo() { 
            // Calculate the seek position by the 
            // percentage of the seek slider 
            // and get the relative duration to the track 
            seekto = curr_track.duration * (seek_slider.value / 100); 
            // Set the current track position to the calculated seek position 
            curr_track.currentTime = seekto; 
            total_duration.innerHTML=curr_track.duration;
            } 

              
            function seekUpdate() { 
            let seekPosition = 0; 
            // Check if the current track duration is a legible number 
            if (!isNaN(curr_track.duration)) { 
                seekPosition = curr_track.currentTime * (100 / curr_track.duration); 
                seek_slider.value = seekPosition;

                let t = curr_track.currentTime
                curr_time.innerHTML = getMinutes(t);
            }

            total_duration.innerHTML=totaltiempo(curr_track.duration);
        }
        function totaltiempo(t){
            var min = parseInt(parseInt(t)/60);
            var sec = parseInt(t%60);
            if (sec < 10) {
              sec = "0"+sec
            }
            if (min < 10) {
              min = "0"+min
            }
            return min+":"+sec
          }
            function getMinutes(t){
                var min = parseInt(parseInt(t)/60);
                var sec = parseInt(t%60);
                if (sec < 10) {
                  sec = "0"+sec
                }
                if (min < 10) {
                  min = "0"+min
                }
                return min+":"+sec
              }



function handleVolumeDown() {
    numero=curr_track.volume;
    volumen=parseInt((numero*100)-5);
    curr_track.volume = (volumen/100);
    console.log("baje a: "+ volumen);
}
function handleVolumeUp() {
    numero=curr_track.volume;
    volumen=parseInt((numero*100)+5);
    curr_track.volume = (volumen/100);
    console.log("subi a "+ volumen); 
}  

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
  function revolver() {
      console.log(benormal);
      console.log(track_list);
     shuffle(track_list); 
     console.log("se revolvio");
     console.log(track_list);
     track_index = 0;
  }

  function normal() {
    track_list=benormal;
    console.log("volvio normal");
    console.log(track_list);
    track_index = 0;
 }
  
/*--Fuente codigo externo--
https://www.geeksforgeeks.org/create-a-music-player-using-javascript/
https://codepen.io/vanderzak/pen/BayjVep
https://codepen.io/hossein_ghanbari/pen/eYYKJXd
https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
*/