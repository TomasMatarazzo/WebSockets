 const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require('http');
const server = http.createServer(app);
const models = require("./models/index.js");
const  Persistencia  = require('./persistencia/Persistencia.js');
const mongoose = require('mongoose')
const {isAuth} = require('./middleware/authentication')


PORT = 8080;
const routerProducts = require("./routes/products.js");
const routerUser = require('./routes/user.js')

const bp = require('body-parser')

// =============================== CONEXION A LA SESSION =============================

const session = require('express-session')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
const password = 'm001-mongodb-basics';
app.use(session(
  {
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.azv9a.mongodb.net/?retryWrites=true&w=majority',
      mongoOptions:advancedOptions,
      cookie: { maxAge: 300000 },  // la sesion se cierra dps de 5 minutos
    }),
    secret:'sh',
    resave:false,
    saveUninitialized:false
  }
))

mongoose.connect(
  'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.azv9a.mongodb.net/?retryWrites=true&w=majority',
  (err) => {
   if(err) console.log(err) 
   else console.log("mongdb is connected");
  }
);

// ========================================

app.use(cookieParser())

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.set('view engine','ejs');
app.set('views',__dirname + '/views');
app.use("/api/products", routerProducts);
app.use('/', routerUser)
app.use(express.static(__dirname + '/views'));
const { REPL_MODE_SLOPPY } = require("repl");


// Hacemos la carga a la base de datos --- borrar esta linea para no cargarlo varias veces
const deploy = require('./persistencia/deploy.js');

// Bases de datos 

const {optionsMySql , optionsSQLite} = require('./persistencia/options.js');
const DB_Productos = new Persistencia('productos3',optionsMySql);
const DB_Mensajes = new Persistencia('mensajes',optionsSQLite);


// CARGA DE LOS PRODUCTOS , LO CARGO EN UN ARRAY PARA EJS

( async () =>{
  let productos = await DB_Productos.getAll();
  models.products = productos
}
  )();

// CONEXION DEL SOCKET

const io = new Server(server)


io.on('connection', async(socket)=>{
  // CARGA DE MENSAJES ANTERIORES OBTENGO LOS ELEMENTOS DE LA DB

  let mensajes = await DB_Mensajes.getAll();
  io.sockets.emit('chat-message', mensajes)
 
  // Agrego los mensajes al contenedor ( archivo de texto)
 
  socket.on('chat-message', async (data) =>{
    await DB_Mensajes.insertar(data);
    mensajes = await DB_Mensajes.getAll();  
    io.sockets.emit('chat-message', mensajes);
  }) 
  
  // Agrego mensajes a la persistencia de los productos
  // como actualizo con handlebars??

  socket.on('product-list',async (producto)=>{
    await DB_Productos.insertar(producto);
    models.products.push(producto);
  })
})



app.get("/", isAuth, (req, res) => {
  res.render("index" ,{nombre:"tomas"});
});

app.get('/products', isAuth ,(req,res)=>{
  res.render("products")
})

server.listen(PORT, () => {
  console.log("Server running in port 8080");
});


