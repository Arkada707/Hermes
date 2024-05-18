document.addEventListener("DOMContentLoaded", function () {
  var utcClockElement = document.getElementById("utc-clock");

  // Function to update UTC clock
  function updateUTCClock() {
    var now = new Date();
    var utcTime = now.toUTCString();
    utcClockElement.textContent = utcTime;
  }

  // Call the function initially to display the UTC time immediately
  updateUTCClock();

  // Call the function every second to update the UTC time continuously
  setInterval(updateUTCClock, 1000);
});
