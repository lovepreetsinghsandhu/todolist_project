const ls = window.localStorage;

const db_name = 'lovepreet_db';

let myownlist = [];
 
const add = document.getElementById("addTodo");

add.addEventListener('click',()=>
{
    
    const valuedata = document.getElementById("addTodoItem").value;
    if (valuedata !== "") 
    {
        let id = generate_key();
        create_structure(valuedata,id);
        set_todo_list(valuedata);
    }
    else
        alert('Please fill the value');

});

function create_structure(data, id) {
    
    let ol= document.getElementById('todoList');
    
    let li = document.createElement('li');

    li.textContent = data;
    
    li.setAttribute('id',id);
     
    let del = document.createElement('button');
    
    del.textContent = "DELETE";
    
    ol.appendChild(li).appendChild(del);

    del.onclick = function() {
        
        remove_from_todo_list(this.parentElement.getAttribute('id'));
        this.parentNode.remove();
        
    };
    li.onclick = function(){
        if( this.className == 'checked'){
            this.className='';
        }
        else
        {
             this.className='checked';
        }
    };
    
}

function set_todo_list(data) {
    let getlist = get_todo_list();
    
    if (getlist === null) {
        myownlist.push(data);
        ls.setItem(db_name,JSON.stringify(myownlist));
    } else {
        getlist.push(data);
        ls.setItem(db_name,JSON.stringify(getlist));
    }
}

function get_todo_list() {
    
    let list = JSON.parse(ls.getItem(db_name));
    return list;
    
}

function generate_key() {
    let key = 0;
    if (get_todo_list() !== null) {
        key = get_todo_list().length;
    } 
    return key;
}

function remove_from_todo_list(id) {
    
    let getlist = get_todo_list();
    myownlist=[];
    for (let i = 0; i < getlist.length; i++ ) {
        if(i != id )
        {
            myownlist.push(getlist[i]);
        }
    }
    
    ls.setItem(db_name,JSON.stringify(myownlist));
    //console.log(myownlist);
    show_todo_list();
    
}

function show_todo_list() {
    
    let ol= document.getElementById('todoList');
    ol.innerHTML="";
    
    let getlist = get_todo_list();
    
    if (getlist !== null) {
        for (let i = 0; i < getlist.length; i++ ) {
            create_structure(getlist[i],i);
        }
    }
    
}

show_todo_list();