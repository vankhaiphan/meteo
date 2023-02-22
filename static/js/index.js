document.addEventListener('DOMContentLoaded', () => {

    $('form').submit(function () {

        // Initialize new request
        const request = new XMLHttpRequest();
        request.open('POST', '/city');

        const city = document.querySelector('#search-city').value;

        // Callback function for when request completes
        request.onload = () => {

            // Extract JSON data from request
            const data = JSON.parse(request.responseText);
            // const data = {'success': True, 'name': 'Marseille', 'country': 'FR', 'weather': [{'id': 801, 'main': 'Clouds', 'description': 'few clouds', 'icon': '02n'}], 'temp': 13, 'feels_like': 12, 'temp_min': 10, 'temp_max': 17, 'humidity': 36, 'pressure': 1022, 'visibility': 10.0, 'wind': 13.32};
            console.log(data);

            // Update the result div
            if (data.success) {
                const list = document.querySelector(".weather-block .cities");
                
                const { name, country, weather_text, weather_icon, temp, feels_like, temp_min, temp_max,
                    humidity, pressure, visibility, wind, uv, cloud, precipitation, prob_precipitation} = data;
                // const weather_icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;

                const li = document.createElement("li");
                li.classList.add("city");

                const content = `
                    <h2 class="city-name" data-name="${name},${country}">
                        <span>${name}</span>
                        <sup>${country}</sup>
                    </h2>
                    <div style="display:flex; justify-content: space-between;">
                        <div style="display:flex; flex-direction: column">
                            <div class="city-temp">${temp}<sup>°C</sup></div>
                            <h5 style="text-align: center; width: 100%;">Feels like ${feels_like}<sup>°C</sup></h5>
                        </div>
                        <div style="width:20rem"></div>
                        <figure>
                            <img class="city-icon" src="${weather_icon}" alt="${weather_text}">
                            <figcaption style="text-align: center">${weather_text}</figcaption>
                        </figure>
                    </div>
                    <div class="card" style="display:flex">
                        <ul class="list-group list-group-flush row">
                            <li class="list-group-item" style="display:flex; justify-content: space-between;">
                                <div>
                                    <span>High/Low </span>
                                </div>
                
                                <div>
                                    ${temp_max}<sup>°C</sup> / ${temp_min}<sup>°C</sup>
                                </div>
                            </li>
                            <li class="list-group-item" style="display:flex; justify-content: space-between;">
                                <div>
                                    <span>Humidity </span>
                                </div>
                                
                                <div>
                                    ${humidity}%
                                </div>
                            </li>
                            <li class="list-group-item" style="display:flex; justify-content: space-between;">
                                <div>
                            
                                    <span>Pressure </span>
                                </div>
                                
                                <div>
                                    ${pressure} mb
                                </div>
                            </li>
                            <li class="list-group-item" style="display:flex; justify-content: space-between;">
                                <div>
                                    <span>Visibility </span>
                                </div>
                                
                                <div>
                                    ${visibility} km
                                </div>
                            </li>
                            <li class="list-group-item" style="display:flex; justify-content: space-between;">
                                <div>
                                    <span>Wind </span>
                                </div>
                                
                                <div>
                                    ${wind["direction"]} ${wind["speed"]} km/h
                                </div>
                            </li>
                            <li class="list-group-item" style="display:flex; justify-content: space-between;">
                                <div>
                                    <span>Wind Gusts</span>
                                </div>
                                
                                <div>
                                    ${wind["gust"]} km/h
                                </div>
                            </li>
                            <li class="list-group-item" style="display:flex; justify-content: space-between;">
                                <div>
                                    <span>Cloud Cover </span>
                                </div>
                                
                                <div>
                                    ${cloud}%
                                </div>
                            </li>
                            <li class="list-group-item" style="display:flex; justify-content: space-between;">
                                <div>
                                    <span>UV Index </span>
                                </div>
                                <div>
                                    ${uv["index"]} (${uv["text"]})
                                </div>
                            </li>
                        </ul>
                    </div>
                `;

                li.innerHTML = content;
                list.appendChild(li);

                document.querySelector('#search-city').value = "";
            }
            else {
                document.querySelector('.weather').innerHTML = 'There was an error.';
            }
        }

        // Add data to send with request
        const data = new FormData();
        data.append('city', city);

        // Send request
        request.send(data);
        return false;
    });
});