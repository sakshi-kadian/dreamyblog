const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let posts = [];

app.get("/", (req, res) => {
  res.render("index", { posts: posts });
});

app.post("/create", (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });
  res.redirect("/");
});

app.post("/delete/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (!isNaN(index) && index >= 0 && index < posts.length) {
    posts.splice(index, 1);
  }
  res.redirect("/");
});

app.post("/edit/:index", (req, res) => {
  const index = req.params.index;
  const { title, content } = req.body;
  if (posts[index]) {
    posts[index] = { title, content };
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`DreamyBlog is running at http://localhost:${port}`);
});
