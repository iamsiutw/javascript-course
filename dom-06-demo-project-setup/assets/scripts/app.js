const d = document
const addModal = d.getElementById('add-modal')
const deleteMovieModal = d.getElementById('delete-modal')
const backdrop = d.getElementById('backdrop')
const entryText = d.getElementById('entry-text')

const addMovieBtn = d.querySelector('header button')
const cancelBtn = d.querySelector('.btn--passive')
const addBtn = cancelBtn.nextElementSibling

const userInput = addModal.getElementsByTagName('input')
const movies = []


const updateUI = () => {
  if (movies.length === 0) {
    entryText.style.display = 'block'
  } else {
    entryText.style.display = 'none'
  }
}

const renderNewMovieElement = (id, title, imgUrl, rating) => {
  const newMovieElement = d.createElement('li')
  newMovieElement.className = 'movie-element'
  newMovieElement.innerHTML = `
  <div class="movie-element__image">
    <img src="${imgUrl}" src="${title}" />
  </div>
  <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
  </div>
  `
  newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id))
  const listRoot = d.getElementById('movie-list')
  listRoot.append(newMovieElement)
}

const deleteMovieHandler = (id) => {
  deleteMovieModal.classList.add('visible')
  toggleBackdrop()
  const cancel = deleteMovieModal.querySelector('.btn--passive')
  let confirm = deleteMovieModal.querySelector('.btn--danger')

  confirm.replaceWith(confirm.cloneNode(true))

  confirm = deleteMovieModal.querySelector('.btn--danger')

  cancel.removeEventListener('click', closeMovieDeletion)

  cancel.addEventListener('click', closeMovieDeletion)
  confirm.addEventListener('click', deleteMovie.bind(null, id))
}

const closeMovieDeletion = () => {
  deleteMovieModal.classList.remove('visible')
  toggleBackdrop()
}

// 開關 backdrop
const toggleBackdrop = () => {
  backdrop.classList.toggle('visible')
}

const closeAddModal = () => {
  addModal.classList.remove('visible')
  clearUserInput()
}

const cancelAddModal = () => {
  closeAddModal()
  toggleBackdrop()
}

const showAddModal = () => {
  addModal.classList.add('visible')
  toggleBackdrop()
}

// 清除表單欄位
const clearUserInput = () => {
  for (input of userInput) {
    input.value = ''
  }
}

// 點擊 backdrop
const backdropClickHandler = () => {
  closeAddModal()
  closeMovieDeletion()
}

// 新增電影
const addMovieClickHandler = () => {
  const title = userInput[0].value
  const imageUrl = userInput[1].value
  const rating = userInput[2].value

  if (
    title.trim() === '' ||
    imageUrl.trim() === '' ||
    rating.trim() === '' ||
    +rating < 1 ||
    +rating > 5
  ) {
    alert('Please enter valid value.')
    return
  }

  const movie = {
    id: Math.random().toString(),
    title,
    imageUrl,
    rating
  }

  movies.push(movie)
  console.log(movies)
  closeAddModal()
  toggleBackdrop()
  renderNewMovieElement(movie.id, movie.title, movie.imageUrl, movie.rating)
  updateUI()
}

// 刪除電影
const deleteMovie = (id) => {
  let movieIndex = 0
  for (movie of movies) {
    if (movie.id === id) {
      break
    }
    movieIndex++
  }
  movies.splice(movieIndex, 1)
  const listRoot = d.getElementById('movie-list')
  listRoot.children[movieIndex].remove()
  closeMovieDeletion()
  updateUI()
}

addMovieBtn.addEventListener('click', showAddModal)
backdrop.addEventListener('click', backdropClickHandler)
cancelBtn.addEventListener('click', cancelAddModal)
addBtn.addEventListener('click', addMovieClickHandler)
