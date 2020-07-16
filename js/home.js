let addtaskinput = document.getElementById('addtaskinput');
let addtaskbtn = document.getElementById('addtaskbtn');
let savetaskbtn = document.getElementById('savetaskbtn');
let saveindex = document.getElementById("saveindex");
let addedtasklist = document.getElementById('addedtasklist');
let deletetaskbtn = document.getElementById('deletetaskbtn');
let edit = document.getElementById('edit');
showtask();

// ADD BUTTON EVENT
addtaskbtn.addEventListener("click", function(){
    addtaskinputval = addtaskinput.value;
    
    if(addtaskinputval.trim() != 0){
        let webdata = localStorage.getItem("todos");
        if (webdata == null ){
            task = [];
        }
        else{
            task = JSON.parse(webdata);
        }  
        task.push(addtaskinputval);
        localStorage.setItem("todos", JSON.stringify(task)); 
        addtaskinput.value = '';
    }
    
    showtask();
})

// show data
function showtask(){
    addtaskinputval = addtaskinput.value;
    let webdata = localStorage.getItem("todos");
    if (webdata == null ){
        task = []
    }else{
        task = JSON.parse(webdata)
    }
    let html = '';
    
    task.forEach((item, index) => {
        html += 
        `<tr>
            <th scope="row">${index+1}</th>
            <td class="text-white">${item}</td>
            <td>
                <button type="button" style="display: block;" onclick="edittask(${index})" class="text-primary" id="edit">
                    <i class="fa fa-edit"></i>Edit
                </button>
            </td>
            <td>
                <button type="button" onclick="completetask(${index})" class="text-success"  >
                 <i class="fa fa-check-square-o"></i>Complete
                </button>
            </td>
            <td>
                <button type="button" onclick="deleteitem(${index})" class="text-danger">
                    <i class="fa fa-trash"></i>Delete
                </button>
            </td>
        </tr>`;
        
    });
    addedtasklist.innerHTML = html;
}

//complete task
function completetask(index){
    let webdata = localStorage.getItem("todos");
    let task = JSON.parse(webdata);
    task[index] = '<span style="text-decoration:line-through">' + task[index] + '</span>';
    

    localStorage.setItem("todos", JSON.stringify(task));
    edit.style.display = "none";
    showtask();
    
}

// editTask
function edittask(index){
    saveindex.value = index;
    let webdata = localStorage.getItem("todos");
    let task = JSON.parse(webdata);
    addtaskinput.value = task[index];
    addtaskbtn.style.display="none";
    savetaskbtn.style.display = "block";
}

// savetask
savetaskbtn.addEventListener("click", function(){
    let webdata = localStorage.getItem("todos");
    let task  = JSON.parse(webdata);
    let saveindex = document.getElementById("saveindex").value;
    task[saveindex] = addtaskinput.value;
    localStorage.setItem('todos', JSON.stringify(task));
    addtaskbtn.style.display="block";
    savetaskbtn.style.display = "none";
    addtaskinput.value = '';
    showtask();
})

// deleteall data
deletetaskbtn.addEventListener('click', function(){
    let webdata = localStorage.getItem("todos");
    let task = JSON.parse(webdata);
    localStorage.clear(task);
})

// delete single data
function deleteitem(index){
    let webdata = localStorage.getItem("todos");
    let task = JSON.parse(webdata);
    task.splice(index, 1)
    localStorage.setItem("todos", JSON.stringify(task));
    showtask()
}

