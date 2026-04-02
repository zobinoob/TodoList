// select Dom elements
const input = document.getElementById('todo-input')
const addBtn = document.getElementById('add-btn')
const list = document.getElementById('todo-list')

//try to load saved todos from localstorage (if any)
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function saveTodos(){
    //save current todos array to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
}

//create a DOM node for a todo object and append it to the list 
function createTodoNode(todo, index){
    const li=document.createElement('li');

    //checkbox to toggle completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", ()=> {
        todo.completed = checkbox.checked;

        //TODO: visual feedback: strike-through when completed
        textSpan.style.textDecoration= todo.completed ? 'line-through': "";
        saveTodos();
    })

    //TEXT of the todo
    const textSpan = document.createElement("span");
    textSpan.textContent=todo.text;
    textSpan.style.margin = '0 8px';

    if(todo.completed){
        textSpan.style.textDecoration='line-through';
    }
        //add double-click event listener to edit todo
        textSpan.addEventListener("dblclick", ()=> {
            const newText = prompt("Edit todo", todo.text);
            if(newText !== null){
                todo.text = newText.trim()
                textSpan.textContent= todo.text;
                saveTodos();
            }
        } )

        //Delete todo btn
        const delBtn = document.createElement('button');
        delBtn.textContent = "Delete";
        delBtn.addEventListener('click', ()=> {
            todos.splice(index, 1);
            render();
            saveTodos();
        })

        //making the list appear in the right sequence
        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(delBtn);
        return li
    }


//render the whole todo list from todo arrays
function render(){
    list.innerHTML='';

    //recreate each item 
    todos.forEach((todo, index) => {
        const node= createTodoNode(todo, index);
        list.appendChild(node)  
    });
}

function addTodo(){
    const text = input.value.trim();
    if(!text){
        return 
    }

    //push a new todo object
    todos.push({text, completed: false});
    input.value = '';
    render()
    saveTodos()
}

addBtn.addEventListener("click", addTodo);
input.addEventListener ('keydown', (e)=>{
    if(e.key =='Enter'){
        addTodo();
    }
})
render();