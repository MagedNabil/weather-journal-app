/* Global Variables */

const apiKey = "1e62a5a1f9b7dcd46223ea8fdb173d57&units=metric";
//&units=metric is for Celcius
// we got if after crating an account on openweathermap site

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
//it was a tip in the webinar adding 1 to the month
// we add 1 to the month because its indexs starts from 0 to 11 so we added 1

//console.log(newDate); // to check the data value

const btn = document.getElementById("generate");
// get the generate button from html using its id to add the event click on it

// using async-fun allows us to use await & fetch
//await ==>  is used to wait for a Promise
//fetch ==>API interface allows web browser to make HTTP requests to web servers in our broject to our local server
//try catch ==> used to catch errors

//add click event and the async_fun which will be execute after the click
btn.addEventListener("click", async () => {
  let zipCode = document.getElementById("zip").value; // get the zipcode from the user
  let feelings = document.getElementById("feelings").value; //get the user feelings

  //we check if the user enterd data or not
  if (zipCode === "" && feelings === "") {
    // in case of entering no data
    alert("U should fill the the boxes below");
  } else if (zipCode === "") {
    // in case of empty zipcode
    alert("Enter the city zipcode");
  } else if (feelings === "") {
    // in case of empty feelings
    alert("please enter your feelings");
  } else {
    // if all is good and all data enterd

    try {
      // get the data from openweather using zipcode from the user and our apikey
      const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;
      const request = await fetch(url);
      const response = await request.json(); //in json form
      //console.log(response); //to  see what is the  res from openweather

      const temp = await response.main.temp; //we get the temp which we need from the responsed data came from the site
      //console.log(temp); // the temp from openweather site

      // now we put the data in our local server
      //using the same url we used in the post method of our local server "/datura"

      await fetch("/datura", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //data from json to js object to be able to use it
          //set date , temp , feeling in our server
          newDate,
          temp,
          feelings,
        }),
      });

      // update ui with finaldata
      // first we get the data we saved in our local host
      // using the same url we used in the get method of our local server "/datta"
      const GetReqData = await fetch("/datta");
      const finalData = await GetReqData.json(); // to json form to use it
      document.getElementById(
        "date"
      ).innerHTML = `Today's Date  ==> ${finalData.date}`;
      //print the data in the element with id date
      document.getElementById(
        "temp"
      ).innerHTML = `Temperature   ==> ${finalData.temp} c`;
      //print the temp in the element with id temp
      document.getElementById(
        "content"
      ).innerHTML = `Your Feelings ==> ${finalData.feelings}`;
      //print the feelings in the element with id content
    } catch (error) {
      // if error print it
      console.log("Unfortunatle we catch an error", error);
    }
  }
});
