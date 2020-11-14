var cityListEl=$(".cityList");
var cityNameDisplayEl=$(".cityNameDisplay");
var tempEl=$(".temp");
var humidityEl=$(".humidity");
var windSpeedEl=$(".windSpeed");
var uvIndexEl=$(".uvIndex");
var cardArr=[$("#card1"),$("#card2"),$("#card3"),$("#card4"),$("#card5")];
var cardDate=$(".cardDate");
var cardIcon=$(".cardIcon");
var cardTemp=$(".cardTemp");
var cardHumidity=$(".cardHumidity");
var latitude;
var longitude;
var cityName;
var namesArr=[];

// button listener for search button, saves item in local storage, calls appendNew funciton
$(".custom-button").on("click", function(){
    cityName=$("#cityNameInput").val();
    localStorage.setItem("lastCity", cityName);
    appendNew(cityName);
});
$(".cityList").on("click", function(event){
    cityName=$(event.target).data("city");
    displayWeather(cityName);
})
//creates list item and calls dispalyWeather function
function appendNew(cityName){
    var newItem=$("<li>");
        newItem.text(cityName);
        newItem.addClass("list-group-item");
        newItem.data("city", cityName);
        cityListEl.append(newItem);
        namesArr.push(cityName);
        localStorage.setItem("names", JSON.stringify(namesArr));
        displayWeather(cityName);
       
}
//dispalys main card data and forcast data
function displayWeather(cityName){
    var queryURL="https://api.openweathermap.org/data/2.5/weather?q="+ cityName+",usa&appid=80b777ad3b7652f1518994be4a5ae0fd";
    $.ajax({
        url:queryURL,
        method:"GET"
        
    }).then(function(response){
        var temp=Math.floor((response.main.temp -273.15) *1.80 +32);
        cityNameDisplayEl.text(cityName);
        tempEl.text("Temperature: " + temp);
        humidityEl.text("Humidity: " + response.main.humidity);
        windSpeedEl.text("Wind Speed: " + response.wind.speed);
        latitude=response.coord.lat;
        longitude=response.coord.lon;

            $.ajax({
                url:"http://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=80b777ad3b7652f1518994be4a5ae0fd",
                method:"GET"
            }).then(function(response){
                uvIndexEl.text("UV Index: " + response[3].value);

                    if(response[3].value<3){
                        uvIndexEl.css("background-color", "green");
                    }else if(response[3].value<6){
                        uvIndexEl.css("background-color", "yellow");
                    }else if(response[3].value<8){
                        uvIndexEl.css("background-color", "orange");
                    }else if(response[3].value<11){
                        uvIndexEl.css("background-color", "red");
                    }else{
                        uvIndexEl.css("background-color", "purple");
                    }
            })
    });
 
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=80b777ad3b7652f1518994be4a5ae0fd",
        method:"GET"
    }).then(function(response){
        var j=3;
        for(var i=0;i<5;i++){
            var temp=Math.floor((response.list[j].main.temp_max -273.15) *1.80 +32);
            var date=response.list[j].dt_txt.split("");
            var dateFormat=date[5]+date[6]+date[7]+date[8]+date[9]+date[4]+date[0]+date[1]+date[2]+date[3];
            
            $(cardArr[i].find(cardDate)).text(dateFormat);
            $(cardArr[i].children().find(cardTemp)).text("Temp: " + temp);
            $(cardArr[i].children().find(cardHumidity)).text("Humidity: " + response.list[j].main.humidity);

            if(response.list[j].weather[0].main=="Rain"){
                $(cardArr[i].children().find(cardIcon)).addClass("fas fa-cloud-rain");
                $(cardArr[i].children().find(cardIcon)).text("");
            }else if(response.list[j].weather[0].main=="Clouds"){
                $(cardArr[i].children().find(cardIcon)).addClass("fas fa-cloud");
                $(cardArr[i].children().find(cardIcon)).text("");
            }else if(response.list[j].weather[0].main=="Snow"){
                $(cardArr[i].children().find(cardIcon)).addClass("fas fa-snowflake");
                $(cardArr[i].children().find(cardIcon)).text("");
            }else if(response.list[j].weather[0].main=="Clear"){
                $(cardArr[i].children().find(cardIcon)).addClass("fas fa-sun");
                $(cardArr[i].children().find(cardIcon)).text("");
            }
            
            j+=8;
            
                }

    });
}
//pulls from local storage and runs it back through functions otherwise console logs nothing in storage
var storedCity = localStorage.getItem("lastCity");
if(storedCity == null){
    console.log("nothing in local storage")
}else{
appendNew(storedCity);
}
