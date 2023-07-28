// Importação das dependências
const express = require("express"); // Framework Express para criar o servidor
const runQuery = require("./src/writeQuery"); // Função para executar consultas
const getDate = require("./src/getDate"); // Função para obter a data atual
const routes = require("./routes/routes"); // Arquivo de rotas
let dia; // Variável para armazenar o dia atual

// Criação da instância do servidor Express
const app = express();
const path = require("path");

// Configuração das rotas e middleware para análise de JSON
app.use("/", routes);
app.use(express.json());

// Configuração do mecanismo de visualização e localização dos arquivos de visualização
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Configuração do diretório de arquivos estáticos
app.use(express.static(path.resolve(__dirname, "./public")));

// Atualização do dia e execução da primeira consulta
updateDay();
runQuery(ano, mes, dia)
  .then(() => {
    updateDay();
    app.emit("pronto"); // Evento emitido quando a primeira consulta é concluída
  })
  .catch((e) => console.log(e));

// Evento que é disparado quando a primeira consulta é concluída
app.on("pronto", () => {
  // Inicia a execução do servidor na porta 3333
  app.listen(3333, () => {
    console.log("Acessar http://localhost:3333/celula1 para acompanhar a produção da celula 1");
    console.log("Acessar http://localhost:3333/celula2&3 para acompanhar a produção da celula 2 e 3");
    console.log("Acessar http://localhost:3333/celula4&5 para acompanhar a produção da celula 4 e 5");
  });

  // Atualiza o horário a cada minuto
  setInterval(updateDay, 60000 * 1);

  // Executa a consulta a cada 15 minutos
  setInterval(() => {
    runQuery(ano, mes, dia);
  }, 60000 * 15);
});

// Função para atualizar o dia
function updateDay() {
  const { dia: numberDay, mes: month, ano: year } = getDate.getDate();
  dia = numberDay;
  mes = month;
  ano = year;
  return (dia = numberDay), (mes = month), (ano = year);
}