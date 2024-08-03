// Add event listener to the button with id 'Calculate'
document.getElementById('Calculate').addEventListener('click', () => {
    // Get the value from the input field with id 'id_city'
    const city = document.getElementById('id_city').value;

    // Construct the API URL using the city value
    const apiUrl = `https://geocode.maps.co/search?q=` + city + `&api_key=66ab2f5467c2a205090311boq099d4a`;

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Assuming the API returns an array of results
            if (data.length > 0) {
                const location = data[0]; // Get the first result
                const latitude = location.lat;
                const longitude = location.lon;

                // Display the result
                document.getElementById('Ans').innerHTML = `Latitude: ${latitude},<br> Longitude: ${longitude}<br>`;

                // Calculate Local Solar Time (LST)
                const now = new Date();
                const utcHours = now.getUTCHours();
                const utcMinutes = now.getUTCMinutes();
                const longitudeOffset = longitude / 15; // Longitude correction for hours
                const localSolarTime = utcHours + (utcMinutes / 60) + longitudeOffset;

                // Normalize Local Solar Time to 24-hour format
                const lstHours = Math.floor(localSolarTime);
                const lstMinutes = Math.round((localSolarTime - lstHours) * 60);
                const formattedLST = `${lstHours.toString().padStart(2, '0')}:${lstMinutes.toString().padStart(2, '0')}`;

                // Calculate Solar Declination
                const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
                const declination = 23.44 * Math.sin(((360 / 365) * (dayOfYear - 81)) * (Math.PI / 180));

                // Display Local Solar Time and Declination
                document.getElementById('Ans').innerHTML += `Local Solar Time: ${formattedLST}<br>Solar Declination: ${declination.toFixed(2)}°`;
            } else {
                document.getElementById('Ans').innerHTML = 'No results found.';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('Ans').innerHTML = 'Error fetching data.';
        });
});