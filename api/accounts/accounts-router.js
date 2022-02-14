const AccountsModel = require('./accounts-model')
const router = require('express').Router()
const {checkAccountPayload, checkAccountNameUnique, checkAccountId} = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  AccountsModel.getAll()
    .then(accounts => {
      res.json(accounts)
    })
    .catch(next)
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.json(req.account);
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const newAccount = await AccountsModel.create({
      name: req.body.name.trim(),
      budget: req.body.budget
    })
    res.status(201).json(newAccount);
  }
  catch (err){
    next()
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  const updated = await AccountsModel.updateById(req.params.id, req.body)
  res.json(updated)
  next()
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try{
    await AccountsModel.deleteById(req.params.id)
    res.json(req.account)
  }
  catch(err){
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;
