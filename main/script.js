"use strict";

let totalIncome = document.querySelector("#totalIncome");
let totalExpense = document.querySelector("#totalExpense");
let incomeList = document.querySelector("#incomeList");
let expenseList = document.querySelector("#expenseList");

// Functions

if (localStorage.getItem("budgetData") === null) {
  initialiseTable(2, "income", incomeList);
  initialiseTable(2, "expense", expenseList);
} else {
  loadFromStorage();
  sum("Income");
  sum("Expense");
  document.querySelector("#bruteSavings").value =
    totalIncome.value - totalExpense.value;
}
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
    incomes.push(obj);
  }

  let expenses = [];
  let expenseListItems = document.querySelectorAll("#expenseList > li");
  for (let item of expenseListItems) {
    let obj = {};
    obj.name = item.children[0].value;
    obj.value = item.children[1].value;
    expenses.push(obj);
  }

  let mainObj = {
    incomes: incomes,
    expenses: expenses,
  };

  localStorage.setItem("budgetData", JSON.stringify(mainObj));
}

function loadFromStorage() {
  incomeList.innerHTML = "";
  expenseList.innerHTML = "";

  let bruteObject = localStorage.getItem("budgetData");
  let obj = JSON.parse(bruteObject);
  let incomes = obj.incomes;
  let expenses = obj.expenses;
  for (let income of incomes) {
    createInput("income", incomeList, income.name, income.value);
  }

  for (let expense of expenses) {
    createInput("expense", expenseList, expense.name, expense.value);
  }
}

//Type = expense, income
function createInput(
  type = "Enter name",
  location,
  name = "Default Name",
  value = 0,
) {
  location.insertAdjacentHTML(
    "beforeend",
    `
    <li>
        <input type="text" class="${type}Name" placeholder="${type} name" required value="${name}">
        <input type="number" class="${type}Input" placeholder="0,00" value="${value}"/>
        <button class="selfDestroyBTN">delete</button>
    </li>
    `,
  );
}

function sum(type) {
  let arrType = type.toLowerCase();
  let array = [];
  let inputs = document.querySelectorAll(`.${arrType}Input`);
  let sum = 0;
  let total = document.querySelector(`#total${type}`);
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = +inputs[i].value;
    array.push(inputs[i].value);
  }
  for (let i = 0; i < array.length; i++) {
    sum = +sum + +array[i];
  }
  total.value = sum;
}

// EVENT LISTENERS
// Event listener for ADDING INCOMES
document.querySelector("#createIncomeBtn").addEventListener("click", () => {
  createInput("income", incomeList);
  saveToStorage();
});
// Event listener for ADDING EXPENSES
document.querySelector("#createExpenseBtn").addEventListener("click", () => {
  createInput("expense", expenseList);
  saveToStorage();
});

// Event listener for REMOVING anything.
document.addEventListener("click", () => {
  if (event.target.classList.contains("selfDestroyBTN")) {
    event.target.parentElement.remove();
    sum("Income");
    sum("Expense");
    saveToStorage();
    document.querySelector("#bruteSavings").value =
    totalIncome.value - totalExpense.value;
  }
});

document.addEventListener("input", () => {
  if (event.target.classList.contains("incomeInput")) {
    sum("Income");
  } else if (event.target.classList.contains("expenseInput")) {
    sum("Expense");
  }
  document.querySelector("#bruteSavings").value =
    totalIncome.value - totalExpense.value;
  saveToStorage();
});
