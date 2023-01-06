// @ts-nocheck
const cors = require("cors");
const express = require("express");
const http = require("http");
const path = require("path");
const { sequelize } = require("./models");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("cookie-session");
const listEndpoints = require("express-list-endpoints");

const fs = require("fs");
let EXPORT_ROUTES = 2;
// use dotenv to read .env vars into Node
require("dotenv").config();



require("./config/passport")(passport);
//const profile = require("./routes/profile");
const routes = require("./routes");

const colors = require("colors");

dotenv.config({ path: "./config/config.env" });
colors.setTheme({
  info: "blue",
  help: "cyan",
  warn: "yellow",
  success: "green",
  error: "red",
});
const app = express();
const server = http.createServer(app);

// parse body params and attache them to req.body
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

// * setting up the default views and view engine (i am using ejs!)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));

// * Middleware
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    cookie: {
      secure: true,
      maxAge: 60000,
    },
    secret: "dyusdgas8dg7wdg3798r8787h87f87a8sfg87asf8",
    resave: false,
    saveUninitialized: false,
  })
);
// * Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// * Cookie middleware
// app.use(cookieParser());
// app.use(
//   session({
//     secret: "aisbdasd87w8agdui873r87378rb8787fa8778f378r3",
//     cookie: { maxAge: 1200000 },
//   })
// );

// * Routes

app.use("/", routes.google);
app.use("/auth", routes.auth);
app.use("/api/profile", routes.profile);
app.use("/api/result", routes.result);
app.use("/api/item", routes.item);
app.use("/api/question", routes.question);
app.use("/api/game", routes.game);
app.use("/api/error", routes.error);
app.use("/api/shop", routes.shop);

if (EXPORT_ROUTES == 1) {
  const content = JSON.stringify(listEndpoints(app), null, 2);
  fs.writeFile("./temp/allRoutes.json", content.toString(), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  EXPORT_ROUTES += 1;
}
const PORT = process.env.PORT;

// const PORT = 3001;
const eraseDatabaseOnSync = false;

if (process.env.eraseDatabaseOnSync == "true") {
  sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    server.listen(PORT, () =>
      console.log(
        `Circuit Game Server Server listening on http://localhost:${PORT}`
          .success
      )
    );
  });
} else {
  sequelize.authenticate().then(async () => {
    server.listen(PORT, () =>
      console.log(
        `🚀 ~ Circuit Game Server Server running on http://localhost:${PORT}`
          .success
      )
    );
  });
}
