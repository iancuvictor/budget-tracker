let incomeList = document.querySelector('#incomeList');
let expenseList = document.querySelector('#expenseList');

// Functions

//Type = expense, income
function createInput(type, location){
    // let div = document.createElement('div');
    // div.className= `${type}Box`;
    // div.innerHTML = `${type} body goes here`;

    location.insertAdjacentHTML('beforeend', `
    <div class='${type}Box'>
    <span>${type} goes here</span>
    </div>`);
}

// function sum(array){
//     let sum = 0;
//     for(i = 0; i < array.length; i++){
//         sum = sum + array[i];
//     };
//     return sum;
// }

// Event listeners

// Event listener for ADDING EXPENSES
document.querySelector('#createExpenseBtn').addEventListener('click', () => {
    createInput('Expense', expenseList)
});

// Event listener for ADDING INCOMES
document.querySelector('#createIncomeBtn').addEventListener('click', () => {
    createInput('Income', incomeList);
});

