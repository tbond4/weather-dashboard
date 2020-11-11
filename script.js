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


$(".custom-button").on("click", function(){
    var cityName=$("#cityNameInput").val();
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
        var newItem=$("<li>");
        newItem.text(cityName);
        newItem.addClass("list-group-item");
        cityListEl.append(newItem);
       
    });
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=80b777ad3b7652f1518994be4a5ae0fd",
        method:"GET"
    }).then(function(response){
        console.log(response);
        var j=3;
        for(var i=0;i<5;i++){
            var temp=Math.floor((response.list[j].main.temp_max -273.15) *1.80 +32);
            $(cardArr[i].find(cardDate)).text(response.list[j].dt_txt);
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
   
})

