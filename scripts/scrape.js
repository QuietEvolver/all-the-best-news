// scrape script

var request = require("request");
var cheerio = require("cheerio");

 function scrape(cb) {
    request("https://www.nytimes.com", function(err, res, body) {
        const $ = cheerio.load(body);

        const articles = [];

        $("article").each(function(i, element){
            const head = $(this).find("h2").text().trim();
            const sum = $(this).find("span").text().trim();

            if (head && sum) {
                const headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                const sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                const dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };

                articles.push(dataToAdd);
            }
        });
        cb(articles);
    });
};

module.exports = scrape;