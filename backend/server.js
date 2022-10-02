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

app.get('/group', async (req, res) => {
    let re = await db.querydb('SELECT * FROM athletelist');
    res.send(re);
    console.log(re);
});


app.post('/grouppresencelist', async (req, res) => {
    console.log(req.params.group_id);
    console.log(req.body.group_id);
    let re = await db.querydb(`SELECT * FROM athletelist WHERE group_id = ${req.params.group_id}`);
    res.send(re);
    console.log(re);
});

module.exports = {
    startserver
}