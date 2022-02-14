const {checkAccountPayload, checkAccountNameUnique, checkAccountId} = require('./accounts-middleware')
const AccountsModel = require('./accounts-model')

const router = require('express').Router()

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  AccountsModel.getAll()
    .then(accounts => {
      res.json(accounts)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  next()
})

router.post('/', (req, res, next) => {
  next()
})

router.put('/:id', (req, res, next) => {
  next()
});

router.delete('/:id', (req, res, next) => {
  next()
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;
