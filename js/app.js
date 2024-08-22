
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const alertMessage = document.getElementById("alert-message");
console.log(alertMessage)

const todos = [];

const showAlert = (message, type) => {
    alertMessage.innerHTML = "";
    const alert = document.createElement("P");
    alert.innerText = message;
    alert.classList.add("alert");
    alert.classList.add(`alert-${type}`);
    alertMessage.append(alert);

    setTimeout(() => {
        alert.style.display = "none"
    }, 2000)
}

const addHandler = () => {
    const task = taskInput.value;
    const date = dateInput.value;
    const todo = {
        task: task,
        date: date,
        completed: false,
    };
    if (task) {
        todos.push(todo);
        taskInput.value = "";
        dateInput.value = "";
        console.log(todos);
        showAlert("Todo added successfully", "success")
    } else {
        showAlert("please enter a todo!", "error");
    }
}

addButton.addEventListener("click", addHandler);