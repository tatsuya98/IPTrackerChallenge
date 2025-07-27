const searchButton = document.getElementById('searchButton');
const searchBar = document.getElementById("searchBar");
const ipAddress = document.getElementById("ipAddress");
const locationElement = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");
searchButton.addEventListener('click', onButtonClick);
let map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}
function onButtonClick() {
    try{
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_2itXpJVG1nZ6TTYtDxrgSb6e7lHAW&ipAddress=${searchBar.value}`)
        .then(response => response.json())
        .then(data => {
            ipAddress.textContent = data.ip;
            locationElement.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
            timezone.textContent = `UTC ${data.location.timezone}`;
            isp.textContent = data.isp;
            map.setView([data.location.lat, data.location.lng], 13);
            L.marker([data.location.lat, data.location.lng]).addTo(map);
        })    
    }catch(e){
        console.log(e);
    }
    searchBar.value = "";
}


async function onPageLoad() {
    const userIp = await fetchUserIp();
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_2itXpJVG1nZ6TTYtDxrgSb6e7lHAW&ipAddress=${userIp}`)
    .then(response => response.json())
    .then(data => {
        ipAddress.textContent = data.ip;
        locationElement.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
        timezone.textContent = `UTC ${data.location.timezone}`;
        isp.textContent = data.isp;
        map.setView([data.location.lat, data.location.lng], 13);
        L.marker([data.location.lat, data.location.lng]).addTo(map);
    })
}

async function fetchUserIp(){
    return fetch("https://api.ipify.org")
    .then(response => response.text())
    .then(ip => {
        return ip
    })
}
map.on('click', onMapClick);
window.onload = onPageLoad;