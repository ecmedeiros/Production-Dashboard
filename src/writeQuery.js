const fs = require("fs"); // Módulo para manipulação de arquivos
const getDate = require("./getDate"); // Importação da função getDate
const { Client } = require("pg"); // Importação do cliente PostgreSQL
const dateInfo = getDate.getDate(); // Obtenção das informações de data e hora usando a função getDate
const hour = dateInfo.formatedHour; // Extração da hora formatada a partir das informações de data
require('dotenv').config()

async function runQuery(extractedYear, extractedMonth, extractedDay) {
  try {
    const client = new Client({
      // Configurações de conexão com o PostgreSQL
      user: process.env.USER,
      host: process.env.HOST,
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
      port: process.env.PORT,
    });

    async function connect() {
      try {
        await client.connect(); // Conexão com o PostgreSQL
        console.log("-----");
        console.log("Conectado ao PostgreSQL", hour);
      } catch (err) {
        console.error("Erro ao conectar ao PostgreSQL:", err);
      }
    }

    async function disconnect() {
      try {
        await client.end(); // Desconexão do PostgreSQL
        console.log("Desconectado do PostgreSQL");
      } catch (err) {
        console.error("Erro ao desconectar do PostgreSQL:", err);
      }
    }

    // Conecta-se ao PostgreSQL
    connect();

    // Executa a query
    const query = 'SUA QUERY AQUI';

    const result = await client.query(query); // Executa a consulta

    // Grava o resultado da query no arquivo "data.json"
    fs.writeFileSync("json/data.json", JSON.stringify(result.rows, null, 2)); // Armazena o resultado em um arquivo JSON

    // Encerra a conexão com o PostgreSQL
    disconnect();

    console.log(`A query foi executada com sucesso no dia ${extractedDay} <===`);
  } catch (err) {
    console.error("Erro ao executar a query:", err);
  }
}

// Exporta a função runQuery para ser utilizada em outros módulos
module.exports = runQuery;
