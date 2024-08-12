const todoInput=document.getElementById("task-input");
console.log(todoInput);
const dateInput=document.getElementById("date-input");
console.log(dateInput);
const addButton=document.getElementById("add-button");
console.log(addButton);
const alertMessege=document.getElementById("alert-messege");
console.log(alertMessege);
const tBody=document.querySelector("tbody");
console.log(tBody);
const deleteAll=document.getElementById("delete-all-button");
console.log(deleteAll);
const editButton=document.getElementById("edit-button");
console.log(editButton);
const filters=document.querySelectorAll(".filter");
console.log(filters);


let todos=JSON.parse(localStorage.getItem("todos")) || [];
console.log(todos);

const generateId=()=>{
  return Math.round( Math.random()*Math.random()*Math.pow(10,15)).toString() ;



}
const displayTodos=(data)=>{
    const todoList=data?data:todos;
    tBody.innerHTML="";
    if(!todoList.length){
        tBody.innerHTML="<tr><td colspan='4'> No task found!</td></tr>";
        return;
    
    }
  
    todoList.forEach((todo)=>{
        tBody.innerHTML+=`<tr>
        <td>${todo.task}</td>
        <td>${todo.date|| "No date"}</td>
        <td>${todo.completed ?"completed" : "pending"}</td>
        <td><button onclick="editHandler(${todo.id})">Edit</button><button onclick="toggleHandler(${todo.id})">${todo.completed ? "Undo" :"Do"}</button><button onclick="deleteHandler(${todo.id})">Delete</button></td>
        </tr>`;
    });
   
};

const saveToLocalStorage=(()=>{
  localStorage.setItem("todos",JSON.stringify(todos));

    });

saveToLocalStorage();


const showAlert=(messege,type)=>{
    alertMessege.innerHTML="";
    const alert=document.createElement("p");
    alert.innerText=messege;
    alert.classList.add("alert");
    alert.classList.add(`alert-${type}`);
    alertMessege.append(alert);

    setTimeout(()=>{
        alert.style.display="none";


    },2000);

}

const addHandler=(id)=>{
    const task=todoInput.value;
    const date=dateInput.value;
    const todo={
        id:generateId(),
        task:task,
        date:date,
        completed:false,

    }
    if(task){
        todos.push(todo);
        saveToLocalStorage();
        displayTodos();
    
        todoInput.value="";
        dateInput.value="";
        console.log(todos);
        showAlert("it was added successfully","success")
    }
    else{
       showAlert("enter your task please","error")
    }
 
}
deleteAllTodos=()=>{
    if(todos.length){
        todos=[];
        saveToLocalStorage();
        displayTodos();
        showAlert("all deleted","success");



    }
    else{
        showAlert("NO todos to deleted","error");

}}

const deleteHandler=(id)=>{
    const newTodos=todos.filter((todo)=>todo.id!=id);
    todos=newTodos;
    console.log(todos);
    saveToLocalStorage();
    displayTodos();
    showAlert("item deleted successfully",'success');

}
const toggleHandler=(id)=>{

 
    const todo=todos.find((todo)=>todo.id==id);
    todo.completed=!todo.completed;
    console.log(todo);
    saveToLocalStorage();
    displayTodos();
    showAlert("todo status changed successfuly","success");
};


const editHandler=(id)=>{
  const todo=todos.find((todo)=>todo.id==id);
  todoInput.value=todo.task;
  dateInput.value=todo.date;
  addButton.style.display="none";
  editButton.style.display="inline-block";
  editButton.dataset.id=id;



}
const applyHandler=(event)=>{
    const id=event.target.dataset.id;
    const todo=todos.find((todo)=>todo.id==id);
    todo.task=todoInput.value;
    todo.date=dateInput.value;
    todoInput.value="";
    dateInput.value="";
    addButton.style.display="inline-block";
    editButton.style.display="none";
    saveToLocalStorage();
    displayTodos();
    showAlert("item edited succesfuly","success");

  
}
const filterHandler=(event)=>{
    let filteredToDos=null;
    const data=event.target.dataset.filter;
    switch (data) {
        case "pending":
            filteredToDos=todos.filter((todo)=>todo.completed===false);
            
            break;
            case "completed":
                filteredToDos=todos.filter((todo)=>todo.completed===true);
                
                break;

        default:
            filteredToDos=todos;
            break;
    }
    displayTodos(filteredToDos);
}


filters.forEach((filter)=>{
    filter.addEventListener("click",filterHandler);
});

window.addEventListener("load",()=>displayTodos());
addButton.addEventListener("click",addHandler);
deleteAll.addEventListener("click",deleteAllTodos);
editButton.addEventListener("click",applyHandler);