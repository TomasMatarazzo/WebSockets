 const {User} = require('../models/users');
 
 const login = async (req,res) =>{
    const name = req.query.name
    console.log(req.session)
    const newUser = new User({name})
    await newUser.save() 
    req.session.isLoggedIn = true
    res.send('nashe')
 }

 const renderLogin = async (req,res) =>{
   res.render("login")
}

 const logout = (req,res) => {
    req.session.destroy( error =>{

    })
    res.send('te desloguaste')
 }

 module.exports = {login,logout , renderLogin}