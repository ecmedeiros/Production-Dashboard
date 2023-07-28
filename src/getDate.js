function getDate() {
  const dataAtual = new Date(); // Obtém a data e hora atual

  const ano = dataAtual.getFullYear(); // Obtém o ano atual

  const dia = String(dataAtual.getDate()).padStart(2, '0'); // Obtém o dia do mês com dois dígitos
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Obtém o mês atual com dois dígitos
  const horas = String(dataAtual.getHours()).padStart(2, '0'); // Obtém as horas atuais com dois dígitos
  const minutos = String(dataAtual.getMinutes()).padStart(2, '0'); // Obtém os minutos atuais com dois dígitos

  const DiaDaSemana = dataAtual.toLocaleString('pt-BR', { weekday: 'long' }).toUpperCase(); // Obtém o dia da semana atual no formato longo e em letras maiúsculas
  const formatedHour = `${horas}:${minutos}`; // Formata a hora no formato HH:MM
  const formatedDay = `${dia}/${mes}`; // Formata o dia no formato DD/MM

  return {
    DiaDaSemana,
    formatedDay,
    formatedHour,
    dia,
    mes,
    ano
  };
}

// Exporta a função getDate como um objeto para ser usado em outros módulos
module.exports = { getDate };
