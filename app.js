
let inputValues = document.querySelector("input");
let addBtn = document.querySelector("button");
let resultsRender = document.querySelector(".tasks");
let body = document.querySelector('body');

let container=document.querySelector('.box')

let editForm =null

addBtn.addEventListener("click", () => {
  let task = inputValues.value;
  inputValues.value = "";

  renderFunction(task);
  
  function storeData() {
    // let data=JSON.stringify(value);
    // localStorage.setItem('value',data)
    let data = localStorage.getItem("data");
    let dataArr = [];

    if (data) {
      dataArr = JSON.parse(data);
    }

    dataArr.push(task);

    localStorage.setItem("data", JSON.stringify(dataArr));
  }

  storeData();
});

function renderFunction(task) {
  let res = document.createElement("li");
  let edit = document.createElement('button');
  let deleteBtn = document.createElement("button");
  let divButtons=document.createElement('div')
  edit.innerHTML = '<i class="fas fa-edit"></i>';
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>'
  edit.classList.add('editBtn');
  deleteBtn.classList.add("deleteBtn");

divButtons.classList.add('divButton')

  res.textContent = task;
  divButtons.appendChild(edit)
  divButtons.appendChild(deleteBtn)
  // res.appendChild(edit);
  // res.appendChild(deleteBtn);
  res.appendChild(divButtons)
  resultsRender.appendChild(res);

  deleteBtn.addEventListener('click', () => {
    deleteItem(value);
    res.remove();
  });

  edit.addEventListener('click', (e) => {
    let form = document.createElement('form');
    if (editForm) {
      editForm.remove(); 
    }
    let listItem = e.target.closest('li').innerText

 
    
    form.classList.add('form');
    
    let editInput = document.createElement('input');
    
      editInput.setAttribute('placeholder', `${listItem}`);
    
    
    let editButton = document.createElement('button');
    editButton.classList.add('update-btn')
    editButton.textContent = 'Update';
    form.appendChild(editInput);
    form.appendChild(editButton);
    container.appendChild(form);
    // body.appendChild(form)


    editForm = form; 

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let newInput = editInput.value;
      let data = JSON.parse(localStorage.getItem('data'));
      for (let i = 0; i < data.length; i++) {
        if (data[i] === task) {
          if (newInput) {
            data[i] = newInput;
            res.textContent = newInput;
             res.appendChild(edit);
              res.appendChild(deleteBtn);
            localStorage.setItem('data', JSON.stringify(data));
          }
        }
      }
      // form.remove(); 
      // editForm = null; 
    });
  });
}

function deleteItem(task) {
  let data = JSON.parse(localStorage.getItem("data"));
  for (let i = 0; i < data.length; i++) {
    if (data[i] === task) {
      data.splice(i, 1);
    }
  }
  localStorage.setItem("data", JSON.stringify(data));
}

function afterRefresh() {
  let data = JSON.parse(localStorage.getItem("data"));
  if (data) {
    for (let item of data) {
      renderFunction(item);
    }
  }
}

afterRefresh();


