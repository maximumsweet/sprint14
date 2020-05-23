const userModel = require('../models/user');

module.exports.getUsers = (req, res) => {
  userModel.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  userModel.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  userModel.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => ((err.name === 'ValidationError') ? res.status(400).send({ message: err.message }) : res.status(500).send({ message: 'Произошла ошибка' })));
};
