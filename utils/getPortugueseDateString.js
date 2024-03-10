/* Utility Function que recebe a string de formato timestamptz da base de dados e converte para string de 
data escrita em português */
const getPortugueseDateString = (timestamptz) => {
  const simpleDate = timestamptz.split("T")[0];

  const individualDate = simpleDate.split("-");

  const date = new Date();
  date.setMonth(individualDate[1] - 1);

  var mesExtenso = date.toLocaleString("pt-PT", {
    month: "long",
  });

  return `${individualDate[2]} de ${mesExtenso} de ${individualDate[0]}`;
};

export default getPortugueseDateString;
