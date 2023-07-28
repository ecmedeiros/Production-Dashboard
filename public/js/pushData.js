// Função para limpar os valores das células
function clearCellValues() {
  // Seleciona os elementos HTML das células de quantidade do turno 1
  const valorQuantidadesT1 = document.querySelectorAll(
    "#mach1_t1, #mach2_t1, #mach3_t1, #mach4_t1, #mach5_t1, #mach6_t1, #mach7_t1, #mach8_t1"
  );
  // Seleciona os elementos HTML das células de quantidade do turno 2
  const valorQuantidadesT2 = document.querySelectorAll(
    "#mach1_t2, #mach2_t2, #mach3_t2, #mach4_t2, #mach5_t2, #mach6_t2, #mach7_t2, #mach8_t2"
  );

  // Limpa o valor das células do turno 1
  valorQuantidadesT1.forEach((cell) => {
    cell.innerHTML = "0";
  });

  // Limpa o valor das células do turno 2
  valorQuantidadesT2.forEach((cell) => {
    cell.innerHTML = "0";
  });
}

// Função para alternar o valor da célula entre CELULA 2 e CELULA 3 ou entre CELULA 4 e CELULA 5
function toggleCelulaValue() {
  const celulaTitle = document.getElementById("celula-titulo");
  
  // Altera o valor da célula entre CELULA 2 e CELULA 3
  if (celulaTitle.innerHTML === "CELULA 2") {
    console.log('era doi agr é 3')
    celulaTitle.innerHTML = "CELULA 3";
  } else if (celulaTitle.innerHTML === "CELULA 3") {
    celulaTitle.innerHTML = "CELULA 2";
  }

  // Altera o valor da célula entre CELULA 4 e CELULA 5
  if (celulaTitle.innerHTML === "CELULA 4") {
    celulaTitle.innerHTML = "CELULA 5";
  } else if (celulaTitle.innerHTML === "CELULA 5") {
    celulaTitle.innerHTML = "CELULA 4";
  }
}

// Função assíncrona para carregar os dados
async function loadData() {
  // Limpa os valores das células
  clearCellValues();

  try {
    // Adiciona a classe 'activate' a todas as colunas quando o DOM estiver carregado
    document.addEventListener("DOMContentLoaded", () => {
      const col = document.querySelectorAll(".col");
      for (let i = 0; i < col.length; i++) {
        col[i].classList.add("activate");
      }
    });

    // Obtém os dados do arquivo data.json
    const response = await fetch("/data.json");
    const dadosProd = await response.json();

    // Seleciona os elementos HTML das células de quantidade do turno 1
    const valorQuantidadesT1 = document.querySelectorAll(
      "#mach1_t1, #mach2_t1, #mach3_t1, #mach4_t1, #mach5_t1, #mach6_t1, #mach7_t1, #mach8_t1"
    );
    // Seleciona os elementos HTML das células de quantidade do turno 2
    const valorQuantidadesT2 = document.querySelectorAll(
      "#mach1_t2, #mach2_t2, #mach3_t2, #mach4_t2, #mach5_t2, #mach6_t2, #mach7_t2, #mach8_t2"
    );

    // Seleciona as células vazias que não possuem dados
    let blank_machines = document.querySelectorAll(".no-data");

    const celulaTitle = document.getElementById("celula-titulo");

    const maquinas = [
      "MAQUINA 1",
      "MAQUINA 2",
      "MAQUINA 3",
      "MAQUINA 4",
      "MAQUINA 5",
      "MAQUINA 6",
      "MAQUINA 7",
      "MAQUINA 8",
    ];

    // Limpa as células vazias quando a célula atual é CELULA 2, CELULA 3 ou CELULA 4
    if (
      celulaTitle.innerHTML === "CELULA 2" ||
      celulaTitle.innerHTML === "CELULA 3" ||
      celulaTitle.innerHTML === "CELULA 4"
    ) {
      console.log('cheguei aq')
      blank_machines.forEach(blank_machine => blank_machine.innerHTML = "");
    }

    // Preenche as células com os dados do arquivo data.json
    dadosProd.forEach((row) => {
      if (row.celula === celulaTitle.innerText) {
        const turno = row.turno;
        const maquina = row.maquina;
        const quantidade = row.quantidade;

        if (turno === "TURNO 1") {
          const index = maquinas.indexOf(maquina);
          if (index !== -1) {
            valorQuantidadesT1[index].innerHTML = quantidade;
          }
        } else if (turno === "TURNO 2") {
          const index = maquinas.indexOf(maquina);
          if (index !== 0) {
            valorQuantidadesT2[index].innerHTML = quantidade;
          }
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
}

// Função para atualizar o horário
function updateTime() {
  const day = document.getElementById("day");
  const hour = document.getElementById("hour");
  const dayOfWeek = document.getElementById("DayOfWeek");

  let dataAtual = new Date();

  const horas = String(dataAtual.getHours()).padStart(2, "0");
  const minutos = String(dataAtual.getMinutes()).padStart(2, "0");
  const dia = String(dataAtual.getDate()).padStart(2, "0");
  const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
  const DiaDaSemana = dataAtual
    .toLocaleString("pt-BR", { weekday: "long" })
    .toUpperCase();

  day.innerHTML = `${dia}/${mes}`;
  hour.innerHTML = `${horas}:${minutos}`;
  dayOfWeek.innerHTML = DiaDaSemana;
}

// Função para iniciar o polling dos dados
async function startPolling() {
  while (true) {
    // Carrega os dados
    await loadData();
    // Aguarda por 1 minuto antes de carregar os dados novamente
    await new Promise((resolve) => setTimeout(resolve, 60000));
    // Alterna o valor da célula
    toggleCelulaValue();
    // Atualiza o horário a cada minuto
    setInterval(updateTime, 60000);
  }
}

// Evento para trocar o valor da célula quando a tecla Enter é pressionada
document.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    toggleCelulaValue();
    loadData();
  }
});

// Atualiza o horário
updateTime();
// Inicia o polling dos dados
startPolling();
