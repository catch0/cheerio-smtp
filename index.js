require('dotenv').load();
var fs = require('fs');
var path = require('path');
// var config = JSON.parse(fs.readFileSync("package.json"));
var Nightmare = require('nightmare');
      nightmare = Nightmare();
var request = require('request');
var jquery = require('jquery');
var account = process.env.ACCOUNT ;
var password = process.env.PASS ;
var nodemailer = require('nodemailer');



var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user: account,
    pass: password
  }
});

nightmare.goto('http://dallas.craigslist.org/search/bia?query=road&hasPic=1&postedToday=1')
//visits the city specified
.wait(2000)
.evaluate(function(){
  var bikes = [];
  //create an array for bikes to be gathered
  $('.hdrlnk').each(function(){
    item = {}
    item["title"] = $(this).text()
    item["link"] = $(this).attr("href")
    bikes.push(item)
  })
  return bikes
  //create the bike object with title and link then push it on i
})
 .end()
.then(function(result){
  const mailOptions = {
  from:'lumanwalters@gmail.com',
  to: 'spencerpeacock@gmail.com',
  subject: "bikes",
  html: '' + result 

}
  transporter.sendMail(mailOptions, function (err, info) {
     if(err)
       console.log(err)
     else
       console.log(info);
  });
})



//create the bike object with title and link then push it on in
