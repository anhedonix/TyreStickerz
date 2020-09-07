import store from '../../../src/functions/store'

export default (req, res) => {
  const {
    query: { path },
  } = req
  console.log(path)
  store
    .getFileUrl(path.join('/'))
    .then(url => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(`path: ${url}`)
    })
    .catch(err => {
      res.end(`error: ${err.msg}`)
    })
}
