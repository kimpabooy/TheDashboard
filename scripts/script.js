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

  const month = months[currentTime.getMonth()];

  const day = currentTime.getDate();
  const year = currentTime.getFullYear();

  // Calculate and format hours (in 12-hour format), minutes, seconds, and AM/PM.
  let hours = currentTime.getHours();
  //   const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 24 || 24;
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");

  // Construct the date and time string in the desired format.
  const dateTimeString = `${dayOfWeek} ${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
  clockElement.textContent = dateTimeString;
}

// Update the date and time every second (1000 milliseconds).
setInterval(updateDateTime, 1000);

// Initial update.
updateDateTime();
