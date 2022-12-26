let weather={
 
    "apiKey":"1e163c737067b33c184789afadf03490",

    fetchWeather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + city
        + "&units=metric&appid=" 
        + this.apiKey

        ).then((response)=> response.json())
        .then((data)=> this.displayWeather(data))
    },

    displayWeather: function(data){
        const{name}= data;
        const{icon,description}=data.weather[0];
        const{ temp,humidity }=data.main;
        const{speed}=data.wind;
        console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerText="Weather in "+ name;
        document.querySelector(".temp").innerText=temp+"°C";
        document.querySelector(".how").innerText= description;
        document.querySelector(".wind").innerText="Wind Speed: "+ speed;
        document.querySelector(".humidity").innerText="Humidity: "+humidity+"%";
        document.querySelector(".icon").src="https://openweathermap.org/img/wn/"+icon+".png";
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search input").value);
    }
};

let geocode={
reverseGeocode(latitude,longitude){

  var api_key = 'a9c1813c49794b1b9108ca65c83a025b';
  
  var api_url = 'https://api.opencagedata.com/geocode/v1/json'

  var request_url = api_url
    + '?'
    + 'key=' + api_key
    + '&q=' + encodeURIComponent(latitude + ',' + longitude)
    + '&pretty=1'
    + '&no_annotations=1';

  // see full list of required and optional parameters:
  // https://opencagedata.com/api#forward

  var request = new XMLHttpRequest();
  request.open('GET', request_url, true);

  request.onload = function() {
     
    // see full list of possible response codes:
    // https://opencagedata.com/api#codes

    if (request.status === 200){
      // Success!
      var data = JSON.parse(request.responseText);
  
weather.fetchWeather(data.results[0].components.city);
    } else if (request.status <= 500){
      // We reached our target server, but it returned an error

      console.log("unable to geocode! Response code: " + request.status);
      var data = JSON.parse(request.responseText);
      console.log('error msg: ' + data.status.message);
    } else {
      console.log("server error");
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    console.log("unable to connect to server");
  };

  request.send();  // make the request

},
getlocation: function(){
function success (data){
  geocode.reverseGeocode(data.coords.latitude,data.coords.longitude);

}
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success)
}
else{
  weather.fetchWeather("delhi");
}
}

};



document.querySelector("#search button").addEventListener("click", function(){
    weather.search();
});

document
  .querySelector(".search input")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });


geocode.getlocation();