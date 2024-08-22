
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const alertMessage = document.getElementById("alert-message");
const todosBody = document.querySelector("tbody");


const todos = JSON.parse(localStorage.getItem("todos")) || [];

const generatedId = () => {
    return Math.round(
        Math.random() * Math.random() * Math.pow(10, 15)
    ).toString();
};

const showAlert = (message, type) => {
    alertMessage.innerHTML = "";
    const alert = document.createElement("P");
    alert.innerText = message;
    alert.classList.add("alert");
    alert.classList.add(`alert-${type}`);
    alertMessage.append(alert);

    setTimeout(() => {
        alert.style.display = "none";
    }, 2000)
};

const displayTodos = () => {
    todosBody.innerHTML = "";
    if(!todos.length) {
        todosBody.innerHTML = "<tr><td colspan='4'>No task found!</td></tr>";
        return;
    }
    
    todos.forEach((todo) => {
        todosBody.innerHTML += `
            <tr>
               <td>${todo.task}</td>
               <td>${todo.date || "No date"}</td>
               <td>${todo.completed ? "Completed" : "Pending"}</td>
               <td>
                   <button>Edit</button>
                   <button>Do</button>
                   <button>Delete</button>
               </td>
            </tr>    
        `;
    })
};


const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
}

const addHandler = () => {
    const task = taskInput.value;
    const date = dateInput.value;
    const todo = {
        id: generatedId(),
        completed: false,
        task,
        date,
    };
    if (task) {
        todos.push(todo);
        saveToLocalStorage();
        displayTodos();
        taskInput.value = "";
        dateInput.value = "";
        console.log(todos);
        showAlert("Todo added successfully", "success");
    } else {
        showAlert("please enter a todo!", "error");
    }
};

displayTodos();


window.addEventListener("load", displayTodos);
addButton.addEventListener("click", addHandler);
