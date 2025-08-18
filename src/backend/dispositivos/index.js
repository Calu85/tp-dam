const express = require('express')

const routerDispositivos = express.Router()

var pool = require('../mysql-connector')

routerDispositivos.get('/dispositivos', function(req, res) {
    pool.query('Select * from Dispositivos', function(err, result, fields) {
        if (err) {
            res.send(err).status(400)
            return
        }
        res.send(result).status(200)
    })
})

routerDispositivos.get('/mediciones/:id', (req, res) => {
    const queryMediciones = 'SELECT * FROM Mediciones WHERE dispositivoId = ?';
    pool.query(queryMediciones, [req.params.id], (err, results) => {
    if (err) {
      console.error("DB error:", err);
      res.status(500).json(err);
    } else {
      res.json(results);
    }
  });
});

module.exports = routerDispositivos
