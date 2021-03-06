const dotenv = require("dotenv").config({ path: "./config/config.env" });

const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const axios = require("axios");
const path = require("path");
const moment = require("moment");
var MemoryStore = require("session-memory-store")(session);

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serving the static folder here
app.use(express.static(path.join(__dirname, "Public")));

app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        store: new MemoryStore(10)
    })
);

// using flash after session
app.use(flash());

// setting the locals var here
app.use((req, res, next) => {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.get("/", (req, res) => {
    res.render("pages/index", {
        error: "",
        data: "",
        time: "",
        input: ""
    });
});

app.post("/", (req, res) => {
    const country = req.body.country;
    let queryData = [];
    // const upperCase = country.charAt(0).toUpperCase();
    // const lowerCase = country.slice(2).toLowerCase();

    if (!req.body.country) {
        return res.render("pages/index", {
            error: "Search Cant be Empty..",
            data: "",
            time: "",
            input: ""
        });
    }
    axios
        .get(
            `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=${country}`, {
                headers: {
                    "content-type": "application/octet-stream",
                    "x-rapidapi-host": process.env.HOST,
                    "x-rapidapi-key": process.env.KEY
                }
            }
        )
        .then(response => {
            const data = response.data;

            if (data.message != "OK") {
                return res.render("pages/index", {
                    error: "Enter Specific Country..",
                    data: "",
                    time: "",
                    input: req.body.country
                });
            } else {
                return res.render("pages/index", {
                    data: data.data,
                    time: moment(data.data.lastChecked).fromNow(),
                    input: req.body.country
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
});

const PORT = process.env.PORT || 8666;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});