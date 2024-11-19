const router = require('express').Router();;
const controller = require('../controllers/card.controller');


router.post('/cards', controller.createCard);
router.delete('/cards/:id', controller.deleteCard);
router.get('/cards', controller.getAllCards);
router.get('/cards/:id', controller.getSingleCard);
router.put('/cards/:id', controller.updateCard);

module.exports = router;