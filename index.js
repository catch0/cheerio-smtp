require('dotenv').load();
var path = require('path');
// var config = JSON.parse(fs.readFileSync("package.json"));
var cheerio = require('cheerio');
var request = require('request');
var jquery = require('jquery');
var account = process.env.ACCOUNT ;
var password = process.env.PASS ;
var smtp = process.env.SMTP_CALL ;

request('http://dallas.craigslist.org/search/bia?query=road&hasPic=1&postedToday=1', function(err, resp,body){
  if(!err&& resp.statusCode == 200){
    var bikes = [];
    var $ = cheerio.load(body)
    //create an array for bikes to be gathered
    $('.hdrlnk').each(function(i, element){
      var title = $(this).text()
      var link = $(this).attr("href")
      var bike = {
        title: title,
        link: link
      };
      console.log(bike.title)
      console.log(bike.link)
      console.log("")
    });
  }
});



//create the bike object with title and link then push it on in
