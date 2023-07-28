// Importação das dependências
const express = require('express'); // Framework Express para criar o servidor
const path = require('path'); // Módulo para manipulação de caminhos de arquivo
const homeController = require('../controllers/homeController'); // Importação do controlador homeController

// Criação do objeto de rotas do Express
const router = express.Router();

// Rota para fornecer o arquivo data.json
router.get("/data.json", (req, res) => {
    res.sendFile(path.join(__dirname, "../json/data.json")); // Envio do arquivo data.json como resposta
});

// Rotas para diferentes URLs
router.get('/celula1', homeController.celulaUm); // Rota para a URL /celula1, manipulada pelo método celulaUm do homeController
router.get('/celula2&3', homeController.celulaTresEdois); // Rota para a URL /celula2&3, manipulada pelo método celulaTresEdois do homeController
router.get('/celula4&5', homeController.celulaQuatroEcinco); // Rota para a URL /celula4&5, manipulada pelo método celulaQuatroEcinco do homeController

// Exportação do objeto de rotas para ser utilizado em outros módulos
module.exports = router;
