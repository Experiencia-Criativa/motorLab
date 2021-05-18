const express = require('express')
const app = express()
const mysql = require("mysql")

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'motorlab'
});

app.get("/", (req, res) => {
  const sqlInsert = "INSERT INTO `clientes` (`nome`) VALUES (?);"
  db.query(sqlInsert, [nome], (err, result) => {
    res.send("inserindo")
  })
})

app.listen(8081, () => {
  console.log('teste');
})