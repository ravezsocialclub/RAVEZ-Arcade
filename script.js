// script.js
const muteButton = document.getElementById("mute-btn")

document.addEventListener("DOMContentLoaded", function() {
    var audio = document.getElementById("bgAudio");
    var muteButton = document.getElementById("muteButton");

    // Ensure the audio starts playing
    audio.play().catch(error => {
        console.log("Autoplay was prevented. User interaction is needed.");
    });

    // Set up the mute button toggle functionality
    muteButton.addEventListener("click", function() {
        if (audio.muted) {
            audio.muted = false;
            muteButton.classList.remove("active");
        } else {
            audio.muted = true;
            muteButton.classList.add("active");
        }
    });
    deleteBtn.addEventListener("dblclick", function() {
        localStorage.clear()
        myLeads = []
        render(myLeads)
    })

    // Check initial state based on the mute button's class
    if (muteButton.classList.contains("active")) {
        audio.muted = true;
    }
})
function stopAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
}
function toggleMute() {
    var myAudio = document.getElementById('audio_playo24');
    myAudio.muted = !myAudio.muted;
 }