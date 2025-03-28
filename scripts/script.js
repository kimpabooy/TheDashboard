const UNSPLASH_API_KEY = "ODjYhDL-T71M5waxnfYN9x23d6_l53zA53Rtw51qwb4";
const UNSPLASH_URL = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_API_KEY}`;
const WEATHER_API_KEY = "e9886aa06cca1bbf3ecc1b8bf7f60198";
const CHUCK_URL = "https://api.chucknorris.io/jokes/random"


// Quick note
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

////////////////////////////////////////////////////////////////


// dashboard-title
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

    // Ersätt rubriken med input-fältet
    title.replaceWith(input);
    input.focus(); // input.focus put's the marker directly in the input field.

    // Hantera när användaren lämnar input-fältet
    function saveTitle() {
      const newTitle = input.value.trim() || "Anonymous Dashboard"; // Default value if empty.
      title.textContent = newTitle;
      localStorage.setItem("dashboardTitle", newTitle); // Spara till localStorage
      input.replaceWith(title);
    }

    input.addEventListener("blur", saveTitle);

    // Saves changes if "Enter" is pressed.
    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        input.blur(); // Triggar blur-händelsen och sparar värdet
        // saveTitle();

      }
    });
  });
});

////////////////////////////////////////////////////////////////

/*links*/
////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  const linksContainer = document.querySelector(".block ul");
  const addButton = document.querySelector(".block button");
  const modal = document.createElement("div");

  // Modalen för länkarna
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


  // Set-up id's for modal popup.
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
          <a href="${url}" target="_blank">${title}</a>
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

  // function closeModal() {
  //   titleInput.value = "";
  //   urlInput.value = "";
  //   linkModal.style.display = "none";
  // }

  // // Stäng modalen om man klickar utanför modalens innehåll
  // linkModal.addEventListener("click", function (event) {
  //   const modalContent = document.getElementById("link-modal >");
  //   if (!modalContent.contains(event.target)) {
  //     closeModal();
  //   }
  // });

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

  // Ladda länkar vid start
  loadLinks();
});

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

// Weather
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

      <h2>${data.name}</h2>
      <div id="current-temp-degrees">
        <img id="current-temp-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
        ${Math.floor(data.main.temp)}°C 
      </div>
      
    <p id="current-temp-feel">${data.weather[0].description} Känns som ${Math.floor(data.main.feels_like)} C°</p>
    <ul id="current-temp-misc">
      <li>Vind: ${data.wind.speed} m/s</li>
      <li>Luftfuktighet: ${data.main.humidity}%</li>
      <li>Molnighet ${data.clouds.all}%</li>
    </ul>
  `;
}




// function displayWeather(data) {
//   document.getElementById("city-name").textContent = `Weather in ${data.name}`;
//   document.getElementById("temp").textContent = `Temperature: ${data.main.temp} C°`;

//   document.getElementById("description").textContent = `Description: ${data.weather[0].description}`;
//   document.getElementById("wind").textContent = `Wind: ${data.wind.speed} m / s`;
//   document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}`;
//   document.getElementById("clouds").textContent = `Clouds: ${data.clouds.all}%`;
// }

// const h2 = document.createElement("h2");
// h2.textContent = "Location";  
// const img = document.createElement("img")


// navigator.geolocation.getCurrentPosition(
//   (position) => {
//     const { latitude, longitude } = position.coords;
//     getWeather(latitude, longitude);
//   },
//   (error) => {
//     console.error("Could not get your location", error);
//     document.querySelector(".location").textContent = "Could not get location";
//   }
// );

// function getWeather(latitude, longitude) {
//   const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric&lang=sv`;

//   fetch(WEATHER_URL)
//     .then(response => {
//       if (!response.ok) throw new Error("Något gick fel med API-anropet");
//       return response.json();
//     })
//     .then(data => {
//       displayWeather(data);
//     })
//     .catch((error) => {
//       displayError(error.message);
//     });
// }

// function displayWeather(data) {
//   const container = document.querySelector(".weather-container");
//   container.innerHTML = `<h2>Dagens väder</h2>`; // Rensa innan och lägg rubrik

//   const weatherCard = document.createElement("div");
//   weatherCard.className = "weather-card";

//   // Välj ikon utifrån vädret
//   let icon = "☁️";
//   const mainWeather = data.weather[0].main.toLowerCase();
//   if (mainWeather.includes("snow")) icon = "❄️";
//   else if (mainWeather.includes("rain")) icon = "🌧️";
//   else if (mainWeather.includes("clear")) icon = "☀️";
//   else if (mainWeather.includes("cloud")) icon = "⛅";

//   weatherCard.innerHTML = `
//     <div class="icon">${icon}</div>
//     <div class="info">
//       <div class="day">Idag</div>
//       <div class="temp">${Math.round(data.main.temp)}°C</div>
//       <div class="desc">${data.weather[0].description}</div>
//     </div>
//   `;

//   container.appendChild(weatherCard);
// }

// function displayError(message) {
//   const container = document.querySelector(".weather-container");
//   container.innerHTML = `<p id="error-message">${message}</p>`;
// }


////////////////////////////////////////////////////////////////


// Chuck Norris box
////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  const chuckContainer = document.querySelector("#chuck-container");
  const chuckButton = document.querySelector("#chuck-btn");
  const chuckP = document.createElement("p");
  chuckContainer.appendChild(chuckP);
  chuckP.textContent = "";
  const getSavedQuote = localStorage.getItem("chuckText");

  // Visa sparat citat om det finns
  if (getSavedQuote) {
    chuckP.textContent = getSavedQuote;
  }

  // Funktion för att uppdatera citatet
  chuckButton.addEventListener("click", function () {
    fetch(CHUCK_URL)
      .then(response => response.json())
      .then(data => {
        chuckP.textContent = data.value; // Uppdatera p-elementet med det nya citatet
        localStorage.setItem("chuckText", data.value); // Spara texten i localStorage
      })
      .catch(error => {
        chuckP.textContent = "Något gick fel. Försök igen senare."; // Felmeddelande
        console.error(error);
      });
  });
});



////////////////////////////////////////////////////////////////


// Background Image
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

////////////////////////////////////////////////////////////////







// TODO

// * Spara chuck Norris i local storage.
// * implementera väderappen.
// * Göra applikationen mobilanpassad.