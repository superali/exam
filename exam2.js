     
$(document).ready(function(){    
 
 
var APIKey='960afd5feabf2dcf19a9b57fbaa16082'
var latitude =5.0;
var logitude = 10.0;
var windSpeed=0
var bit=0
//we get the coordinates of the user
var x = document.getElementById("supported");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
    } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
  latitude  =   position.coords.latitude; 
  logitude  =   position.coords.longitude; 
}
 

 getLocation();



 // Display a bit on the LED display
 function setBit(bit, on) {
     if (on) {
         $("#bit" + bit).css("background-color", "Red");		
     } else {
         $("#bit" + bit).css("background-color", "LimeGreen");		
     }
 } 


// Clears the display back to grey
function clearDisplay() {
    $(".bitbtn").css("background-color", "LightGray");		
}

// Display a bits on the LED display

function setBits(bit, on) {
    for(i = 0;i<=bit;i++){
            setBit(i, on);
        }
    }

// set leds accoring to wind speed
function setWind(speed=0){
    if(speed != 0){
       windSpeed = speed; 
    }

    clearDisplay() 
    bit= Math.abs((windSpeed/20));
    if(windSpeed >=140){
        setBits(bit, true)
    }
    else if(windSpeed >=120){
        setBits(bit, true)
    }else if(windSpeed >=100){
        setBits(bit, true)
    }else if(windSpeed >=80){
        setBits(bit, true)
    }else if(windSpeed >=60){
        setBits(bit, false)
    }else if(windSpeed >=40){
        setBits(bit, false)
    }else if(windSpeed >=20){
        setBits(bit, false)
    }else if(windSpeed >=0){
        setBits(bit, false)
    }

}

// get wind value from server
function fetchValues(){
    var url = 'https://api.openweathermap.org/data/2.5/weather?APPID='+APIKey+'&lat='+latitude+'&lon='+logitude;
    $.ajax({
            url:url,
            method:"GET",
            success:function(data){
                 windSpeed=data.wind.speed*3.6;
                 setWind(windSpeed)
                 $("#speed").text(windSpeed)

            },
            error:function(data){
                 console.log(data)

            }
        })
        
    };


setInterval(fetchValues,5000)

 }) ; 
    
    
    
    

 