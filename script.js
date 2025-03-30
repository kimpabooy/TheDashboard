// API Keys
const UNSPLASH_API_KEY = "ODjYhDL-T71M5waxnfYN9x23d6_l53zA53Rtw51qwb4";
const WEATHER_API_KEY = "e9886aa06cca1bbf3ecc1b8bf7f60198";

// URL's
const UNSPLASH_URL = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_API_KEY}`;
const CHUCK_URL = "https://api.chucknorris.io/jokes/random"


// <<< Quick note START >>>
////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const noteInput = document.getElementById("note-list");

  // Load saved quick notes from local storage
  function loadLocalStorage() {
    const savedNote = localStorage.getItem("note");
    if (savedNote) {
      noteInput.value = savedNote;
    }
  }

  // save quick notes to local storage
  noteInput.addEventListener("input", () => {
    localStorage.setItem("note", noteInput.value);
  });

  loadLocalStorage();
});
// <<< Quick note END >>>
////////////////////////////////////////////////////////////////


// <<< Dashboard-Title START >>>
////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const title = document.getElementById("dashboard-title");

  // Load title from local storage.
  const savedTitle = localStorage.getItem("dashboardTitle");
  if (savedTitle) {
    title.textContent = savedTitle;
  }

  // Function for when title is clicked.
  title.addEventListener("click", function () {
    const input = document.createElement("input");

    input.id = "newTitleId";
    input.type = "text";
    input.value = title.textContent;

    title.replaceWith(input);
    input.focus(); // input.focus put's the marker directly in the input field.

    function saveTitle() {
      const newTitle = input.value.trim() || "Anonymous Dashboard"; // Default value if empty.
      title.textContent = newTitle;
      localStorage.setItem("dashboardTitle", newTitle);
      input.replaceWith(title);
    }

    input.addEventListener("blur", saveTitle);

    // Saves changes if "Enter" is pressed.
    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        input.blur(); // Triggar blur-and saves the value
        // saveTitle();

      }
    });
  });
});
// <<< Dashboard-title END >>>
////////////////////////////////////////////////////////////////

// <<< links START >>>
////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const linksContainer = document.querySelector(".block ul");
  const addButton = document.querySelector(".block button");
  const modal = document.createElement("div");

  // Modal for links
  modal.innerHTML = `
  <div id="link-modal" class="modal">
  <div class="modal-content">
  <h3>Lägg till snabblänk</h3>
  
  <!-- Title Input -->
  <label for="link-title">Titel:</label>
  <input type="text" id="link-title" placeholder="Ex. Google">
  
  <!-- URL Input -->
  <label for="link-url">Länk:</label>
  <input type="url" id="link-url" placeholder="https://www.example.com">
  
  <!-- Save & Close Button -->
  <button id="save-link">Spara</button>
  <button id="close-modal">Avbryt</button>
  </div>
  </div>`;
  document.body.appendChild(modal);

  // variuble for modal popup.
  const linkModal = document.getElementById("link-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const saveLinkBtn = document.getElementById("save-link");
  const titleInput = document.getElementById("link-title");
  const urlInput = document.getElementById("link-url");

  // Get saved links from localStorage
  function loadLinks() {
    linksContainer.innerHTML = "";
    const savedLinks = JSON.parse(localStorage.getItem("quickLinks")) || [];
    savedLinks.forEach(link => addLinkToDOM(link.title, link.url));
  }

  // Adds link to the dom and saves to local Storage.
  function addLinkToDOM(title, url) {
    const li = document.createElement("li");
    li.innerHTML = `
          <img src="https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&url=${url}&size=32" alt="${title} icon">
          <a href="${url}" style="text-decoration: none; padding: 10px; "target="_blank">${title}</a>
          <button class="delete-link">🗑</button>
      `;

    // Removes quicklink if delete button is clicked.
    li.querySelector(".delete-link").addEventListener("click", function () {
      removeLink(title, url);
    });

    linksContainer.appendChild(li);
  }

  // Remove/Update quicklinks in the dom and localStorage.
  function removeLink(title, url) {
    let savedLinks = JSON.parse(localStorage.getItem("quickLinks")) || [];
    savedLinks = savedLinks.filter(link => link.title !== title || link.url !== url);
    localStorage.setItem("quickLinks", JSON.stringify(savedLinks));
    loadLinks(); // Updates link list.
  }

  // Open modal
  addButton.addEventListener("click", function () {
    linkModal.style.display = "block";
  });

  // close modal
  closeModalBtn.addEventListener("click", function () {
    linkModal.style.display = "none";
  });

  function handleEnterPress(event) {
    if (event.key === "Enter") {
      saveLinkBtn.click();
    }
  }

  titleInput.addEventListener("keypress", handleEnterPress);
  urlInput.addEventListener("keypress", handleEnterPress);

  // save links to local storage
  saveLinkBtn.addEventListener("click", function () {
    const title = titleInput.value.trim();
    const url = urlInput.value.trim();
    if (!title || !url) return alert("Fyll i båda fälten!");

    const savedLinks = JSON.parse(localStorage.getItem("quickLinks")) || [];
    savedLinks.push({ title, url });
    localStorage.setItem("quickLinks", JSON.stringify(savedLinks));

    addLinkToDOM(title, url);
    titleInput.value = "";
    urlInput.value = "";
    linkModal.style.display = "none";
  });

  // https://getbootstrap.com/docs/4.0/components/modal/

  loadLinks();
});
// <<< links END  >>>
////////////////////////////////////////////////////////////////


// <<< Time and Date START  >>>
////////////////////////////////////////////////////////////////
function updateDateTime() {
  const clockElement = document.getElementById("time-date");
  const currentTime = new Date();

  // Define arrays for days of the weeks.
  const daysOfWeek = [
    "Söndag",
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag",
  ];

  const dayOfWeek = daysOfWeek[currentTime.getDay()]; // activate in dateTimeString to get displayed on site.

  // Define arrays for mounths
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

  // write the time to the clockElement.
  const dateTimeString = `${hours}:${minutes}:${seconds} | ${day} ${month} ${year} `;
  clockElement.textContent = dateTimeString;
}

// Updates date and time every second (1000 milliseconds).
setInterval(updateDateTime, 1000);

updateDateTime();
// <<< Time and Date END >>>
////////////////////////////////////////////////////////////////


// <<< Weather START >>>
////////////////////////////////////////////////////////////////
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    getWeather(latitude, longitude);
  },
  (error) => {
    console.error("Kunde inte hämta din position:", error);
    document.querySelector(".location").textContent = "Kunde inte hämta plats";
  }
);

function getWeather(latitude, longitude) {
  const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric&lang=sv`;

  fetch(WEATHER_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`API-fel: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
      console.log(data);
    })
    .catch(error => {
      console.error("Kunde inte hämta väderdata:", error);
      document.querySelector(".location").textContent = "Kunde inte hämta väderdata";
    });
}
// weather-data
function displayWeather(data) {
  const weatherData = document.getElementById("weather-data");
  weatherData.innerHTML = "";

  weatherData.innerHTML = `
    <h3>${data.name}</h3>
    <div id="current-weather-info">
      <img id="current-temp-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
      <p id="current-weather-temp-today">Idag ${Math.floor(data.main.temp)}°C</p>
      <p style="text-transform: capitalize;">${data.weather[0].description}, Känns som ${Math.floor(data.main.feels_like)} C°</p>
    </div>
  `;
}
// <<< Weather END >>>
////////////////////////////////////////////////////////////////


// <<< Chuck Norris Box START >>>
////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const chuckContainer = document.querySelector("#chuck-container");
  const chuckButton = document.querySelector("#chuck-btn");
  const chuckP = document.createElement("p");
  chuckContainer.appendChild(chuckP);
  chuckP.textContent = "";
  const getSavedQuote = localStorage.getItem("chuckText");

  // Get textcontent from localstorage if there is any.
  if (getSavedQuote) {
    chuckP.textContent = getSavedQuote;
  }

  // Funktion för att uppdatera citatet
  chuckButton.addEventListener("click", function () {
    fetch(CHUCK_URL)
      .then(response => response.json())
      .then(data => {
        chuckP.textContent = data.value; // updates the textvalue to the new value.
        localStorage.setItem("chuckText", data.value); // Saves to local storage
      })
      .catch(error => {
        chuckP.textContent = "Något gick fel. Försök igen senare.";
        console.error(error);
      });
  });
});
// <<< Chuck Norris Box END >>>
////////////////////////////////////////////////////////////////


// <<< Background Image START >>>
////////////////////////////////////////////////////////////////
const splashbackground = document.getElementById("random-background-btn");

//Gets the saved background img from local storage.
document.addEventListener("DOMContentLoaded", () => {
  const savedBackground = localStorage.getItem("backgroundImage");
  if (savedBackground) {
    setBackground(savedBackground);
  }
});

splashbackground.addEventListener("click", function () {
  fetch(UNSPLASH_URL)
    .then(response => response.json())
    .then(data => {
      const pictureUrl = data.urls.regular;
      setBackground(pictureUrl);

      // Save background image to localStorage
      localStorage.setItem("backgroundImage", pictureUrl);
    })
    .catch(error => console.error("Error fetching image:", error));
});

// sets the generated picture as background.
function setBackground(pictureUrl) {
  document.body.style.backgroundImage = `url(${pictureUrl})`;
}
// <<< Background Image END >>>
////////////////////////////////////////////////////////////////





// TODO

// * Spara chuck Norris i local storage.
// * implementera väderappen.
// * Göra applikationen mobilanpassad.