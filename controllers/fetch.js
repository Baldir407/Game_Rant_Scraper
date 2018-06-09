var db = require("../models");
var scrape = require("../scripts/scraper");

module.exports = {
  scrapeHeadlines: function(req, res) {
    // scraping Game Rant
    return scrape()
      .then(function(articles) {
        // then insert articles into the db
        return db.Headline.create(articles);
      })
      .then(function(dbHeadline) {
        if (dbHeadline.length === 0) {
          res.json({
            message: "Nothing new today. Check back tomorrow!"
          });
        }
        else {
          // Send back a count of how many new articles we got
          res.json({
            message: "Added " + dbHeadline.length + " new gaming news!"
          });
        }
      })
      .catch(function(err) {
        // won't insert duplicate headlines, but will error after inserting others
        res.json({
          message: "Scraping complete!!"
        });
      });
  }
};
