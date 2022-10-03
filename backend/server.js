//  server.js

const express = require('express');
const app = express();
const db = require('./db');


const port = process.env.PORT || 3000;

async function startserver(){
    app.use(express.static(__dirname + './frontend'));

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });

    
}

app.get('/addpresence:athlete_id:date', async (req, res) => {
    console.log(req.params.athlete_id);
    console.log(req.params.date);
    let str = req.params.date.toString();
    str = str.slice(1);
    console.log("STR: " + str);
    let re = await db.querydb(`INSERT INTO presences (athlete_id, training_date) VALUES ('${req.params.athlete_id.toString()}', '${str.toString()}');`);
    res.send(re);
    console.log(re);
});


app.get('/grouppresencelist:group_id', async (req, res) => {
    console.log(req.params.group_id);
    let re = await db.querydb(`
        SELECT cast(count(athlete_ID) AS CHAR) AS presences, athlete_name, athlete_lastname
        FROM presences JOIN
        athletelist USING(athlete_id)
        WHERE group_id = ${req.params.group_id.toString()}
        GROUP BY athlete_id
        ORDER BY presences DESC;
    `);
    console.log(re);
    res.send(re);
    
});

module.exports = {
    startserver
}