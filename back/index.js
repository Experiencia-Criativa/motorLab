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

// Iserir clientes
app.post("/api/insertCliente", (req, res) => {
  const sqlInsert = "INSERT INTO `clientes` (`nome`, `cpf`, `dt_nascimento`, `dt_incis`) VALUES (?,?,?,NOW());"
  const nome = req.body.name
  const cpf = req.body.cpf
  const dtNascimento = req.body.dtNasc
  db.query(sqlInsert, [nome, cpf, dtNascimento], (err, result) => {
    res.send("inserindo")
    console.log(result)
    console.log(err)
  })
})

// inserir veiculos
app.post("/api/insertCarros", (req, res) => {
  const sqlInsert = "INSERT INTO `veiculos` (`placa`, `modelo`, `ano`, `dt_incis`) VALUES (?,?,?,NOW());"
  const placa = req.body.placa
  const modelo = req.body.modelo
  const ano = req.body.ano
  db.query(sqlInsert, [placa, modelo, ano], (err, result) => {
    res.send("inserindo")
    console.log(result)
    console.log(err)
  })
})

app.listen(3001, () => {
  console.log('Server On!');
})