const Add = document.getElementById('add');
const btnText = Add.innerText;
const todoInput = document.getElementById('todo-input');
const records = document.getElementById('records');
let todos = [];
let editInput = null;

let objStr = localStorage.getItem('tasks');
if (objStr != null){
    todos = JSON.parse(objStr);
}

DisplayInfo();

Add.addEventListener('click', (e) => {
    const task = todoInput.value;
    if (editInput!=null){
        //edit
        todos.splice(editInput, 1, {name: task});
        editInput = null;
    }else{
        //insert  
        const Task = {name: task}
        todos.push(Task);
    }
    e.preventDefault();
    console.log(todos);
    SaveInfo(todos);
    todoInput.value = '';
    DisplayInfo();
    Add.innerText = btnText;
})

function SaveInfo(array){
    let string = JSON.stringify(array);
    localStorage.setItem('tasks', string);
}
function DisplayInfo(){
    let statement = '';
    todos.forEach((todo,i) => {
        statement += `<tr>
        <th scope="row">${i+1}</th>
        <td>${todo.name}</td>
        <td><i class="btn btn-primary" id = "delete" onClick = 'DeleteInfo(${i})' >Delete</i> <i class="btn btn-primary" id = "edit" onClick = 'EditInfo(${i})'>Edit</i></td>
      </tr>`
    });
    records.innerHTML = statement;
}
function EditInfo(id){
   editInput = id;
   todoInput.value = todos[id].name;
   Add.innerText = 'Save Edit';
}
function DeleteInfo(id){
    
    todos.splice(id, 1);
    SaveInfo(todos);
    DisplayInfo();
}