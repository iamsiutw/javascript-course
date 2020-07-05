const addMovieBtn = document.getElementById('add-movie-btn')
const searchBtn = document.getElementById('search-btn')

const movies = []

const renderMovies = (filter = '') => {
  const movieList = document.getElementById('movie-list')

  if (movies === 0) {
    movieList.classList.remove('visible')
  } else {
    movieList.classList.add('visible')
  }

  movieList.innerHTML = ''

  const filterMovie = !filter ?
    movies :
    movies.filter(movie => movie.info.title.includes(filter))

  filterMovie.forEach(movie => {
    const movieItem = document.createElement('li')
    const { info, ...otherProp } = movie
    const { title: movieTitle } = info
    let { getFormatedTitle } = movie
    // getFormatedTitle = getFormatedTitle.bind(movie)
    let text = getFormatedTitle.call(movie) + ' - '
    for (const key in info) {
      if (key !== 'title') {
        text = text + `${key}: ${info[key]}`
      }
    }
    movieItem.textContent = text
    movieList.appendChild(movieItem)
  })
}

const addMovie = () => {
  const title = document.getElementById('title').value
  const extraName = document.getElementById('extra-name').value
  const extraValue = document.getElementById('extra-value').value

  if (
    title.trim() === '' ||
    extraName.trim() === '' ||
    extraValue.trim() === ''
  ) {
    return
  }

  const newMovie = {
    info: {
      set title(val) {
        console.log(val)
        this._title = val
      },
      get title() {
        return this._title
      },
      [extraName]: extraValue
    },
    getFormatedTitle() {
      return this.info.title.toUpperCase()
    }
  }
  newMovie.info.title = title
  movies.push(newMovie)
  renderMovies()
}

const searchMovieHandler = () => {
  const titleText = document.getElementById('filter-title').value
  renderMovies(titleText)
}

addMovieBtn.addEventListener('click', addMovie)
searchBtn.addEventListener('click', searchMovieHandler)
