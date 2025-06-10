// TODO LIST 기능 구현
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

function saveTodos() {
  const todos = [];
  document.querySelectorAll('.todo-item').forEach(li => {
    const text = li.querySelector('.todo-text').textContent;
    const checked = li.querySelector('.todo-text').classList.contains('checked');
    todos.push({ text, checked });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos') || '[]');
  todos.forEach(todo => {
    const li = createTodoItem(todo.text);
    if (todo.checked) {
      li.querySelector('.todo-text').classList.add('checked');
      li.classList.add('checked');
    }
    todoList.appendChild(li);
  });
}

function createTodoItem(text) {
  const li = document.createElement('li');
  li.className = 'todo-item';

  const span = document.createElement('span');
  span.textContent = text;
  span.className = 'todo-text';

  // 체크 상태 변수
  let checked = false;
  span.onclick = function() {
    checked = !checked;
    span.classList.toggle('checked', checked);
    li.classList.toggle('checked', checked);
    saveTodos();
  };

  const delBtn = document.createElement('button');
  delBtn.textContent = '삭제';
  delBtn.className = 'delete-btn';
  delBtn.onclick = () => {
    li.remove();
    saveTodos();
  };

  li.appendChild(span);
  li.appendChild(delBtn);
  return li;
}

todoForm.onsubmit = function(e) {
  e.preventDefault();
  const value = todoInput.value.trim();
  if (value) {
    todoList.appendChild(createTodoItem(value));
    todoInput.value = '';
    todoInput.focus();
    saveTodos();
  }
};

// 페이지 로드 시 기존 todo 불러오기
loadTodos();