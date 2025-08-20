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

routerDispositivos.post('/dispositivos/:id', (req, res) => {
  const id = req.params.id;
  const estadoValvula = req.body.estadoValvula;
  const valor = Math.floor(Math.random() * 100);
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("DB connection error:", err);
      return res.status(500).json(err);
    }

    connection.beginTransaction(err => {
      if (err) {
        connection.release();
        return res.status(500).json(err);
      }

      connection.query(
        'INSERT INTO Log_Riegos (apertura, fecha, electrovalvulaId) VALUES (?, NOW(), ?)',
        [estadoValvula, id],
        (err, logResults) => {
          if (err) {
            return connection.rollback(() => {
              connection.release();
              res.status(500).json(err);
            });
          }

          connection.query(
            'INSERT INTO Mediciones (fecha, valor, dispositivoId) VALUES (NOW(), ?, ?)',
            [valor, id],
            (err, medResults) => {
              if (err) {
                return connection.rollback(() => {
                  connection.release();
                  res.status(500).json(err);
                });
              }

              connection.commit(err => {
                if (err) {
                  return connection.rollback(() => {
                    connection.release();
                    res.status(500).json(err);
                  });
                }
                connection.release();
                res.json({
                  logInsert: logResults,
                  medicionInsert: medResults
                });
              });
            }
          );
        }
      );
    });
  });
});


routerDispositivos.get('/dispositivos/:id', (req, res) => {
  const dispositivoId = req.params.id;
  const sql = 'SELECT * FROM Mediciones WHERE dispositivoId = ? ORDER BY fecha DESC LIMIT 1';

  pool.query(sql, [dispositivoId], (err, results) => {
    if (err) {
      console.error("DB error:", err);
      res.status(500).json(err);
    } else {
      res.json(results[0] || null);
    }
  });
});

routerDispositivos.get('/dispositivos/:id/estado', (req, res) => {
  const dispositivoId = req.params.id;

  const sql = `
    SELECT apertura 
    FROM Log_Riegos 
    WHERE electrovalvulaId = ? 
    ORDER BY fecha DESC 
    LIMIT 1
  `;

  pool.query(sql, [dispositivoId], (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json(err);
    }

    if (results.length > 0) {
      res.json({ estadoValvula: results[0].apertura === 1 }); // return boolean
    } else {
      res.json({ estadoValvula: false }); // default if no records
    }
  });
});

module.exports = routerDispositivos
