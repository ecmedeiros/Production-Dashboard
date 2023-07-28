let celulaValue2_3 = "CELULA 2"; // Valor inicial para celula
let celulaValue4_5 = "CELULA 4"; // Valor inicial para celula

//Renderiza a página com a célula 1
exports.celulaUm = async (req, res) => {
  res.render("index", {
    celula: "CELULA 1",
  });
};

//Renderiza a página com a célula 2 ou 3.
exports.celulaTresEdois = async (req, res) => {
  res.render("index", {
    celula: celulaValue2_3,
  });
};

//Renderiza a página com a celula 4 ou 5
exports.celulaQuatroEcinco = async (req, res) => {
  res.render("index", {
    celula: celulaValue4_5,
  });
};
