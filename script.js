// Função que irá salvar a atividade
function saveActivity(event) {
  // Previne o comportamento padrão do formulário de recarregar a página
  event.preventDefault()

  // Pega os dados do formulário
  const form = new FormData(event.target)
  const activity = form.get('activity')
  const day = form.get('day')
  const time = form.get('time')

  // Gera um ID único para a nova atividade
  const id = `${activity}-${day}-${time}`

  // Cria um objeto com os dados da atividade
  const activityData = {
    id,
    activity,
    day,
    time
  }

  // Salva os dados no localStorage
  saveToLocalStorage(activityData)

  // Adiciona a atividade na lista
  addActivityToList(activityData)

  // Limpa o formulário
  event.target.reset()
}

// Função que irá salvar os dados no localStorage
function saveToLocalStorage(activityData) {
  // Pega as atividades do localStorage
  const activities = JSON.parse(localStorage.getItem('activities')) || []

  // Adiciona a nova atividade
  activities.push(activityData)

  // Salva de volta no localStorage
  localStorage.setItem('activities', JSON.stringify(activities))
}

// Função que irá adicionar a atividade na lista
function addActivityToList(activityData) {
  // Criando os elementos
  const section = document.querySelector('main section')
  const card = document.createElement('div')
  const cardTime = document.createElement('div')
  const cardActivity = document.createElement('div')

  // Adicionando as classes
  card.classList.add('card')
  cardTime.classList.add('card-time')
  cardActivity.classList.add('card-activity')

  // Adicionando os dados
  cardTime.textContent = `${activityData.day} - ${activityData.time}`
  cardActivity.textContent = activityData.activity

  // Adicionando os elementos no card
  card.appendChild(cardTime)
  card.appendChild(cardActivity)

  // Adicionando o card na seção
  section.appendChild(card)
}

// Função que irá carregar as atividades do localStorage
function loadActivities() {
  // Pega as atividades do localStorage
  const activities = JSON.parse(localStorage.getItem('activities')) || []

  // Adicionando cada atividade na lista
  activities.forEach(addActivityToList)
}

// Carregando as atividades quando a página carrega
window.onload = loadActivities