// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as CONTENT from '../../../src/constants/contentTypes'

const runner = async function (req, res) {
  return new Promise((resolve, reject) => {
    CONTENT.defaults
      .read()
      .then(i => {
        if (i) {
          if (i.env) {
            CONTENT.environment
              .read(i.env)
              .then(j => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.setHeader('Cache-Control', 'max-age=180000')
                res.end(JSON.stringify(j))
                resolve()
              })
              .catch(error => {
                console.log(error)
                res.json(error)
                res.status(405).end()
                resolve()
              })
          }
        }
      })
      .catch(error => {
        res.json(error)
        res.status(405).end()
        resolve()
      })
  })
}
export default runner
