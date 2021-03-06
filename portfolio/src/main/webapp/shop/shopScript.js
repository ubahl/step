// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* On load of the page, get the stored store values. */
function onLoad() {
    var placeId = window.localStorage.getItem('placeId');
    console.log("placeId: " + placeId);

    var name = window.localStorage.getItem('name');
    console.log("name: " + name);

    var rating = window.localStorage.getItem('rating');
    console.log("rating: " + rating);

    var openNow = window.localStorage.getItem('openNow');
    console.log("openNow: " + openNow);

    loadElements(name, rating, openNow);

    // Call Maps Javascript API.
    let script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + key + "&callback=addMap";
    document.body.append(script);
}

function loadElements(name, rating, openNow) {
    var background = document.getElementById('white-background');
    // Clear previous elements.
    background.innerHTML = "";

    // Create store heading.
    var storeText = document.createElement('h');
    storeText.setAttribute('id', 'store-text');
    storeText.innerText = name;
    background.appendChild(storeText);
    background.appendChild(document.createElement('br'));

    // Display rating.
    var percentage = (rating / 5.0) * 100 + '%';
    console.log('percentage: ' + percentage);

    var ratingInner = document.createElement('div');
    ratingInner.setAttribute('id', 'stars-inner');
    ratingInner.style.width = percentage;

    var ratingOuter = document.createElement('div');
    ratingOuter.setAttribute('id', 'stars-outer');
    ratingOuter.appendChild(ratingInner);

    background.appendChild(ratingOuter);

    // If store is open now, display it.
    if (openNow === "true") {
        var openNowText = document.createElement('p');
        openNowText.setAttribute('id', 'open-text');
        openNowText.innerHTML = "open now";
        background.appendChild(openNowText);
    }

    // Add the dynamic map.
    var map = document.createElement('div');
    map.setAttribute('id', 'map');
    background.appendChild(map);
}

/* Load location of the given store and create a dynamic map. */
function addMap() {
    var storeLat = parseFloat(window.localStorage.getItem('lat'));
    var storeLng = parseFloat(window.localStorage.getItem('lng'));
    var loc = {lat: storeLat, lng: storeLng};

    const zoomAmount = 15;
    var map = new google.maps.Map(document.getElementById('map'), {zoom: zoomAmount, center: loc});
    var marker = new google.maps.Marker({position: loc, map: map});
}
