const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// Load articles from JSON file
let articles = [];
try {
  const data = fs.readFileSync('articles.json', 'utf8');
  articles = JSON.parse(data);
} catch (err) {
  console.error('Error reading articles file:', err);
}

/////////////////////////All Articles///////////////////////////////////

app.route("/articles")

  .get(function(req, res) {
    res.json(articles);
  })

  .post(function(req, res) {
    const newArticle = {
      title: req.body.title,
      content: req.body.content
    };

    articles.push(newArticle);
    saveArticles();

    res.send("Successfully added a new article.");
  })

  .delete(function(req, res) {
    articles = [];
    saveArticles();

    res.send("Successfully deleted all the articles.");
  });


/////////////////////////Individual Articles///////////////////////////////////

app.route("/articles/:articleTitle")

  .get(function(req, res) {
    const articleTitle = req.params.articleTitle;
    const article = articles.find(article => article.title === articleTitle);

    if (article) {
      res.json(article);
    } else {
      res.send("No article with that title found.");
    }
  })

  .patch(function(req, res) {
    const articleTitle = req.params.articleTitle;
    const index = articles.findIndex(article => article.title === articleTitle);

    if (index !== -1) {
      articles[index].content = req.body.newContent;
      saveArticles();
      res.send("Successfully updated selected article.");
    } else {
      res.send("No article with that title found.");
    }
  })

  .put(function(req, res) {
    const articleTitle = req.params.articleTitle;
    const index = articles.findIndex(article => article.title === articleTitle);

    if (index !== -1) {
      articles[index] = {
        title: articleTitle,
        content: req.body.newContent
      };
      saveArticles();
      res.send("Successfully updated the content of the selected article.");
    } else {
      res.send("No article with that title found.");
    }
  })

  .delete(function(req, res) {
    const articleTitle = req.params.articleTitle;
    const index = articles.findIndex(article => article.title === articleTitle);

    if (index !== -1) {
      articles.splice(index, 1);
      saveArticles();
      res.send("Successfully deleted selected article.");
    } else {
      res.send("No article with that title found.");
    }
  });


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

// Function to save articles to JSON file
function saveArticles() {
  fs.writeFileSync('articles.json', JSON.stringify(articles, null, 2));
}
