if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
// let task = new Object()
class Task {
    constructor(id, title, date, description) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.description = description;
    }


    edit(){

    }


    save(){
        tasks.push(this)
    }
}

let unicTaskId = 0;
const tasks = [];

// let task10 = new Task(10,'task10','07.05.2020','Description on 10 task');
// task10.save();
console.log(tasks);


function ready(){
    let txt = '{"title":"Task 3", "date":"27.04.2020", "description":"Task 3 description. Very important task. Inported from JSON"}'
    var obj = JSON.parse(txt);

    let removeTaskItemButtons = document.getElementsByClassName('btn-danger');
    // console.log(removeTaskItemButtons);
    for(let i = 0; i < removeTaskItemButtons.length; i++ ){
        let button = removeTaskItemButtons[i];
        button.addEventListener('click', removeTaskItem)
    }

    let addTaskButton = document.getElementsByClassName('btn-primary');
    //console.log(addTaskButton);
    let buttonTaskAdd = addTaskButton[0];
        buttonTaskAdd.addEventListener('click', function (event) {
        let title = document.getElementById('inputTitleTask').value;
        let date = document.getElementById('inputDate').value;
        let description = document.getElementById('inputDescriptionTask').value;
        let id = getId();
        //console.log(title, date, description);
        if(!title || !description || !date){
            return;
        }
        addTaskRow(id,title, date, description);
        new Task(id,title,date,description).save();
        console.log(tasks);
    })
}

function getId() {
    return ++unicTaskId;
    }

function addTaskRow(id,title,date,description) {
    let taskRow = document.createElement('div');
    taskRow.classList.add('list-group');
    let taskItems = document.getElementsByClassName('tasks')[0];
    let taskRowContents = `
        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
         <div class="d-flex w-100 justify-content-between">
             <h5 class="mb-1 title">${title}</h5>
             <small class="text-muted">${date}</small>
             <small class="task-id">${id}</small>
             
         </div>
         <div class="d-flex w-100 justify-content-between">
             <p class="mb-1 description">${description}</p>
             <div class="settings">
             <span class="set"><button  class="btn btn-warning btn-sm">Edit task</button></span>
             <button  class="btn btn-danger btn-sm">Delete task</button>
             </div>
         </div>
        </a>
    `;
    taskRow.innerHTML = taskRowContents;
    taskItems.append(taskRow);
    taskRow.getElementsByClassName('btn-danger')[0].addEventListener('click',  ()=>{
        for(let i = 0; i < tasks.length; i++ ){
            if(tasks[i]['id'] === id){
                tasks.splice(i,1);
             }
        }
        console.log(tasks);
    });
       taskRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeTaskItem);taskRow.getElementsByClassName('btn-warning')[0].addEventListener('click', ()=>{
       taskRow.getElementsByClassName('title')[0].innerHTML = `<input type="text" class="form-control edittitle"  placeholder="Title of Task" value="${title}">`;
       taskRow.getElementsByClassName('description')[0].innerHTML = `<input type="text" class="form-control edittask-descr"  placeholder="Task Description" value="${description}" >`;
       taskRow.getElementsByClassName('btn-warning')[0].setAttribute("hidden", true);
       taskRow.getElementsByClassName('set')[0].innerHTML = `<button  class="btn btn-primary btn-sm">Save task</button>`
       taskRow.getElementsByClassName('btn-primary')[0];
       // Сохраняю данные в форме по клику;
       taskRow.getElementsByClassName('btn-primary')[0].addEventListener('click', () => {
           let newTitle = taskRow.getElementsByClassName('edittitle')[0].value;
           let newDescription  = taskRow.getElementsByClassName('edittask-descr')[0].value;
           taskRow.getElementsByClassName('title')[0].innerHTML = `${newTitle}`;
           taskRow.getElementsByClassName('description')[0].innerHTML = `${newDescription}`;
           taskRow.getElementsByClassName('btn-primary')[0].setAttribute("hidden", true);
           taskRow.getElementsByClassName('set')[0].innerHTML = `<button  class="btn btn-warning btn-sm">Edit task</button>`
       });

   });


    function taskDelete(id){
        for(let i = 0; i < tasks.length; i++ ){
            if(tasks[i]['id'] === id){
                tasks[i].delete();
            }
        }
    }

}

function removeTaskItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.parentElement.remove();
    // console.log(tasks);
}
function editTaskItem(event) {
     let buttonClicked = event.target;
     let title = document.getElementsByClassName('mb-1')[0].innerHTML = `<input type="text" class="form-control title" id="inputTitleTask" placeholder="Title of Task" value>`;
     console.log(title);
    // buttonClicked.parentElement.parentElement.remove();
    // console.log(tasks);
}





