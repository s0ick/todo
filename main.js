'use strict';

let add = document.querySelector('#add'),
    todo = document.querySelector('#todo'),
    todoItem = document.querySelectorAll('.todo-item'),
    completed = document.querySelector('#completed'),
    todoComplete = document.querySelectorAll('.todo-complete'),
    todoRemove = document.querySelectorAll('.todo-remove'),
    headerInput = document.querySelector('.header-input');     

const setLocale = function(text, state){
  localStorage.setItem(text, state);
};

const createElem = function(value, state) {
  let li = document.createElement('li'),
      div = document.createElement('div'),
      btnRemove = document.createElement('button'),
      btnComplete = document.createElement('button');
  li.classList.add('todo-item');
  div.classList.add('todo-buttons');
  btnRemove.classList.add('todo-remove');
  btnComplete.classList.add('todo-complete');

  if(value !== '' && value !== undefined) {
    li.textContent = value;
  } else {
    li.textContent = headerInput.value;
  }
  if(state) {
    completed.prepend(li);
  } else {
    todo.prepend(li);
    setLocale(li.textContent, 'Не готов');
  }

  li.append(div);
  div.append(btnRemove);
  div.append(btnComplete);
  todoComplete = document.querySelectorAll('.todo-complete');
  todoRemove = document.querySelectorAll('.todo-remove');
};

const bruteButton = function(){
  todoComplete.forEach(function(item){
    item.onclick = function(event){
      let curUl = event.target.closest('ul'),
          curLi = event.target.closest('li');   
      if(curUl === completed) {
        todo.appendChild(curLi);
        setLocale(curLi.textContent, 'Не готов');
      } else {
        completed.appendChild(curLi);
        setLocale(curLi.textContent, 'Готов');
      }
    };
  });

  todoRemove.forEach(function(item){
    item.addEventListener('click', function(event){
      event.target.closest('li').remove();
    });
  });
};

add.addEventListener('click', function(event){
  event.preventDefault();
  if(headerInput.value.trim() !== ''){
    event.preventDefault();
    createElem();
    bruteButton();
    headerInput.value = '';
  }
});

headerInput.addEventListener('input', function(){
  event.preventDefault();
});

const getLocale = function() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i),
        value = localStorage[key];
    if(value === 'Не готов'){
      createElem(key, 0);
      bruteButton();
    } else {
      createElem(key, 1);
      bruteButton();
    }
  }
};
   
getLocale();