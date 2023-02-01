let btn = document.getElementById("btn");
btn.addEventListener("click", searchAddress);

function searchAddress(e) {
    e.preventDefault();
    const input = document.getElementById("inputBox").value;
    let error = document.getElementById("error");
    if (input == "") {
        document.getElementById("addressResult").innerHTML = "";
        error.innerText = "Please enter an address!"
    } else {
        error.innerHTML = "";
        fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(input)}&apiKey=f6cf47d43d864ab6bfeaf94018729e6d`)
            .then(response => response.json())
            .then(data => {
                let addressResult = data.features[0].properties;
                console.log(addressResult);

                document.getElementById("addressResult").innerHTML = `<div class="userBox2"> 
                                                                    <h1>Your result</h1>
                                                                    <p>Name Of The Zone : ${addressResult.name ?? "Not Found!"}</p>
                                                                    <div id="box1">
                                                                        <span>
                                                                            Lat : ${addressResult.lat ?? "Not Found!"}
                                                                        </span>
                                                                        <span id="spn">
                                                                            Long : ${addressResult.lon ?? "Not Found!"}
                                                                        </span>
                                                                    </div>
                                                                    <p>Offset STD : ${addressResult.timezone.offset_STD ?? "Not Found!"}</p>
                                                                    <p>Offset STD Seconds : ${addressResult.timezone.offset_STD_seconds ?? "Not Found!"}</p>
                                                                    <p>Offset Dst : ${addressResult.timezone.offset_DST ?? "Not Found!"}</p>
                                                                    <p>Offset Dst Seconds : ${addressResult.timezone.offset_DST_seconds ?? "Not Found!"}</p>
                                                                    <p>Country : ${addressResult.country ?? "Not Found!"}</p>
                                                                    <p>Postcode : ${addressResult.postcode ?? "Not Found!"}</p>
                                                                    <p>City : ${addressResult.city ?? "Not Found!"}</p>
                                                                </div>`
            })
            .catch((error) => {
                console.error(error);
                error.innerHTML = `Time zone could not be found.`;
            })
    }
    document.getElementById("addressResult").innerHTML = "";
}



function userData() {
    navigator.geolocation.getCurrentPosition(showPosition);

    async function showPosition(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        console.log(lat, lon);

        async function userApi() {
            const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=f6cf47d43d864ab6bfeaf94018729e6d`
            const res = await fetch(url)
            data = await res.json();
            console.log(data.results[0]);

            document.getElementById("timezone").innerText = data.results[0].timezone.name;
            document.getElementById("lat").innerText = data.results[0].lat;
            document.getElementById("long").innerText = data.results[0].lon;
            document.getElementById("std").innerText = data.results[0].timezone.offset_STD;
            document.getElementById("stdSecond").innerText = data.results[0].timezone.offset_STD_seconds;
            document.getElementById("dst").innerText = data.results[0].timezone.offset_DST;
            document.getElementById("dstSecond").innerText = data.results[0].timezone.offset_DST_seconds;
            document.getElementById("country").innerText = data.results[0].country;
            document.getElementById("postcode").innerText = data.results[0].postcode;
            document.getElementById("city").innerText = data.results[0].city;
        }
        userApi()
    }

}

userData()


