const {v4: uuidv4}= require('uuid')
const User = require('../models/userModel');

const getAllUsers = async (req, res) =>{
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send(error.message)
    }
};

const getOneUser = async (req, res) =>{
    try {
        const user = await User.findOne({id:req.params.id});
        if(user){
            res.status(200).json({user});
        }else{
            res.status(404).json({message:'user not found'})
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
};


const createUser = async (req, res) =>{
    try {
        const newUser = new User({
            id:uuidv4(),
            name:req.body.name,
            age:Number(req.body.age)
        })
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateUser = async (req, res) =>{
    try {
        const user = await User.findOne({id:req.params.id});
        if(!user){
            return res.status(404).json({ message: 'user not found' });
        }
        if(req.body.name){
            user.name = req.body.name;
        }
        if(req.body.age){
            user.age = Number(req.body.age);
        }

        await user.save();
        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
};



const deleteUser = async (req, res) =>{
    try {
        const user = await User.findOne({id:req.params.id});
         if(user){
            await User.deleteOne({id:req.params.id});
            res.status(200).json({message:'user deleted sucessfully !'});
         }else{
            res.status(404).json({message:'user not found'})
         }
    }catch (error) {
        res.status(500).send(error.message)
    }
};

module.exports = {getAllUsers, getOneUser, createUser, updateUser, deleteUser}