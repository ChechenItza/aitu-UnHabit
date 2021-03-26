const info = (...messages) => {
  console.log(messages)
}

const error = (...messages) => {
  console.error(messages)
}

const log = (...messages) => {
  console.log(messages)
}

module.exports = { info, error, log }