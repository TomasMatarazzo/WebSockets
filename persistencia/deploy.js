( async ()=>{
    const {optionsMySql , optionsSQLite} = require('./options.js');
    const  Persistencia  = require('./Persistencia.js');

    const DB_Productos = new Persistencia('productos3',optionsMySql);
    const DB_Mensajes = new Persistencia('mensajes',optionsSQLite);

    await DB_Mensajes.createTableMensajes(); 

    await DB_Mensajes.insertar({
    mail:"tomasmatarazzo@gmail", 
    mensaje:"Hola como andas?"
    })
    await DB_Mensajes.insertar({
    mail:"profe@gmail.com",
    mensaje:"muy bien y vos"
    })


    await DB_Productos.createTableProductos();

    await DB_Productos.insertar(  {
    price: 5000,
    title: "Buzo",
    thumbnail: "https://cdn3.iconfinder.com/data/icons/fashion-beauty-vol-1/512/hoodie_clothes_hoody_wear-256.png",
    })
    console.log('fin');
    await DB_Productos.insertar(  {
    price: 4000,
    title: "Zapatillas",
    thumbnail: "https://cdn4.iconfinder.com/data/icons/camping-and-adventure-part-1/135/25-256.png",
    })
    }
)();


