if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
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
    console.log(addTaskButton);
    let buttonTaskAdd = addTaskButton[0];
        buttonTaskAdd.addEventListener('click', function (event) {
        let title = document.getElementById('inputTitleTask').value;
        let date = document.getElementById('inputDate').value;
        let description = document.getElementById('inputDescriptionTask').value;
        console.log(title, date, description);
        addTaskRow(title, date, description);
    })
}

function addTaskRow(title,date,description) {
    let taskRow = document.createElement('div');
    taskRow.classList.add('list-group');
    let taskItems = document.getElementsByClassName('tasks')[0];
    let taskRowContents = `
        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
         <div class="d-flex w-100 justify-content-between">
             <h5 class="mb-1">${title}</h5>
             <small class="text-muted">${date}</small>
         </div>
         <div class="d-flex w-100 justify-content-between">
             <p class="mb-1">${description}</p>
             <button  class="btn btn-danger btn-sm">Delete task</button>
         </div>
        </a>
    `;
    taskRow.innerHTML = taskRowContents;
    taskItems.append(taskRow);
    taskRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeTaskItem)

}

function removeTaskItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
}




