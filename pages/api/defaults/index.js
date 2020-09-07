// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Defaults from '../../../src/constants/contentTypes/defaults'

export default (req, res) => {
  res.statusCode = 200
  Defaults.read()
    .then(i => res.json(i))
    .catch(err => res.json(err))
}
