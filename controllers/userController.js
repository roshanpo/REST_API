const pool = require("../db/quries")
userController = {};
const bcrypt = require('bcrypt')
const userValidator = require("./userValidator")
const logger = require('../logs/logger');



userController.getUsers = async (req, res) =>{
    const allUsers = await pool.query('SELECT user_id, username, email FROM users');
    if(allUsers.rowCount===0){
        res.send("No Users Found")
    }
    //logger.info('This is an info message.');
    res.send(allUsers.rows);
    //logger.
}

userController.createUser = async (req,res) => {

    const usernameExists = await pool.query('SELECT * FROM users WHERE username = $1',[req.body.username]);
    if(usernameExists.rowCount!==0){
        return res.status(400).send('Username Already Exists')
    }
    const plainPassword = req.body.password;
    const salt = await bcrypt.genSalt(10)
    const hashedpPassword = await bcrypt.hash(plainPassword, salt)
    const user = {
        username : req.body.username,
        email : req.body.email,
        password : hashedpPassword
    }
    const newUser = await pool.query('INSERT INTO users (username, email, password) VALUES($1,$2,$3) RETURNING *',[user.username, user.email, user.password]);
    //console.log(newUser);
    res.send(newUser.rows);

    //res.send(newUser);
}

userController.getOneUser = async (req,res) => {
    
        let id = req.params.id;
        const userExists = await pool.query('SELECT * FROM users WHERE user_id = $1',[id]);
        if(userExists.rowCount===0){
            res.send('User Not Found')
        }
        console.log(id);
        const oneUser = await pool.query('SELECT user_id, username, email FROM users WHERE user_id=$1',[id]);
        res.send(oneUser.rows);
    }
    
userController.updateUser = async (req,res) =>{
    let id = req.params.id;
    let user = await pool.query('SELECT * FROM users WHERE user_id = $1',[id]);
    if(user.rowCount===0){
        res.send("User Not Found")
    }
    const usernameExists = await pool.query('SELECT * FROM users WHERE username=$1',[req.body.username]);
    if(usernameExists !==0){
        res.send('Username Already Exists. Choose Another One')
    }
    const updatedUser = {
        ...user.rows[0],
        username : req.body.username|| user.rows[0].username,
        email : req.body.email|| user.rows[0].email
    }
    
    const result = await pool.query('UPDATE users SET username=$1, email=$2 WHERE user_id=$3 RETURNING *', [updatedUser.username, updatedUser.email,req.params.id]);
    res.status(200).send(result.rows[0]);

}

userController.deleteUser = async (req,res) => {
    let id = req.params.id;
    let user = await pool.query('SELECT * FROM users WHERE user_id = $1',[id]);
    if(user.rowCount === 0){
        res.send('User Not found')
    }
    const result = await pool.query('DELETE FROM users WHERE user_id=$1',[id]);
    res.status(200).send('User Deleted!')

}

module.exports = userController;