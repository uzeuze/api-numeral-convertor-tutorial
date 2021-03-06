const express = require('express');

let app = express();

app.get('/to-roman/:number', (req, res) => {
  //parseInt function either returns a number or NaN
  let number = parseInt(req.params.number),
      keys = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},
      roman = "";
  //If given number is NaN respond with an error.
  if (isNaN(number)) {
    // HTTP status code 400 means that the request was malformed.
    res.status(400).json({ error: "Bad request"});
    //return to prevent sending respond twice
    return;
  }
  number = ("" + number).split("");
  for(let j=0; j<number.length; j++){
    number[j] = +number[j]*Math.pow(10,number.length-j-1);
     for ( let i in keys ) {
      while ( number[j] >= keys[i] ) {
        roman += i;
        number[j] -= keys[i];
      }
    }
  }
  res.json({result: roman});
});

//If client requests an invalid URI, application will return an HTTP 404 “Not Found” error
app.use((req,res) => {
  res.status(404);
  res.json({ message: "404 Not Found", status_code: 404 });
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
