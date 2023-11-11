const ingredientServices = require('./ingredients.services')
const passport = require('passport')
const adminMiddleware = require('../middlewares/role.middleware')
const router = require('express').Router
require('../middlewares/auth.middleware')(passport)

router.route('/')
    .get(ingredientServices.getAllIngredients)
    .post(passport.authenticate('jwt', {session: false}),adminMiddleware,ingredientServices.createIngredient)

router.route('/:id')
    .get(ingredientServices.getIngredientById)
    .patch(passport.authenticate('jwt', {session: false}), adminMiddleware, ingredientServices.updateIngredient)
    .delete(passport.authenticate('jwt', {session: false}),adminMiddleware,ingredientServices.deleteIngredient)

module.exports = router

