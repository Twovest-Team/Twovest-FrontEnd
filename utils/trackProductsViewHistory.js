import getLocalStorage from "./localStorage/getLocalStorage";
import setLocalStorage from "./localStorage/setLocalStorage";

export default function trackProductsViewHistory(id) {

  // -> Implementação com localstorage

  // const currentHistory = getLocalStorage('productViewHistory');
  
  // const parsedHistory = currentHistory ? JSON.parse(currentHistory) : [];

  // const isIdInHistory = parsedHistory.includes(id);

  // if (isIdInHistory) {
  //   return;
  // } else {
  //   setLocalStorage('productViewHistory', JSON.stringify([...parsedHistory, id]));
  // }


  // ------------------------------------------------------------------------------------------


  // -> obter sessão do utilizador
  // -> obter histórico de views de um utilizador
  // -> fazer um parse da string com o histórico do utilizador
  // -> verificar se id recebido está presente nesse histórico
  // -> IF estiver não guardar esse id
  // -> ELSE faz insert into de um novo histórico



}
