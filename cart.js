let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHtml = document.querySelector('.listProduct');
let listCartHtml = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');

let listProducts = [];
let carts = [];

iconCart.addEventListener('click', ()=>{
    body.classList.toggle('showCart')
})

closeCart.addEventListener('click', ()=>{
    body.classList.toggle('showCart')
})

const addDataToHtml = () =>{
    listProductHtml.innerHTML = '';
    if (listProducts.length > 0) {
        listProducts.forEach(product =>{
            let newProduct = document.createElement('div');
            newProduct.classList.add('item'); 
            newProduct.dataset.id = product.id;           
            newProduct.innerHTML = `
            <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">₹${product.price}</div>
                <button class="addCart">
                    Add to cart
                </button>
                `;

            listProductHtml.appendChild(newProduct);

        })
    }
}

listProductHtml.addEventListener('click', (event)=>{
        let positionClick = event.target;
        if (positionClick.classList.contains('addCart')) {
            let product_id = positionClick.parentElement.dataset.id;
            addToCart(product_id);
        }
})

const addToCart = (product_id) =>{
        let positionThisProductInCart = carts.findIndex((value) =>{
            return value.product_id == product_id
        })
        if (carts.length <= 0) {
            carts = [{
                product_id: product_id,
                quantity : 1
            }]
        }else if(positionThisProductInCart < 0){
            carts.push({
                product_id : product_id,
                quantity : 1
            })
        }else{
            carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
        }
        addCartToHtml()
        addCartToMemory();

        console.log(carts);
        
}

const addCartToMemory =() =>{
    localStorage.setItem('cart', JSON.stringify(carts))
}

const addCartToHtml = ()=>{
    listCartHtml.innerHTML = '';
    let totalQuantity = 0;
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id)
            let info = listProducts[positionProduct];
            newCart.innerHTML = `
            <div class="image">
                    <img src="${info.image}" alt="">
                </div>
                <div class="name">
                    ${info.name}
                </div>
                <div class="totalPrice">
                    ${info.price * cart.quantity}
                </div>
                <div class="quantity">
                    <span class="minus"><i class="ri-subtract-line"></i></span>
                    <span>${cart.quantity}</span>
                    <span class="plus"><i class="ri-add-line"></i></span>
                </div>
            `;
            listCartHtml.appendChild(newCart);
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

listCartHtml.addEventListener('click', (event) => {
    let positionClick = event.target;
    let itemElement = positionClick.closest('.item'); // Correctly finding the parent with class "item"
    
    if (itemElement) {
        let product_id = itemElement.dataset.id;

        if (positionClick.closest('.minus')) { 
            changeQuantity(product_id, 'minus');
        } else if (positionClick.closest('.plus')) {
            changeQuantity(product_id, 'plus');
        }
    }
});


const changeQuantity = (product_id, type) =>{
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id)
    if (positionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                break;
        
            default:
                let valueChange = carts[positionItemInCart].quantity - 1;
                if (valueChange > 0) {
                    carts[positionItemInCart].quantity = valueChange;
                }else{
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHtml();
}

const initApp = () =>{
    //get product
    fetch('products.json')
    .then(response => response.json())
    .then(data =>{
        listProducts = data
        // console.log(listProducts);
        addDataToHtml();

        //get cart from memory
        if (localStorage.getItem('cart')) {
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToHtml();
        }
    })


}

initApp();