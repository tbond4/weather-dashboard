# weather-dashboard
Displays user chosen cities weather forcasts.

This application allows a user to search for a city. That city is then run through 3 different endpoints from the open weather API. The returned data is displayed in a main card with the current weather as well a color coded UV index depending on how high it is. A five-day forcast is also displayed underneath the current weather utilizing icons from font awesome to visaully display the weather for that day.  The last searched city is saved to local storage, when the user reopens or refreshes the page that last searched city gets automatically run throught the API again and dispalyed.
