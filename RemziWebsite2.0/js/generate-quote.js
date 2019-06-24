

$(document).ready(function(){
  jQuery.get('/RemziWebsite2.0/quotes.txt', function(data) {
    var quotes = data.split("\n");
    var author = [];
    for(var i = 0; i < quotes.length; i++) {
      author.push(quotes[i].split(" -")[1])
      quotes[i] = quotes[i].split(" -")[0]
    }
console.log(author)
console.log(quotes)
console.log(rand);
    var rand = Math.floor(Math.random()*quotes.length);
    $("#quote").text(quotes[rand])
    $("#author").text(author[rand])

  });

  //$("#quote").text("\""+quotes[Math.floor(Math.random()*quotes.length)]+"\"")
});
