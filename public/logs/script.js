const ITEM = "dataItem";

const selfies = [];

document.getElementById('time').addEventListener('click', event => {
  sortData((a, b) => b.time - a.time);
});

document.getElementById('mood').addEventListener('click', event => {
  sortData((a, b) => {
    if (b.mood > a.mood) return -1;
    else return 1;
  });
});

function sortData(compare) {
  for (let item of selfies) {
    item.elt.remove();
  }
  selfies.sort(compare);
  for (let item of selfies) {
    document.body.append(item.elt);
  }
}


function displayData(data) {
  let i = 0;
  for (item of data) {
    const root = document.createElement('div');
    root.className = ITEM;
    root.id = i;
    i++;
    const mood = document.createElement('p');
    const geo = document.createElement('p');
    const date = document.createElement('p');
    const image = document.createElement('img');

    mood.textContent = `mood: ${item.mood}`;
    geo.textContent = `${item.lat}˚, ${item.lon}˚`;
    const dateString = new Date(item.timestamp).toLocaleString('EN');
    date.textContent = dateString;
    image.src = item.image64;

    root.append(mood, geo, date, image);
    document.body.append(root);
    
    selfies.push({ elt: root, time: item.timestamp, mood: item.mood });
    document.body.append(root);
  }
}

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();
  displayData(data);
}
getData();