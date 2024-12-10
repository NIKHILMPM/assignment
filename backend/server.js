import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import cors from "cors"
import pg from "pg"
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

db.connect();

app.get("/api/report", async (req, res) => {
    console.log("fetching reports");
    try {
        const response = await db.query("SELECT report.*, users.username, users.email FROM report JOIN users ON report.uid = users.uid ORDER BY report.rid ASC");
        console.log(response.rows);
        res.json(response.rows);
    } catch (err) {
        res.status(500).json({ error: "An error occurred while getting the reports" });
    }
});

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const u = await db.query("SELECT * from users WHERE email=($1)", [email]);
        const user = u.rows;
        console.log(user);
        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        console.log(isPasswordValid);

        if (user.length > 0 && isPasswordValid) {
            const token = jwt.sign(
                { id: user[0].uid, email: user[0].email, username: user[0].username },
                JWT_SECRET_KEY,
                { expiresIn: "1h" }
            );

            console.log(token);
            res.json({ message: "success", token: token });
        } else if (user.length > 0 && !isPasswordValid) {
            res.send({ message: "pass" });
        }
    } catch (err) {
        res.status(500).json({ error: "An error occurred while logging in" });
    }
});

app.post("/api/register", async (req, res) => {
    const { username, password, email } = req.body;
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    try {
        const u = await db.query("SELECT * FROM users WHERE email=($1)", [email]);
        const users = u.rows;

        console.log(users);
        console.log(users.length);
        console.log("trying");

        if (users.length > 0) {
            res.send(false);
        } else {
            await db.query("INSERT INTO users (username,email,password) VALUES ($1, $2, $3)", [username, email, hashedPassword]);
            res.send(true);
        }
    } catch (err) {
        res.status(500).json({ error: "An error occurred while signing you up" });
    }
});

app.post("/api/searchCity", async (req, res) => {
    console.log("getting city weather");
    const { cityName, uid } = req.body;
    console.log(req.body);

    const url = `http://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${encodeURIComponent(cityName)}`;

    try {
        const response = await axios.get(url);
        const weatherData = response.data;

        if (weatherData.success === false) {
            res.json({ status: false });
        } else {
            console.log(weatherData.location.name);
            const resp = await db.query("SELECT * FROM report where uid=$1 and city=$2", [uid, weatherData.location.name]);
            if (resp.rows.length < 1) {
                await db.query("INSERT INTO report(uid,city,city_data) VALUES($1,$2,$3)", [uid, weatherData.location.name, JSON.stringify(weatherData)]);
            }
            res.json({ status: true, weatherData: weatherData });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching weather data" });
    }
});

app.listen(port, () => {
    console.log("server running");
});
