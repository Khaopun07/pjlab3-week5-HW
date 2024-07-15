'use strict';

const express = require('express');
const crypto = require('crypto');
const wrRoute = express.Router();
const connection = require('../db');

wrRoute.post('/users', async (req, res, next) => {
    try {
      const mypass = crypto.createHash('md5').update(req.body.password).digest("hex");
      await connection.execute(
        `INSERT INTO customers (name, phone_number, username, password, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?);`,
        [req.body.name, req.body.phone_number, req.body.username, mypass, new Date(), new Date()]
      );

      console.log('Insert successfully');
      res.status(201).send('Insert Successfully.');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

wrRoute.get('/users', function (req, res, next) {
    connection.execute('SELECT * FROM customers;')
    .then((result) => {
       var rawData = result[0];
       res.send(JSON.stringify(rawData));
    }).catch((err) => {
       console.log(err);
       res.end();
    });
});

wrRoute.post('/check', function (req, res, next) {
    let mypass = crypto.createHash('md5').update(req.body.password).digest("hex");
    connection.execute('SELECT * FROM customers WHERE username=? AND password=?;',
    [req.body.username, mypass]).then((result) => {
        var data = result[0];
        if (data.length === 0) {
           res.sendStatus(200);
        } else {
           res.sendStatus(400);
        }
     }).catch((err) => {
        console.log(err);
        res.sendStatus(404);
     });
 });

 wrRoute.use('/', function (req, res, next) {

    res.sendStatus(404);

})
module.exports = wrRoute;