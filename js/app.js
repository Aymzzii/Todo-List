
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const editButton = document.getElementById("edit-button");
const alertMessage = document.getElementById("alert-message");
const todosBody = document.querySelector("tbody");
const deleteAllButton =document.getElementById("delete-all-button");
const filterButton = document.querySelectorAll(".filter-todos");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

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

const displayTodos = (data) => {
    const todoList =  data || todos;
    todosBody.innerHTML = "";

    if(!todoList.length) {
        todosBody.innerHTML = "<tr><td colspan='4'>No task found!</td></tr>";
        return;
    }
    
    todoList.forEach((todo) => {
        todosBody.innerHTML += `
            <tr>
               <td>${todo.task}</td>
               <td>${todo.date || "No date"}</td>
               <td>${todo.completed ? "Completed" : "Pending"}</td>
               <td>
                   <button onclick="editHandler('${todo.id}')">Edit</button>
                   <button onclick="toggleHandler('${todo.id}')">
                        ${todo.completed ? "Undo" : "Do"}
                   </button>
                   <button onclick="deleteHandler('${todo.id}')">
                        Delete
                    </button>
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
        showAlert("Task added successfully.", "success");
    } else {
        showAlert("please enter a task!", "error");
    }
};

const deleteAllHandler = () => {
    if (todos.length) {
        todos = [];
        saveToLocalStorage();
        displayTodos();
        showAlert("All tasks cleared successfully!", "success")
    } else {
        showAlert("No task to clear!","error")
    }
    
}

displayTodos();

const deleteHandler = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    todos = newTodos;
    saveToLocalStorage();
    displayTodos(newTodos);
    showAlert("Task deleted successfully!","success")
}

const toggleHandler = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    todo.completed = !todo.completed
    saveToLocalStorage();
    displayTodos();
    showAlert("Task status changed successfully", "success");
};

const editHandler = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    console.log(todo);
    taskInput.value = todo.task;
    dateInput.value = todo.date;
    addButton.style.display = "none";
    editButton.style.display = "inline-block";
    editButton.dataset.id = id;
}

const applyEditHandler = () => {
    const id = event.target.dataset.id;
    console.log(id);
    const todo = todos.find(todo => todo.id === id);
    todo.task = taskInput.value;
    todo.date = dateInput.value;
    taskInput.value = "";
    dateInput.value = "";
    addButton.style.display = "inline-block";
    editButton.style.display = "none";
    saveToLocalStorage();
    displayTodos();
    showAlert("Task edited successfully!", "success")
};

const filterHandler = (event) => {
    let filteredTodos = null;
    const filter = event.target.dataset.filter;
    switch(filter) {
        case "pending":
            filteredTodos = todos.filter((todo) => todo.completed === false);
            break;
        case"completed":
            filteredTodos = todos.filter((todo) => todo.completed === true);
            break;
        default:
            filteredTodos = todos;
            break;
    }
    displayTodos(filteredTodos);
    saveToLocalStorage();
}

window.addEventListener("load", (e) => displayTodos());
addButton.addEventListener("click", addHandler);
deleteAllButton.addEventListener("click", deleteAllHandler);
editButton.addEventListener("click", applyEditHandler);
filterButton.forEach((button) => {
    button.addEventListener("click", filterHandler);
});

