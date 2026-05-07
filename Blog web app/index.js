import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";
import passport from "passport";
import bcrypt from "bcrypt"
import { Strategy } from "passport-local";
import session from "express-session";
import GoogleStrategy from "passport-google-oauth2";

const app = express();
const port=3000;
const saltRound = 10;

env.config();

// 
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.use(passport.initialize());
app.use(passport.session());

// set up the database
const db = new pg.Client({
    user: process.env.PG_USER,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    password: process.env.PG_PASSWORD,
    port: 5432
})

// connecting the database to the server
db.connect()

app.get("/", async (req, res) => {
    const result = await db.query("SELECT * FROM posts");
    const data = result.rows
    res.render("index.ejs", {
        content: data
    });
})

app.get("/signup", (req, res) => {
    res.render("signup.ejs");
})

app.get("/login", (req, res) => {
    res.render("login.ejs");
})

app.get("/create-post", (req,res) => {
    if (req.isAuthenticated()) {
       res.render("content.ejs"); 
    } else{
        res.redirect("/login")
    }
})

app.get("/blogs", (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/")
    } else {
        res.redirect("/login")
    }
})

app.post("/login", 
    // console.log("LOGIN ROUTE HIT");
    passport.authenticate("local", {
        successRedirect: "/blogs",
        failureRedirect: "/login"
    })
);

app.post("/signup", async (req, res) => {
     const userEmail=req.body.username;
     const password=req.body.password;
     const firstName = req.body.firstName;
     const surname = req.body.lastName;
    try {
        const checkEmial = await db.query("SELECT * FROM users WHERE email=$1",[userEmail]);
        // check if the email is stored in the database already
        if (checkEmial.rows.length > 0) {
            res.redirect("/login");

            // add the user information to the database
        } else {
            bcrypt.hash(password, saltRound, async (err, hash) => {
                if (err) {
                    console.error(err);
                    
                } else {
                    const result = await db.query("INSERT INTO users (email, password, first_name, surname) VALUES ($1, $2,$3,$4) RETURNING *", [userEmail, hash, firstName, surname]);
                    const user = result.rows[0];

                    // use user information to login
                    req.login(user, (err) => {
                        console.log("success")
                        res.redirect("/blogs")
                    })
                    
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
    
})

app.post("/submit", async (req, res) => {
    try {
        // get the user id of the current user
        const getUserId = await db.query("SELECT id FROM users WHERE email=$1", [req.user.email]);
        const userId = getUserId.rows[0].id
        console.log(userId)

        // save the blog content in the database 
        const result = await db.query("INSERT INTO posts (title, story, user_id) VALUES ($1, $2, $3)", [req.body.title, req.body.content, userId])
        res.redirect("/");

    } catch (error) {
        console.log(error)
    }
})


// authenticate the user using local strategy
passport.use("local", new Strategy( async function verify(username, password, cb) {
    console.log(username);
    try {
        const result = await db.query("SELECT * FROM users WHERE email=$1", [username]);
    // compare the hash password in the DB with the login password
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const hashPassword = user.password;
            bcrypt.compare(password, hashPassword, (err, valid) => {
                if (err) {
                    console.error("Error comparing passwords: ", err);
                    return cb(err)
                } else {
                    if (valid) {
                        console.log("PASSWORD CORRECT")
                        return cb(null, user)
                    } else {
                        console.log("PASSWORD WRONG")
                        return cb(null, false)
                    }
                }
            });
        } else {
            return cb(null, false)
        }
        
    } catch (err) {
        console.log(err)
    }
}))



// user must be serialized to the session
passport.serializeUser((user, cb) => {
    cb(null, user)
})

// deserialized when subsequent requests are made
passport.deserializeUser((user, cb) => {
    cb(null, user)
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
