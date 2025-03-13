const tbody = document.querySelector('tbody')
const input = document.querySelector('input')
const form = document.querySelector('.form')
//Function search dates
const fetchAPI = async() => {
    const response = await fetch('http://localhost:3000/tasks')
    const responseJson = await response.json()
    return responseJson;
}

const formatDate = (dateUtc) => {
    const options = { dateStyle: 'long', timeStyle: 'short' }
    const date = new Date(dateUtc).toLocaleString('pt-br', options)
    return date
}

//Function create element
function createElement(element, text = '', textHtml = ''){
    const elemented = document.createElement(element)
    if(text){
        elemented.innerText = text
    }

    if(textHtml){
        elemented.innerHTML = textHtml
    }

    return elemented;
}

//Funtion create select
const createSelect = (textSelect) => {
    const options = `   
    <option value="Pendente" selected>Pendente</option>
    <option value="Andamento">Em andamento</option>
    <option value="Resolvida">Resolvida</option>
    `
    
    const select = createElement('select', '', options)
    
    select.classList.add('select-status')

    select.value = textSelect
    
    return select
}

//Function create line and elements inside
const createRow = (tasks) => {
    const { id_user, title_user, created_user, status_user} = tasks

    //Cria uma nova linha na tabela
    const tr = createElement('tr')

    //Cria uma nova tarefa na linha
    const tdTitle = createElement('td', title_user) 
    const editForm = createElement('form')
    const editInput= createElement('input')
     
    editInput.value = title_user
    editForm.appendChild(editInput)
    editInput.classList.add('input-edit')

    editForm.addEventListener('submit', (event) => {
        event.preventDefault()

        updateTask({ id_user, title_user: editInput.value, status_user})
    })

    //Cria nova data na linha
    const tdData = createElement('td', formatDate(created_user))

    //Cria novo select na linha
    const tdSelect = createElement('td')
    const select = createSelect(status_user)

    select.addEventListener('change', ({target}) => updateTask({ ...tasks, status_user: target.value}))
 
    //Cria novas ações na linha e botões
    const tdActions = createElement('td')

    const editButton = createElement('button', '', ' <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>')
    const deleteButton = createElement('button', '', '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>')

    editButton.classList.add('btn-action')
    deleteButton.classList.add('btn-action')

    deleteButton.addEventListener('click', () => {removeTask(id_user)})
    editButton.addEventListener('click', () => {
        tdTitle.innerText = ''
        tdTitle.appendChild(editForm)
    })

    tbody.appendChild(tr)
    tr.appendChild(tdTitle)
    tr.appendChild(tdData)
    tr.appendChild(tdSelect)
    tdSelect.appendChild(select)
    tr.appendChild(tdActions)
    tdActions.appendChild(editButton)
    tdActions.appendChild(deleteButton)

    return tr
}

const addTask = async (event) => {
    event.preventDefault()

    const task = { title: input.value }

    await fetch('http://localhost:3000/tasks', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    })

    loadTasks()
    input.value = ''
}

const removeTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'delete'
    })
    loadTasks()
}

const updateTask = async ({ id_user, title_user, status_user}) => {
    console.log(id_user, title_user, status_user)

    await fetch(`http://localhost:3000/tasks/${id_user}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title_user, status: status_user })
    })

    loadTasks()
}

//Function load dates on the page
const loadTasks = async () => {
    const tasks = await fetchAPI();

    tbody.innerHTML = ''

    await tasks.forEach((element) => {
        const tr = createRow(element)
        tbody.appendChild(tr)
    })
}

form.addEventListener('submit', addTask)

loadTasks()
