import Localbase from "localbase";
let db = new Localbase("db");
db.config.debug = false;
db.collection("clientes")
  .get()
  .then((data) => {
    if (data.length === 0) {
      db.collection("clientes").add({
        id: 0,
        nome: "Raggi Izar Neto",
        dtNascimento: 20001015,
        cpf: "323.323.323-44",
        carro: ["Sandero", "Celta"],
      });
      db.collection("clientes").add({
        id: 1,
        nome: "Fernando Risso",
        dtNascimento: 20001015,
        cpf: "423.423.423-45",
        carro: ["Porsche", "Ferrari"],
      });
      db.collection("carros").add({
        id: 0,
        carro: "Sandero",
        clientsName: "Raggi",
        placa: "abc123",
        ano: 2016
      })
    }
  });

export default {
  newDataBase(nomeDoDB, objDB) {
    db.collection(nomeDoDB).add(objDB);
  },
  getDataBase(nomeDoDB) {
    return db.collection(nomeDoDB).get();
  },
  deleteDataBase(nomeDoDB, id) {
    return db.collection(nomeDoDB).doc({ id: id }).delete()
  },
  adicionaCarroCliente(id, carro) {
    return db.collection('clientes').doc({ id: id }).update({
      carro: [carro]
    })
  }
};
