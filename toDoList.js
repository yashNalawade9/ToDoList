

// variable declaration 


const addTask = document.querySelector("#addTask");
const textInput = document.querySelector("#textInput");
const task = document.querySelector(".task");
const greeting = document.getElementById('greeting');
const day = document.getElementById('date');
const displayTask = document.getElementById('numOfTask');

let count = 0;

// for setting up of date and greeting
let date = new Date();
let hour = date.getHours();
if(hour<=12){
    greeting.innerHTML = `Good Morning`;
}
else if (hour >12 && hour<17) {
    greeting.innerHTML =`Good Afternoon`;
} 
else {
    greeting.innerHTML = `Good Evening`;
}



const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[date.getMonth()];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const d = days[date.getDay()];
day.innerHTML = `${d} ${month} ${date.getDate()}`;


// functions declaration

// deleting of task
function deleteTask(btn){
    const taskText = btn.parentNode.parentNode.querySelector("p").textContent;
    btn.parentNode.parentNode.remove();
    removeFromLocalStorage(taskText);
}


// competing of task
function toggleComplete(btn) {
    const taskCard = btn.parentNode.parentNode;
    taskCard.classList.toggle('completed');

}

// to save the created task to the local storage
const LocalSave = (newTask) =>{
    let tasks ;
    if(localStorage.getItem("tasks") === null){
        tasks =[];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(newTask)
    // console.log(tasks);
    localStorage.setItem("tasks",JSON.stringify(tasks));

}




// for loading all the tassk saved in the local storage onloading the page

const fromLocal = ()=>{
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks =[];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.forEach(e =>{
            const taskCard = `<div class ="card">
            <p>${e}</p>
            <div class= "btnSection">
            <button class ="completeBtn"><i class="fa-solid fa-check"></i>COMPLETED</button>
            <button class ="deleteBtn"><i class="fa-solid fa-trash"></i>DELETE</button>
            </div>
            </div>`
            task.insertAdjacentHTML("beforeend",taskCard);
            const deleteBtn = document.querySelectorAll('.deleteBtn');
            // const completeBtn = document.querySelectorAll('.completeBtn');
            
            deleteBtn.forEach((btn) =>{
                btn.addEventListener('click',()=>{
                    deleteTask(btn);
                })
            })

            const completeBtn = task.lastElementChild.querySelector('.completeBtn');
            completeBtn.addEventListener('click', () => {
            toggleComplete(completeBtn);
    });

        })
    }
}



// for deleting the task from the local storage after delete function is called


function removeFromLocalStorage(taskText) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
  

    const taskIndex = tasks.indexOf(taskText);

    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
    }
  
    localStorage.setItem("tasks", JSON.stringify(tasks));
}  



//creating of task card
function createTask(newTask){
    const taskCard = `<div class ="card">
    <p>${newTask}</p>
    <div class= "btnSection">
    <button class ="completeBtn">COMPLETED</button>
    <button class ="deleteBtn">DELETE</button>
    </div>
    </div>`
    task.insertAdjacentHTML("beforeend",taskCard);
    const deleteBtn = document.querySelectorAll('.deleteBtn');
    

    //calling of delete function on click
    deleteBtn.forEach((btn) =>{
        btn.addEventListener('click',()=>{
            deleteTask(btn);
        })
    })

    //calling of complete function on click
    const completeBtn = task.lastElementChild.querySelector('.completeBtn');
    completeBtn.addEventListener('click', () => {
        toggleComplete(completeBtn);
    });


    LocalSave(newTask);
}






// calling of the functions 


//calling function to load previous task from the local storage
document.addEventListener('DOMContentLoaded',fromLocal);



//calling the function to create a task
addTask.addEventListener('click',()=>{

    const newTask = textInput.value.trim();
    if(newTask == ""){
        alert("add new task");
        textInput.value = "";
    }
    else{
        createTask(newTask);
        textInput.value = "";   
    }
})