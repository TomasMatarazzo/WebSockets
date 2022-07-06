let socket = io()

const btnProduct = document.getElementById('submitProduct');
const price = document.getElementById('price');
const title = document.getElementById('title');
const thumbnail = document.getElementById('thumbnail');

btnProduct.addEventListener('click',()=>{
    window.alert("Se agrego el producto en la seccion productos");
    const product = {
        title: title.value,
        price: price.value,
        thumbnail:thumbnail.value
    }
    socket.emit('product-list',product)
})
