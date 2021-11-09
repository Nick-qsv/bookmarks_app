const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");
const { STRING } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_bookmarks_db"
);

const data = [
  {
    name: "LinkedIn",
    URL: "http://www.linkedin.com",
    category: "jobs",
  },
  {
    name: "Indeed",
    URL: "http://www.indeed.com",
    category: "jobs",
  },
  {
    name: "Amazon",
    URL: "http://www.amazon.com",
    category: "shopping",
  },
  {
    name: "W3C Shools - Javascript",
    URL: "https://www.w3schools.com/jsref/default.asp",
    category: "coding",
  },
  {
    name: "Target",
    URL: "http://www.shopping.com",
    category: "shopping",
  },
  {
    name: "The Weeknd",
    URL: "https://www.theweeknd.com/",
    category: "music",
  },
  {
    name: "Stack Overflow",
    URL: "https://stackoverflow.com/",
    category: "coding",
  },
];

const bookmark = conn.define("bookmarks", {
  name: {
    type: sequelize.DataTypes.STRING,

  },
  URL: {
    type: sequelize.DataTypes.STRING,

  },
  category: {
    type: sequelize.DataTypes.STRING,

  },
});

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  await Promise.all(
    data.map((entry) =>
      bookmark.create({
        name: entry.name,
        URL: entry.URL,
        category: entry.category,
      })
    )
  );
};

module.exports = {
    conn,
    syncAndSeed,
    models: { bookmark },
}
