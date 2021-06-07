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
  const sqlInsert = "INSERT INTO `clientes` (`nome`, `cpf`, `dtNascimento`, `email`) VALUES (?,?,?,?);"
  const nome = req.body.name
  const cpf = req.body.cpf
  const dtNascimento = req.body.dtNasc
  const email = req.body.email
  db.query(sqlInsert, [nome, cpf, dtNascimento, email], (err, result) => {
    res.send("inserindo")
    console.log(result)
    console.log(err)
  })
})

// inserir Veiculos
app.post("/api/insertVeiculos", (req, res) => {
  const sqlInsert = "INSERT INTO `veiculos` (`modelo`, `ano`, `placa`, `chassi`, `cor`) VALUES (?,?,?,?,?);"
  const modelo = req.body.modelo
  const ano = req.body.ano
  const placa = req.body.placa
  const chassi = req.body.chassi
  const cor = req.body.cor
  db.query(sqlInsert, [modelo, ano, placa, chassi, cor], (err, result) => {
    res.send("inserindo")
    console.log(result)
    console.log(err)
  })
})

// inserir Servicos
app.post("/api/insertServico", (req, res) => {
  const sqlInsert = "INSERT INTO `servicos` (`nome`, `valorPH`) VALUES (?,?);"
  const servico = req.body.servico
  const valorPH = req.body.valorPH
  db.query(sqlInsert, [servico, valorPH], (err, result) => {
    res.send("inserindo")
    console.log(result)
    console.log(err)
  })
})

// inserir cargo
app.post("/api/insertFunc", (req, res) => {
  const sqlInsert = "INSERT INTO `funcionarios` (`nome`, `cpf`, `dtNascimento`, `cargo`) VALUES (?,?,?,?);"
  const nome = req.body.name
  const cpf = req.body.cpf
  const dtNascimento = req.body.dtNasc
  const cargo = req.body.cargo
  db.query(sqlInsert, [nome, cpf, dtNascimento, cargo], (err, result) => {
    res.send("inserindo")
    console.log(result)
    console.log(err)
  })
})

app.get("/api/selectCliente", (req, res) => {
  const sql = "SELECT * FROM `clientes`"
  db.query(sql, (err, result) => {
    res.send(result)
  })
})


app.listen(3001, () => {
  console.log('Server On!');
})