//  server.js

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const db = require('./db');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

async function startserver(){
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });

    
}

app.post('/addpresence', async (req, res) => {
    console.log("Athlete name: " + req.body.athlete_name);
    console.log("Athlete lastname: " + req.body.athlete_lastname);
    console.log("Date received: " + req.body.date);
    let query = `
        INSERT INTO presences (athlete_id, training_date)
        VALUES ((
            SELECT athlete_id 
            FROM athletelist 
            WHERE athlete_name LIKE '${req.body.athlete_name}' AND athlete_lastname LIKE '${req.body.athlete_lastname}'), '${req.body.date}');`
    let re = await db.querydb(query);
    console.log(re);
    res.send("");
    // res.send(re.toString());
    
});

app.post('/rempresence', async (req, res) => {
    console.log(req.body.athlete_id);
    console.log(req.body.date);
    let query = `DELETE FROM presences WHERE athlete_id = ${req.body.athlete_id.toString()} AND training_date LIKE '${str.toString()}';`
    let re = await db.querydb(query);
    console.log(re);
    res.send("ok");
    // res.send(re.toString());
    
});

async function toJson(data) {
    return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
        .replace(/"(-?\d+)n"/g, (_, a) => a);
}


app.post('/presences', async (req, res) => {
    console.log(req.body.group_id);
    let re = await db.querydb(`
        SELECT cast(count(athlete_ID) AS CHAR) AS presences, athlete_name, athlete_lastname
        FROM presences JOIN
        athletelist USING(athlete_id)
        WHERE group_id = ${req.body.group_id.toString()}
        GROUP BY athlete_id
        ORDER BY presences DESC;
    `);
    console.log(re);

    let data = await toJson(re);
    console.log("Data:");
    console.log(data);

    res.send(data);
});

module.exports = {
    startserver
}