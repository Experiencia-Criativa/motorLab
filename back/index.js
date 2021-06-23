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

// SELECTS HOME

app.get("/api/selectCliente", (req, res) => {
  const sql = "SELECT * FROM `clientes`"
  db.query(sql, (err, result) => {
    res.send(result)
  })
})

app.get("/api/selectVeiculos", (req, res) => {
  const sql = "SELECT * FROM `veiculos`"
  db.query(sql, (err, result) => {
    res.send(result)
    console.log(err)
  })
})

app.get("/api/selectFunc", (req, res) => {
  const sql = "SELECT * FROM `funcionarios`"
  db.query(sql, (err, result) => {
    res.send(result)
  })
})

app.get("/api/selectServ", (req, res) => {
  const sql = "SELECT * FROM `servicos`"
  db.query(sql, (err, result) => {
    res.send(result)
  })
})

app.get("/api/selectEvents", (req, res) => {
  const sql = "SELECT eventos.id, eventos.nome, eventos.favorito, eventos.cor, eventos.inicio, eventos.fim, clientes.id as cliente_id, clientes.nome as nomeCliente, veiculos.id as veiculo_id, veiculos.modelo, funcionarios.id as funcionario_id, funcionarios.nome as nomeFunc, servicos.id as servico_id, servicos.nome as nomeServ FROM eventos INNER JOIN clientes ON ( clientes.id = cliente_id ) INNER JOIN veiculos ON ( veiculos.id = veiculo_id ) INNER JOIN funcionarios ON ( funcionarios.id = funcionario_id ) INNER JOIN servicos ON ( servicos.id = servico_id )"
  db.query(sql, (err, result) => {
    res.send(result)
  })
})

// Delete home

app.post("/api/deleteCliente", (req, res) => {
  const sql = "DELETE FROM `clientes` WHERE id = (?)"
  const id = req.body.id
  db.query(sql, [id],(err, result) => {
    res.send(result)
    console.log(err)
  })
})

app.post("/api/deleteVeiculo", (req, res) => {
  const sql = "DELETE FROM `veiculos` WHERE id = (?)"
  const id = req.body.id
  db.query(sql, [id],(err, result) => {
    res.send(result)
    console.log(err)
  })
})

app.post("/api/deleteFunc", (req, res) => {
  const sql = "DELETE FROM `funcionarios` WHERE id = (?)"
  const id = req.body.id
  db.query(sql, [id],(err, result) => {
    res.send(result)
    console.log(err)
  })
})

app.post("/api/deleteServ", (req, res) => {
  const sql = "DELETE FROM `servicos` WHERE id = (?)"
  const id = req.body.id
  db.query(sql, [id],(err, result) => {
    res.send(result)
    console.log(err)
  })
})

app.post("/api/insertEvent", (req, res) => {
  const sqlInsert = "INSERT INTO `eventos` (`nome`, `cliente_id`, `veiculo_id`, `funcionario_id`,  `servico_id`, `favorito`, `cor`, `inicio`, `fim`) VALUES (?,2,1,1,1,0,?,?,?);"
  const nome = req.body.nome
  const cor = req.body.cor
  const inicio = req.body.inicio
  const fim = req.body.fim
  db.query(sqlInsert, [nome, cor, inicio, fim], (err, result) => {
    res.send("inserindo")
    console.log(result)
    console.log(err)
  })
})


app.listen(3001, () => {
  console.log('Server On!');
})