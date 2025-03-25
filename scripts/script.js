const UNSPLASH_API_KEY = "ODjYhDL-T71M5waxnfYN9x23d6_l53zA53Rtw51qwb4";
const UNSPLASH_URL = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_API_KEY}`;
const weather_API_KEY = "";

/*links*/
////////////////////////////////////////////////////////////////

// function addNewLink {

// }

////////////////////////////////////////////////////////////////




/* Time and date*/
////////////////////////////////////////////////////////////////

function updateDateTime() {
  const clockElement = document.getElementById("time-date");
  const currentTime = new Date();

  // Define arrays for days of the week and months to format the day and month names.
  const daysOfWeek = [
    "Söndag",
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag",
  ];

  const dayOfWeek = daysOfWeek[currentTime.getDay()];

  const months = [
    "January",
    "February",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "July",
    "Augusti",
    "September",
    "Oktober",
    "November",
    "December",
  ];

  // Calculate hours (in 24-hour format), minutes, and seconds.
  const year = currentTime.getFullYear();
  const month = months[currentTime.getMonth()];
  const day = currentTime.getDate();
  let hours = currentTime.getHours();
  hours = hours % 24 || 24;
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");

  // Format after taste on site.
  const dateTimeString = `${dayOfWeek} ${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
  clockElement.textContent = dateTimeString;
}

// Update the date and time every second (1000 milliseconds).
setInterval(updateDateTime, 1000);

// Initial update.
updateDateTime();

////////////////////////////////////////////////////////////////


/* Notes - Style*/
////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  const noteInput = document.getElementById("note-list");

  // Load local storage
  function loadNote() {
    const savedNote = localStorage.getItem("note");
    if (savedNote) {
      noteInput.value = savedNote;
    }
  }

  // save local storage
  noteInput.addEventListener("input", () => {
    localStorage.setItem("note", noteInput.value);
  });

  loadNote();
});

////////////////////////////////////////////////////////////////


const splashbackground = document.getElementById("random-background-btn");
splashbackground.addEventListener("click", function () {
  fetch(UNSPLASH_URL)
    .then(response => response.json())
    .then(data => {
      const picture = `url(${data.urls.regular})`;
      console.log(data);
      console.log(data.urls.regular);
      document.body.style.backgroundImage = picture;
    })
});
