
let inputValues = document.querySelector("input");
let btn = document.querySelector("button");
let resultsRender = document.querySelector(".second");
let body=document.querySelector('body')
btn.addEventListener("click", () => {
  let value = inputValues.value;
  inputValues.value = "";

  renderFunction(value);

  function storeData() {
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
  let edit = document.createElement('button');
  edit.classList.add('editBtn');
  edit.innerText = 'edit';

  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.innerHTML = "del";

  let res = document.createElement("li");
  res.textContent = value;
  res.appendChild(edit);
  res.appendChild(deleteBtn);
  resultsRender.appendChild(res);

  deleteBtn.addEventListener('click', () => {
    deleteItem(value);
    res.remove();
  });

  edit.addEventListener('click', () => {
  let form =document.createElement('form')
  form.classList.add('form')
  let editInput=document.createElement('input')
  editInput.setAttribute('placeholder', 'Enter New Word ...')
  let editButton=document.createElement('button')
  editButton.textContent = 'Update';
    form.appendChild(editInput);
    form.appendChild(editButton);
    body.appendChild(form)


    
form.addEventListener('submit',(e)=>{
    // e.preventDefault()
    let newInput=editInput.value;
   let data=JSON.parse(localStorage.getItem('data'))
   for(let i=0;i<data.length;i++){
if(data[i]===value){
    if(newInput){
        data[i]=newInput;
        res.textContent=newInput;
        localStorage.setItem('data',JSON.stringify(data))
    }
}
   }
})

  });
}

function deleteItem(value) {
  let data = JSON.parse(localStorage.getItem("data"));
  for (let i = 0; i < data.length; i++) {
    if (data[i] === value) {
      data.splice(i, 1);
      break;
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



