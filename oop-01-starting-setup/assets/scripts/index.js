const course = {
  title: 'Js complete guide',
  rate: 5
}

// console.log(course)

Object.setPrototypeOf(course, {
  ...Object.getPrototypeOf(course),
  printRating: function() {
    console.log(`${this.rate}/5`)
  }
})

console.log(course)

course.printRating()
