const db = require("./db");
const express = require("express");
const { syncAndSeed,conn, models: {bookmark} } = require("./db");
const app = express();
const init = async () => {
  await db.syncAndSeed();
};
init();

app.get('/', (req, res)=> res.redirect('/bookmarks'))

app.get("/bookmarks", async (req, res, next) => {
  try {
    const bookmarks = await bookmark.findAll();
    const categories = Object.entries(
        bookmarks.reduce((acc, bk) =>{
            acc[bk["category"]] ? acc[bk["category"]]++ : (acc[bk["category"]] =1)
            return acc;
        }, {})
    )
    res.send(
        `<html>
        <head>
       
        </head>
        <body>
            <h1>Hi There! Here are your Bookmarks:</h1>
            <ul>
            ${ categories.map( (cat) => `
                <li>
                <a href ='/bookmarks/${cat[0]}'>
                    ${cat[0]} (${cat[1]})
                </li>`).join('')}
            <ul>
        </body>
        </html>`
    );
  } catch (ex) {
    next(ex);
  }
});

const startApp = async (req, res, next) => {
  try {
    await syncAndSeed();
    console.log("data is seeded");
  } catch (ex) {
    next(ex);
  }
};


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
