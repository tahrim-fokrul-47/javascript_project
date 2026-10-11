const expenseForm = document.getElementById('expense-form');
const titleInput = document.getElementById('title');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const dateInput = document.getElementById('date');
const paymentInput = document.getElementById('payment');

const addBtn = document.getElementById('add-btn');
const updateBtn = document.getElementById('update-btn');
const resetBtn = document.getElementById('reset-btn');
const clearAllBtn = document.getElementById('clear-all-btn'); // Clear all button যোগ করা হয়েছে
const tableBody = document.getElementById('expense-table-body');

const totalExpenseEl = document.getElementById('total-expense');
const totalTransactionsEl = document.getElementById('total-transactions');
const highestExpenseEl = document.getElementById('highest-expense');
const lowestExpenseEl = document.getElementById('lowest-expense');
const averageExpenseEl = document.getElementById('average-expense');

let expenses = []; 
let editId = null; 

function renderExpenses() {
    tableBody.innerHTML = ''; 
    for (let i = 0; i < expenses.length; i++) {
        const exp = expenses[i];
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${exp.title}</td>
            <td>${exp.amount}</td>
            <td>${exp.category}</td>
            <td>${exp.date}</td>
            <td>${exp.paymentMethod}</td>
            <td class="action-btns">
                <button class="edit-btn" onclick="editExpense(${exp.id})">Edit</button>
                <button class="delete-btn" onclick="deleteExpense(${exp.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    }
    updateSummary();
}

function updateSummary() {
    let total = 0;
    let highest = 0;
    let lowest = expenses.length > 0 ? expenses[0].amount : 0;
    let totalTx = expenses.length;

    for (let i = 0; i < expenses.length; i++) {
        let currentAmount = expenses[i].amount;
        total += currentAmount; 

        if (currentAmount > highest) {
            highest = currentAmount;
        }
    
        if (currentAmount < lowest) {
            lowest = currentAmount;
        }
    }
    let average = totalTx > 0 ? (total / totalTx).toFixed(2) : 0;

    totalExpenseEl.innerText = total;
    totalTransactionsEl.innerText = totalTx;
    highestExpenseEl.innerText = highest;
    lowestExpenseEl.innerText = lowest;
    averageExpenseEl.innerText = average;
}


function resetForm() {
    titleInput.value = '';
    amountInput.value = '';
    categoryInput.value = '';
    dateInput.value = '';
    paymentInput.value = '';
    
    addBtn.style.display = 'inline-block';
    updateBtn.style.display = 'none';
    editId = null;
}


expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    const date = dateInput.value;
    const paymentMethod = paymentInput.value;


    if (!title || !amount || !category || !date || !paymentMethod) {
        alert('All fields are required!');
        return;
    }
    if (amount <= 0) {
        alert('Amount must be greater than 0!');
        return;
    }

    if (editId !== null) {

        for (let i = 0; i < expenses.length; i++) {
            if (expenses[i].id === editId) {
                expenses[i].title = title;
                expenses[i].amount = amount;
                expenses[i].category = category;
                expenses[i].date = date;
                expenses[i].paymentMethod = paymentMethod;
                break;
            }
        }
    } else {

        const newExpense = {
            id: Date.now(),
            title: title,
            amount: amount,
            category: category,
            date: date,
            paymentMethod: paymentMethod
        };
        expenses.push(newExpense);
    }

    renderExpenses();
    resetForm();
});


window.editExpense = function(id) {
    const expenseToEdit = expenses.find(exp => exp.id === id);
    if (expenseToEdit) {
        titleInput.value = expenseToEdit.title;
        amountInput.value = expenseToEdit.amount;
        categoryInput.value = expenseToEdit.category;
        dateInput.value = expenseToEdit.date;
        paymentInput.value = expenseToEdit.paymentMethod;

        editId = id;
        addBtn.style.display = 'none';
        updateBtn.style.display = 'inline-block';
    }
};

window.deleteExpense = function(id) {
    const confirmDelete = confirm('Are you sure you want to delete this expense?');
    
    if (confirmDelete) {
        for (let i = 0; i < expenses.length; i++) {
            if (expenses[i].id === id) {
                expenses.splice(i, 1);
                break;
            }
        }
        renderExpenses();  
    }
};

clearAllBtn.addEventListener('click', function() {
    if (expenses.length === 0) {
        alert('No expenses to clear!');
        return;
    }
    const confirmClear = confirm('Are you sure you want to clear all expenses?');
    if (confirmClear) {
        expenses = [];
        renderExpenses();
        resetForm();
    }
});

resetBtn.addEventListener('click', resetForm);



