module.exports = () => ({
  endpoint: process.env.DOCKER_HOST
    ? `${process.env.DOCKER_HOST.substring(6, process.env.DOCKER_HOST.length - 5)}:50052`
    : null
})