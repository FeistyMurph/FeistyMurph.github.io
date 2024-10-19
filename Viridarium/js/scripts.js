
/* Night mode */
function checkMode() {

    if (localStorage.getItem("mode") == 'night') {
        switchMode();
    }
}

function switchMode() {
    
    // Get body class
    let bodyClass = document.body.getAttribute('class');

    // Get sun and moon icons
    let sunIcon = document.getElementById('sun-icon');
    let moonIcon = document.getElementById('moon-icon');

    // Get night and day audios
    let nightAudio = document.getElementById("nighttime-audio"); 
    let dayAudio = document.getElementById("daytime-audio"); 

    if (bodyClass.includes("night-mode")) {

        // Store the mode
       localStorage.setItem("mode", "day");

       // Change body class
       document.body.classList.remove('night-mode');

       // Change icons
       moonIcon.classList.add('inactive');
       sunIcon.classList.remove('inactive');

       // Change audio if playing
       if (nightAudio.duration > 0 && !nightAudio.paused) {

           nightAudio.pause();
           dayAudio.play();
       }
       
   } else if (!bodyClass.includes("night-mode") || localStorage.getItem("mode") == 'night') {

        localStorage.setItem("mode", "night");

        // Change body class
        document.body.classList.add('night-mode');

        // Change icons
        moonIcon.classList.remove('inactive');
        sunIcon.classList.add('inactive');

        // Change audio if playing
        if (dayAudio.duration > 0 && !dayAudio.paused) {

            dayAudio.pause();
            nightAudio.play();
        }
    }
}

(function() {
    checkMode();
})();

// Listen for click in the night mode button
document.getElementById('night-mode-btn').addEventListener('click', () => {

   switchMode();
});
/* END Night mode */



/* Mobile Menu */
document.getElementById('mobile-menu-btn').addEventListener('click', () => {

    let bodyClass = document.body.getAttribute('class');

    let mobileMenu = document.getElementById('mobile-menu');
    let menuIcon = document.getElementById('menu-icon');
    let crossIcon = document.getElementById('cross-icon');

    if (!bodyClass.includes("menu-down")) {
        document.body.classList.add('menu-down');

        mobileMenu.classList.remove('inactive');
        menuIcon.classList.add('inactive');
        crossIcon.classList.remove('inactive');

        // Prevent the content behind the menu to scroll
        document.body.style.overflow = "hidden";

    } else {
        document.body.classList.remove('menu-down');

        mobileMenu.classList.add('inactive');
        menuIcon.classList.remove('inactive');
        crossIcon.classList.add('inactive');  
        
        document.body.style.overflow = "auto";
    }
});
/* END Mobile Menu */

/* Audio system */
document.getElementById('audio-btn').addEventListener('click', event => {

    // Get all the elements and classes
    let bodyClass = document.body.getAttribute('class');
    let audioIcon = document.getElementById('audio-icon');
    let muteIcon = document.getElementById('mute-icon');

    let audio;
    //
    if (bodyClass.includes("night-mode")) {
        audio = document.getElementById("nighttime-audio"); 
        
    } else {
        audio = document.getElementById("daytime-audio"); 
    }

    if (!bodyClass.includes("sound-on")) {
        document.body.classList.add('sound-on');

        audioIcon.classList.remove('inactive');
        muteIcon.classList.add('inactive');

        audio.play();

    } else {
        document.body.classList.remove('sound-on');

        audioIcon.classList.add('inactive');
        muteIcon.classList.remove('inactive'); 
        
        audio.pause();
    }
});
/* END Audio system */

/* Calendar */
document.querySelectorAll('.has-event').forEach(element => {
    element.addEventListener('click', event => {
        let calendar = document.getElementById('events-calendar');
        let elementClass = event.target.getAttribute('class');

        if (calendar.getAttribute('class') == 'showing-event' && elementClass == 'btn close-event') {
            calendar.classList.remove('showing-event'); 
            event.target.closest('div').classList.add('inactive'); 
        } else {
            calendar.classList.add('showing-event'); 
            event.target.firstElementChild.classList.remove('inactive'); 
        }
    });
});
/* END Calendar */


/* Events Form */

// Form Validation function
function validateForm(attendantName, attendantLastName, attendantPhone, attendantEmail, eventAttending, attendantComments) {
    
    let formIsValid = true;

    // Empty all validation messages
    let valMessages = document.querySelectorAll(".val-text");
    for (let i = 0; i < valMessages.length; i++) {
        valMessages[i].classList.add('inactive'); 
    }

    let canadianFormat = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/; 
    let emailFormat = /\S+@\S+\.\S+/;

    // Validate Attendant Name
    if (attendantName == '') {
        document.querySelector('input[name="name"] ~ .val-text').classList.remove('inactive');
        formIsValid = false;
    }

    // Validate Attendant Last Name
    if (attendantLastName == '') {
        document.querySelector('input[name="last-name"] ~ .val-text').classList.remove('inactive');
        formIsValid = false;
    }

    // Validate Attendant Phone
    if (!attendantPhone.match(canadianFormat) && attendantPhone != '') {
        document.querySelector('input[name="phone"] ~ .val-text').classList.remove('inactive');
        formIsValid = false;
    }

    // Validate Attendant Email
    if (!attendantEmail.match(emailFormat) || attendantEmail == '') {
        document.querySelector('input[name="email"] ~ .val-text').classList.remove('inactive');
        formIsValid = false;
    }

    // Validate Event Attending
    if (eventAttending == '') {
        document.querySelector('select[name="event"] ~ .val-text').classList.remove('inactive');
        formIsValid = false;
    }

    return formIsValid;
};

if (document.body.getAttribute('id') == 'events-page') {
    document.getElementById('events-form').addEventListener('submit', function (event){
        event.preventDefault();
    
        // Get form values
        let eventsForm = document.getElementById("events-form");
        
        let attendantName = eventsForm.elements["name"].value;
        let attendantLastName = eventsForm.elements["last-name"].value;
        let attendantPhone = eventsForm.elements["phone"].value;
        let attendantEmail = eventsForm.elements["email"].value;
        let eventAttending = eventsForm.elements["event"].value;
        let attendantComments = eventsForm.elements["comments"].value;
    
        // Run validation function
        if (validateForm(attendantName, attendantLastName, attendantPhone, attendantEmail, eventAttending, attendantComments)) {
            // If validation returns true then submit the form
            document.getElementById('events-form').submit();
        }
    });   
}
/* END Events Form */



/* Gallery Scripts */

/* Sends the image to the div to display bigger*/
function enlarge(imgs) {

    var expandImg = document.getElementById("bigger");
    var imgText = document.getElementById("imgtext");
    expandImg.src = imgs.src;
    imgText.innerHTML = imgs.alt;
    expandImg.parentElement.style.display = "block";

}

/* returns back to gallery*/
function returns(picture){
    picture.parentElement.style.display='none';
    location.href = '#gallery';
}
/* END Gallery Scripts */
