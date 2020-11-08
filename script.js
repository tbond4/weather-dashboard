

$(".custom-button").on("click", function(){
    var cityName=$("#cityNameInput").val();
    var queryURL="https://api.openweathermap.org/data/2.5/weather?q="+ cityName+",usa&appid=80b777ad3b7652f1518994be4a5ae0fd";
    console.log(queryURL);
    $.ajax({
        url:queryURL,
        method:"GET"
        
    }).then(function(response){
        console.log(response);
    });
})
