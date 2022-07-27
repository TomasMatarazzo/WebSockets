 const {User} = require('../models/users');
 
 // Verificamos si se encuentra el usuario , lo hago asi para cuando agreguemos contrasena

 const login = async (req,res) =>{
    const name = req.query.name

    console.log(name)
    const user = await User.findOne({name})
    console.log(user)
    
    if (name === "" || user){
      req.session.isAuth = true  
      return res.redirect('/')
    }

    const newUser = new User({name})
    await newUser.save()

    //aca me logueo
    req.session.isAuth = true

   return res.redirect('/')
 }

 const renderLogin = async (req,res) =>{
   // Caso que entra al login y ya se encuentra logueado

   if (req.session.isAuth)
      return res.redirect('/')

   return res.render("login")

   
}

 const logout = (req,res) => {
    console.log('me estoy desloguando');
    req.session.destroy( error =>{

    })
    res.redirect('/login')
 }

 module.exports = {login,logout , renderLogin}