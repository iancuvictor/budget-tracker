"use strict";

let totalIncome = document.querySelector("#totalIncome");
let totalExpense = document.querySelector("#totalExpense");
let incomeList = document.querySelector("#incomeList");
let expenseList = document.querySelector("#expenseList");
let rateCache = {};

// Functions
async function initialise() {
  if (localStorage.getItem("budgetData") === null) {
    initialiseTable(2, "income", incomeList);
    initialiseTable(2, "expense", expenseList);
  } else {
    loadFromStorage();
    await sum("Income");
    await sum("Expense");
    await calcFinancialHealth()
  }
}

initialise();
// Initialise the table for each type
function initialiseTable(length, type, location) {
  for (let i = 0; i < length; i++) {
    createInput(type, location);
  }
}

function saveToStorage() {
  let incomes = [];
  let incomeListItems = document.querySelectorAll("#incomeList > li");
  for (let item of incomeListItems) {
    let obj = {};
    obj.name = item.children[0].value;
    obj.value = item.children[1].value;
    obj.currency = item.children[2].value;
    incomes.push(obj);
  }

  let expenses = [];
  let expenseListItems = document.querySelectorAll("#expenseList > li");
  for (let item of expenseListItems) {
    let obj = {};
    obj.name = item.children[0].value;
    obj.value = item.children[1].value;
    obj.currency = item.children[2].value;
    expenses.push(obj);
  }

  let currencies = [];
  let currListItems = document.querySelectorAll("#currency");
  for (let item of currListItems) {
    let obj = {};
    obj.value = item.value;
    currencies.push(obj);
  }

  let mainObj = {
    incomes: incomes,
    expenses: expenses,
    currencies: currencies,
  };

  localStorage.setItem("budgetData", JSON.stringify(mainObj));
}

function loadFromStorage() {
  incomeList.innerHTML = "";
  expenseList.innerHTML = "";

  let bruteObject = localStorage.getItem("budgetData");
  let obj = JSON.parse(bruteObject);
  console.log(obj);
  let incomes = obj.incomes;
  let expenses = obj.expenses;
  for (let income of incomes) {
    createInput(
      "income",
      incomeList,
      income.name,
      income.value,
      income.currency,
    );
  }

  for (let expense of expenses) {
    createInput(
      "expense",
      expenseList,
      expense.name,
      expense.value,
      expense.currency,
    );
  }
}

//Type = expense, income
function createInput(
  type = "Enter name",
  location,
  name = "Default Name",
  value = 0,
  currency = "RON",
) {
  const currencyCodes = [
    "AFN",
    "ALL",
    "DZD",
    "AOA",
    "ARS",
    "AMD",
    "AWG",
    "AUD",
    "AZN",
    "BSD",
    "BHD",
    "BDT",
    "BBD",
    "BYN",
    "BZD",
    "BMD",
    "BTN",
    "BTC",
    "BOB",
    "BAM",
    "BWP",
    "BRL",
    "GBP",
    "BND",
    "BGN",
    "BIF",
    "KHR",
    "CAD",
    "CVE",
    "KYD",
    "XOF",
    "XAF",
    "XPF",
    "CLP",
    "CNY",
    "COP",
    "KMF",
    "CDF",
    "CRC",
    "HRK",
    "CUC",
    "CZK",
    "DKK",
    "DJF",
    "DOP",
    "XCD",
    "EGP",
    "ERN",
    "ETB",
    "EUR",
    "FKP",
    "FJD",
    "GMD",
    "GEL",
    "GHS",
    "GIP",
    "GTQ",
    "GNF",
    "GYD",
    "HTG",
    "HNL",
    "HKD",
    "HUF",
    "ISK",
    "INR",
    "IDR",
    "IRR",
    "IQD",
    "ILS",
    "JMD",
    "JPY",
    "JOD",
    "KZT",
    "KES",
    "KWD",
    "KGS",
    "LAK",
    "LBP",
    "LSL",
    "LRD",
    "LYD",
    "MOP",
    "MKD",
    "MGA",
    "MWK",
    "MYR",
    "MVR",
    "MRU",
    "MUR",
    "MXN",
    "MDL",
    "MNT",
    "MAD",
    "MZN",
    "MMK",
    "NAD",
    "NPR",
    "ANG",
    "TWD",
    "NZD",
    "NIO",
    "NGN",
    "KPW",
    "NOK",
    "OMR",
    "PKR",
    "PAB",
    "PGK",
    "PYG",
    "PEN",
    "PHP",
    "PLN",
    "QAR",
    "RON",
    "RUB",
    "RWF",
    "SAR",
    "SDG",
    "SRD",
    "SZL",
    "SEK",
    "CHF",
    "STN",
    "VES",
    "ZMW",
  ];

  const options = currencyCodes
    .map(
      (code) =>
        `<option value="${code}" ${code === currency ? "selected" : ""}>${code}</option>`,
    )
    .join("");

  location.insertAdjacentHTML(
    "beforeend",
    `
    <li>
        <input type="text" class="${type}Name" placeholder="${type} name" required value="${name}">
        <input type="number" inputmode="decimal" class="${type}Input" placeholder="0,00" value="${value}" />
        <select class="currencySelector" id="currency" name="currency" value=${currency}>
   ${options}
    </select>
    <button class="selfDestroyBTN">delete</button>
    </li>
    `,
  );
}
document.addEventListener("change", async (event) => {
  if (event.target.classList.contains("currencySelector")) {
    try {
      await sum("Income");
      await sum("Expense");
      calcFinancialHealth();
    } catch (error) {
      console.log(error);
      alert("error");
    }
  }
});

async function sum(type) {
  let arrType = type.toLowerCase();
  let array = [];
  let currencyArray = [];
  let sum = 0;
  let inputs = document.querySelectorAll(`.${arrType}Input`);
  let total = document.querySelector(`#total${type}`);
  for (let i = 0; i < inputs.length; i++) {
    // inputs[i].value = +inputs[i].value;
    array.push(+inputs[i].value);
  }
  for (let i = 0; i < array.length; i++) {
    let selector = inputs[i].parentElement.children[2];
    if (selector.value === "RON") {
      sum = +sum + +array[i];
    } else if(Object.hasOwn(rateCache, selector.value)) {
      sum = +sum + +array[i] * rateCache[selector.value]
    } else {
      let response = await fetch(
        `https://api.frankfurter.dev/v2/rates?base=${selector.value}&quotes=RON`,
      );
      response = await response.json();
      console.log(response);
      rateCache[selector.value] = +response[0].rate;
      sum = +sum + +array[i] * +response[0].rate;
    }
  }
  total.value = sum.toFixed(2);
}

// EVENT LISTENERS
// Event listener for ADDING INCOMES
document.querySelector("#createIncomeBtn").addEventListener("click", () => {
  createInput("income", incomeList);
  calcFinancialHealth();
  saveToStorage();
});
// Event listener for ADDING EXPENSES
document.querySelector("#createExpenseBtn").addEventListener("click", () => {
  createInput("expense", expenseList);
  calcFinancialHealth();
  saveToStorage();
});

// Event listener for REMOVING anything.
document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("selfDestroyBTN")) {
    event.target.parentElement.remove();
    await sum("Income");
    await sum("Expense");
    await calcFinancialHealth();
    saveToStorage();
  }
});

document.addEventListener("input", async (event) => {
  if (event.target.classList.contains("incomeInput")) {
    await sum("Income");
  } else if (event.target.classList.contains("expenseInput")) {
    await sum("Expense");
  }
  await calcFinancialHealth();
  saveToStorage();
});

function calcFinancialHealth(){
  let bruteSavingResult = totalIncome.value - totalExpense.value;
  document.querySelector("#bruteSavings").value = bruteSavingResult.toFixed(2);
  let finScore = Number(((bruteSavingResult / totalIncome.value) * 100).toFixed(2));
  let financialResult = document.querySelector("#financial_result");
  if(finScore >= 20){
    financialResult.textContent = `Your financial score is: ${finScore}`;
    financialResult.className = "greatFinScore";
  } else if( finScore >= 10 && finScore < 20){
    financialResult.textContent = `Your financial score is: ${finScore}`;
    financialResult.className = "decentFinScore"; 
  } else if(0 < finScore && finScore < 10) {
    financialResult.textContent = `Your financial score is: ${finScore}`;
    financialResult.className = "alertFinScore"; 
  } else {
    financialResult.textContent = `Just close the laptop bruv`;
    financialResult.className = "brokeBoy"; 
  }
}
