// Middleware para saber que estamos registrados

const isAuth = (req,res,next) =>{
    console.log(req.session.isAuth)
    console.log('autentificando');
    if (req.session.isAuth){
        next()
    }else{
        res.redirect('/login')
    }
}

module.exports = {isAuth}