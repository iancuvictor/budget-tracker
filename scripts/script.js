let incomeList = document.querySelector("#incomeList");
let expenseList = document.querySelector("#expenseList");

// Functions

// Initialise the table for each type
function initialiseTable(length, type, location) {
  for (let i = 0; i < length; i++) {
    createInput(type, location);
  }
}

initialiseTable(2, "income", incomeList);
initialiseTable(2, "expense", expenseList);

//Type = expense, income
function createInput(type = "Enter name", location) {
  let object = location.insertAdjacentHTML(
    "beforeend",
    `
    <li>
        <input type="text" placeholder="${type} name">
        <input type="number" class="${type}Input" placeholder="0,00" />
        <button class="selfDestroyBTN">delete</button>
    </li>
    `,
  );

  type = type.slice(0, 1).toUpperCase() + type.slice(1);

  this.addEventListener("input", () => {
    sum(`${type}`);
  });
}


function generateArray(type) {
  let array = [];
  type = type.toLowerCase();
  let inputs = document.querySelectorAll(`.${type}Input`);
  for (let i = 0; i < inputs.length; i++) {
    array.push(inputs[i].value);
  }
  return array;
}
//let expenseArray = generateArray("expense");

function sum(type) {
  let incomeArray = generateArray(type);
  let total = document.querySelector(`#total${type}`);
  //let inputs = document.querySelectorAll(`${type}Input`)
  let sum = 0;
  for (i = 0; i < incomeArray.length; i++) {
      sum = +sum + +incomeArray[i];
  }

  total.value = sum;

}

// sum(incomeArray, "Income");
// sum(expenseArray, "Expense");



// EVENT LISTENER
// Event listener for ADDING EXPENSES
document.querySelector("#createExpenseBtn").addEventListener("click", () => {
  createInput("expense", expenseList);
});

// Event listener for ADDING INCOMES
document.querySelector("#createIncomeBtn").addEventListener("click", () => {
  createInput("income", incomeList);
});

// Event listener for REMOVING anything.
document.addEventListener("click", () => {
  if (event.target.classList.contains("selfDestroyBTN")) {
    event.target.parentElement.remove();
  }
});

// Event listeners for summing each category
// for incomes
// let incomeInputs = document.querySelectorAll(".incomeInput");
// for(let incomeInput of incomeInputs){
//   incomeInput.addEventListener("input", () => {
//     sum("Income");
//   });
// }

// let expenseInputs = document.querySelectorAll(".expenseInput");
// for(let expenseInput of expenseInputs){
//   expenseInput.addEventListener("input", () => {
//     sum("Expense");
//   });
// }

let totalIncome = document.querySelector("#totalIncome");
let totalExpense = document.querySelector("#totalExpense");

setInterval(() => {

  document.querySelector("#bruteSavings").value = totalIncome.value - totalExpense.value;
}, 0);
// totalIncome.addEventListener("change", () =>{
// });

