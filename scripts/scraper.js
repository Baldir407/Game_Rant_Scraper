// Require axios and cheerio package which makes scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

// This function will scrape Game Rant's website
var scrape = function() {
  // Scraping Game Rant
  return axios.get("https://gamerant.com/").then(function(res) {
    var $ = cheerio.load(res.data);
    // This makes an empty array to save the articles to
    var articles = [];

    // Find and loop through each element that has the ".text-box" class
    // (.text-box holds the articles on the Game Rant website)
    $(".text-box").each(function(i, element) {

      // grabbing the inner text of the this element and store it
      // to the head variable. This is the article headline
      var head = $(this)
        .children(".title")
        .text()
        .trim();

      // Grab the URL of the article
      var url = $(this)
        .children(".text-box")
        .children("a")
        .attr("href");

      // Then we grab any children with the class of text and then grab it's inner text
      // This inner text is the author of the story
      var sum = $(this)
        .children(".text")
        .text()
        .trim();

      // So long as our headline and sum and url aren't empty or undefined, do the following
      if (head && sum && url) {
        // This section uses regular expressions and the trim function to tidy our headlines
        // We're removing excess to increase cleanliness
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Initialize an object we will push to the articles array

        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: url
        };

        articles.push(dataToAdd);
      }
    });
    return articles;
  });
};

// Export the function, so other files in our backend can use it
module.exports = scrape;
