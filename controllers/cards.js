const cardModel = require('../models/card');

module.exports.getCards = (req, res) => {
  cardModel.find({})
    .populate('card')
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => res.status(404).send({ message: 'Карточка не найдена' }));
};

module.exports.createCard = (req, res) => {
  console.log(req.user._id);

  const { name, link } = req.body;
  cardModel.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => ((err.name === 'ValidationError') ? res.status(400).send({ message: err.message }) : res.status(500).send({ message: 'Произошла ошибка' })));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  cardModel.findById(cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Нет карточки с таким id' });
      } else if (card.owner.toString() !== req.user._id) {
        res.status(401).send({ message: 'Невозможно удалить чужую карточку' });
      } else {
        cardModel.findByIdAndRemove(cardId)
          .then(() => res.status(200).send({ remove: card }))
          .catch(() => res.status(500).send({ message: 'Ошибка' }));
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
