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
        document.querySelector(".humidity").innerText="Humidity:"+humidity+"%";
        document.querySelector(".icon").src="https://openweathermap.org/img/wn/"+icon+".png";
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search input").value);
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

weather.fetchWeather("Saharanpur");