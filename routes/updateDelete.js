'use strict';

const express = require('express');
const udRoute = express.Router();
const connection = require('../db');

udRoute.put('/users/:uid', (req, res, next) => {
    connection.execute(
      "UPDATE customers SET name=?, phone_number=?, updated_at=? WHERE customer_id=?;",
      [req.body.name, req.body.phone_number, new Date(), req.params.uid]
    )
    .then(() => {
      console.log('Update successfully');
      res.status(200).send('Update Successfully.');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Failed to update user.');
    });
  });
  

udRoute.delete('/users/:uid', (req, res, next) => {
  connection.execute(
    "DELETE FROM customers WHERE customer_id=?;",
    [req.params.uid]
  )
  .then(() => {
    console.log('Delete successfully');
    res.status(200).send('Delete Successfully.');
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
  });
});

module.exports = udRoute;
