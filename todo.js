const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];
/*중간에 값이 변화하므로 let값을 준다. */

function setIdOfToDos() {
  const len = toDos.length;
  for (let i = 0; i < len; i++) {
    toDos[i].id = i + 1;
  }
}

function deleteTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  /*필터는 모든 요소를 다 훑어보는 역할을 한다. forEach와 비슷 */
  /*toDo.id는 숫자, li.id는 String임에 주의! 따라서 변환해야한다.
  parseInt는 String을 Int로 변환해준다.*/
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const create_li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerHTML = "X";
  delBtn.addEventListener("click", deleteTodo);
  const create_span = document.createElement("span");
  const newId = toDos.length + 1;
  create_span.innerText = text;
  create_li.appendChild(create_span);
  create_li.appendChild(delBtn);
  toDoList.appendChild(create_li);
  create_li.id = newId;
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  setIdOfToDos();
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
