const lat_span = document.querySelector("#lat"),
  lon_span = document.querySelector("#lon");

const BTN = document.querySelector("button"),
  MOOD = document.querySelector("#mood");

let geoInfo = {};
let video;

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(160, 120);

  getGeolocation();
  BTN.addEventListener("click", handleBtn);

  function displayGeolocation(lat, lon) {
    lat_span.textContent = lat;
    lon_span.textContent = lon;
  }

  function getGeolocation() {
    if ('geolocation' in navigator) {
      console.log("available geo");
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log(lat, lon);

        displayGeolocation(lat, lon);
        geoInfo = { lat, lon };
      });
    } else {
      console.log("geolocation not available");
    }
  }

  async function sendData(data) {
    console.log(data);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data)
    };
    const response = await fetch('/api', options);
    const jsonData = await response.json();
    console.log(jsonData);
  }

  function handleBtn() {
    geoInfo.mood = MOOD.value;
    video.loadPixels();
    const image64 = video.canvas.toDataURL();
    geoInfo.image64 = image64;
    console.log(geoInfo);
    sendData(geoInfo);
  }
}