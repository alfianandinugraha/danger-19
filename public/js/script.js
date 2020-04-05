function HttpHandler(method, url, callback) {
    var xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.onload = function () {
        var response = JSON.parse(xhr.response);
        callback(response);
    };

    xhr.send();
}

var listCountryEl = document.getElementById('list-country--container');
var searchFormEl = document.getElementById('search-form');

HttpHandler('GET', 'https://api.kawalcorona.com/', function (data) {
    for (let i = 0; i < data.length; i++) {
        let countryElement = document.createElement('li');
        countryElement.innerHTML = `
            <h2>${data[i].attributes.Country_Region}</h2>
            <div class="description-data">
                <div class="confirmed">
                    <img src="./public/icon/poison.svg">
                    <p>Confirmed : ${data[i].attributes.Confirmed}</p>
                </div>
                <div class="deaths">
                <img src="./public/icon/death.svg">
                    <p>Deaths : ${data[i].attributes.Deaths}</p>
                </div>
                <div class="recovered">
                    <img src="./public/icon/plus.svg">
                    <p>Recovered : ${data[i].attributes.Recovered}</p>
                </div>
            </div>
        `;
        countryElement.id = data[i].attributes.Country_Region.replace(' ', '').toLowerCase();
        listCountryEl.appendChild(countryElement);
    }

    searchFormEl.addEventListener('input', function (e) {
        var newListCountryEl = document.getElementById('list-country--container');
        var cloneNewListCountryEl = newListCountryEl.cloneNode();

        for (var i = 0; i < data.length; i++) {
            var targetIdEl = listCountryEl.children[i].id;
            var searchedIdEl = '';

            if (targetIdEl.includes(e.target.value.toLowerCase())) {
                searchedIdEl = listCountryEl.children[i].cloneNode(true);
            }

            if (searchedIdEl !== '') {
                cloneNewListCountryEl.appendChild(searchedIdEl);
            }
        }

        if (newListCountryEl.parentNode !== null) {
            newListCountryEl.parentNode.replaceChild(cloneNewListCountryEl, newListCountryEl);
        }
    });
});