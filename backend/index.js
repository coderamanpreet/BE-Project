const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const publicpath = path.join(__dirname, '../frontend');
app.use(express.static(publicpath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.send("<h1>Hey, it is the start of the project</h1>");
}).listen(3000, function () {
    console.log("Server started on port 3000");
});



app.post('/submit-survey', (req, res) => {
    const {
        name,
        email,
        age_group,
        occupation,
        frequency,
        contact_method,
        services,
        satisfaction,
        platforms,
        feedback
    } = req.body;

    const newUser = {
        name,
        email,
        age_group,
        occupation,
        frequency,
        contact_method,
        services,
        satisfaction,
        platforms,
        feedback
    };

    const filePath = path.join(__dirname, 'user.json');

    fs.readFile(filePath, 'utf-8', (readErr, data) => {
        let users = [];
        if (!readErr && data) {
            users = JSON.parse(data);
        }

        users.push(newUser);

        fs.writeFile(filePath, JSON.stringify(users, null, 4), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to user.json:', writeErr);
                res.status(500).send('Error saving data to file.');
            } else {
                console.log('Survey data saved to user.json successfully!');
                // res.redirect('/users.html'); 
                res.send("data submitted successfully !!") ; 
            }
        });
    });
});


app.get('/api/users', (req, res) => {
    const filePath = path.join(__dirname, 'user.json');

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading user.json:', err);
            res.status(500).send('Error loading user data.');
        } else {
            res.json(JSON.parse(data)); 
        }
    });
});
