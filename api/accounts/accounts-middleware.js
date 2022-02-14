const AccountsModel = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const {name, budget} = req.body;
  if(!name || !name.trim() || !budget || !Number(budget)){
    res.status(400).json({message: "name and budget are required"})
  }
  else if(name.trim().length < 3 || name.trim().length > 100){
    res.status(400).json({message: "name of account must be between 3 and 100"})
  }
  else if(Number(budget).isNaN()){
    res.status(400).json({message: "budget of account must be a number"})
  }
  else if(budget < 0 || budget > 1000000){
    res.status(400).json({message: "budget of account is too large or too small"})
  }
  else {
    req.name = name.trim()
    next()
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  const {name} = req.body
  const accounts = AccountsModel.getAll();

  const found = accounts.filter(account=> account.name === name.trim())
  
  if(found){
    res.status(400).json({message: "that name is taken"})
  }
  else{
    req.name = name.trim()
  }
}

exports.checkAccountId = async (req, res, next) => {
  try{
    const account = await AccountsModel.getById(req.params.id)
    if(!account){
      res.status(404).json({message: 'account not found'})
    }
    else{
      req.account = account;
      next()
    }
  }
  catch (err){
    res.status(500).json({message: 'problem finding account'})
  }
}
