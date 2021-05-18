const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require("mysql")

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'motorlab'
});

app.use(cors())
app.use(express.json())

app.get("/api/insert", (req, res) => {
  const sqlInsert = "INSERT INTO `clientes` (`nome`, `cpf`) VALUES (?,?);"
  const nome = req.body.name
  const cpf = req.body.cpf
  db.query(sqlInsert, [nome, cpf], (err, result) => {
    res.send("inserindo")
    console.log(result)
    console.log(err)
  })
})

app.listen(3001, () => {
  console.log('teste');
})