const getAll = () => {
  // DO YOUR MAGIC
  db('accounts');
}

const getById = id => {
  // DO YOUR MAGIC
  db('accounts').where('id',id);
}

const create = account => {
  // DO YOUR MAGIC
  db('accounts').insert(account);
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
  db('accounts').where('id',id).update(account);
}

const deleteById = id => {
  // DO YOUR MAGIC
  db('accounts').where('id',id).delete();
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
