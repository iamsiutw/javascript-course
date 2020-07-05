const q_task_1 = document.querySelector('#task-1')
const g_task_1 = document.getElementById('task-1')

q_task_1.style.backgroundColor = 'black'
g_task_1.style.color = 'white'

const title_1 = document.querySelector('title')
// title_1.innerText = 'Assignment - Solved!'
const head = document.head
head.querySelector('title').textContent = "Assignment - Solved!"


const h1 = document.getElementsByTagName('h1')
for (let index = 0; index < h1.length; index++) {
  const element = h1[index];
  element.textContent = 'Assignment - Solved!'
}
