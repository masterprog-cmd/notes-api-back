const logger = (request, response, next) => {
  console.log(request.path)
  next()
}

module.exports = logger