//=======[ Settings, Imports & Data ]==========================================
var PORT    = 3000;

var express = require('express')
var cors = require('cors')

const routerDispositivos = require('./dispositivos/index')

var app = express();

const corsOptions = {
    origin: '*',
}

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

app.use(cors(corsOptions))

//=======[ Main module code ]==================================================


app.use(routerDispositivos)

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});


//=======[ End of file ]=======================================================
