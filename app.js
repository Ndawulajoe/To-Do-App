
let inputValues = document.querySelector("input");
let btn = document.querySelector("button");
let resultsRender = document.querySelector(".second");
let body = document.querySelector('body');
let editForm =''

btn.addEventListener("click", () => {
  let value = inputValues.value;
  inputValues.value = "";

  renderFunction(value);
  
  function storeData() {
    // let data=JSON.stringify(value);
    // localStorage.setItem('value',data)
    let data = localStorage.getItem("data");
    let dataArr = [];

    if (data) {
      dataArr = JSON.parse(data);
    }

    dataArr.push(value);

    localStorage.setItem("data", JSON.stringify(dataArr));
  }

  storeData();
});

function renderFunction(value) {
  let res = document.createElement("li");
  let edit = document.createElement('button');
  let deleteBtn = document.createElement("button");
  let divButtons=document.createElement('div')
  edit.innerHTML = '<i class="fas fa-edit"></i>';
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>'
  edit.classList.add('editBtn');
  deleteBtn.classList.add("deleteBtn");

divButtons.classList.add('divButtons')
  
  
  

  
  res.textContent = value;
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
    
    if (editForm) {
      editForm.remove(); 
    }
    let listItem = e.target.closest('li').innerText

  console.log(listItem)
    let form = document.createElement('form');
    form.classList.add('form');
    let editInput = document.createElement('input');
    
      editInput.setAttribute('placeholder', `${listItem}`);
    
    
    let editButton = document.createElement('button');
    editButton.textContent = 'Update';
    form.appendChild(editInput);
    form.appendChild(editButton);
    body.appendChild(form);

    editForm = form; 

    form.addEventListener('submit', (e) => {
      // e.preventDefault();
      let newInput = editInput.value;
      let data = JSON.parse(localStorage.getItem('data'));
      for (let i = 0; i < data.length; i++) {
        if (data[i] === value) {
          if (newInput) {
            data[i] = newInput;
            res.textContent = newInput;
             res.appendChild(edit);
              res.appendChild(deleteBtn);
            localStorage.setItem('data', JSON.stringify(data));
          }
        }
      }
      form.remove(); 
      editForm = null; 
    });
  });
}

function deleteItem(value) {
  let data = JSON.parse(localStorage.getItem("data"));
  for (let i = 0; i < data.length; i++) {
    if (data[i] === value) {
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