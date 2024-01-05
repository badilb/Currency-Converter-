rates = {}

//Elements for currency rates (kurs valut)
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementRUB = document.querySelector('[data-value="RUB"]');

//Elements of form, input sum, choose currency, result field
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');

getCurrencies();

setInterval(getCurrencies, 10000);

//Function of getting currency rates and showing their on the page
async function getCurrencies () {
  const response = await fetch('https://api.exchangerate-api.com/v4/latest/KZT');
  const data = await response.json();

  rates.USD = data.rates.USD;
  rates.EUR = data.rates.EUR;
  rates.RUB = data.rates.RUB;
  

  elementUSD.textContent = data.rates.USD;
  elementEUR.textContent = data.rates.EUR;
  elementRUB.textContent = data.rates.RUB;

  //Informer USD color
  if (rates.USD.Value > rates.USD.Previous) {
    elementUSD.classList.add('top');
  } else {
    elementUSD.classList.add('bottom');
  }

  //Informer EUR color
  if (rates.EUR.Value > rates.EUR.Previous) {
    elementEUR.classList.add('top');
  } else {
    elementEUR.classList.add('bottom');
  }

    //Informer GBP color
  if (rates.RUB.Value > rates.RUB.Previous) {
    elementRUB.classList.add('top');
  } else {
    elementRUB.classList.add('bottom');
  }
}

//Watching changes of currency rates and show their on the pages
input.oninput = convertValue;
select.oninput = convertValue;


//Function of convertation
 function convertValue() {
  result.value = (parseFloat(input.value) * rates[select.value]);
 }
  


