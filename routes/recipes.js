const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Recipe = require('../models/Recipe');

// @route   GET api/recipes
// @desc    GET all recipes for a specific user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const recipes = await Recipe.find({ user: req.user.id }).sort({ date: -1 }) //-1 date makes it so we sort by the most recent recipes
        res.json(recipes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
});

// @route   POST api/recipes
// @desc    Post recipe for specific user
// @access  Private
router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) { //If there are errors related to missing or invalid name
        return res.status(400).json({ errors: errors.array() }); //returns status 400, along with array of errors
    }

    const { name, details } = req.body;

    try {
        const newRecipe = new Recipe({
            name: name,
            details: details,
            user: req.user.id //req.user comes from the auth middleware. Here we are assocating the contact to the user with the req.user.id
        });

        const recipe = await newRecipe.save();

        res.json(recipe);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
});

// @route   PUT api/recipes/:id
// @desc    Edit/Update a specific recipe
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { name, details } = req.body;

    //Build recipe object
    const recipeFields = {};
    if(name) {
        recipeFields.name = name;
    }
    if(details) {
        recipeFields.details = details;
    }
    
    try {
        let recipe = await Recipe.findById(req.params.id);

        if(!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        //Make sure no other user can change the recipe
        //'user' property on recipe is the ID of the authenticated user. 'req.user.id' comes from our 'auth' middleware
        if(recipe.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }  

        recipe = await Recipe.findByIdAndUpdate(req.params.id,
            { $set: recipeFields },
            { new: true }
        );
        res.json(recipe);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   Delete api/recipes/:id
// @desc    Delete a specific recipe
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let recipe = await Recipe.findById(req.params.id);

        if(!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        //Make sure no other user can change the recipe
        //'user' property on contact is the ID of the authenticated user. 'req.user.id' comes from our 'auth' middleware
        if(recipe.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }  

        await Recipe.findByIdAndRemove(req.params.id);
        res.json({ message: 'Recipe removed'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;