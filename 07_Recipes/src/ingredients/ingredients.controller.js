const uuid = require('uuid')
const Ingredients = require('../models/ingredients.model')

const getAllIngredients = async() => {
    const data = await Ingredients.findAll();
    return data;
}

const getIngredientById = async(id) => {
    const data = await Ingredients.findOne({
        where: {
            id
        }
    })

    return data
}

const createIngredient = async(data) => {
    const response = await Ingredients.create({
        id: uuid.v4(),
        name: data.name,
        typeId: data.typeId,
        urlImage: data.urlImage
    })

    return response
}

const updateIngredient = async(id, data) => {
    const response = await Ingredients.update(data, {
        where: {
            id
        }
    })

    return response
}

const deleteIngredient = async(id) => {
    const data = await Ingredients.destroy({
        where: {
            id
        }
    })

    return data
}

module.exports = {
    getAllIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient
}