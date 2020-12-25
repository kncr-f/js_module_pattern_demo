//Storage Controller
const StorageController=(function(){


})();

//Product Controller
const ProductController = (function(){
//Privat
const Product=function(id,name,price){
    this.id=id;
    this.name=name;
    this.price=price;
}

const data={
    products:[
        {id:0,name:'Monitor',price:100},
        {id:1,name:'Ram',price:50},
        {id:2,name:'Keyboard',price:10},
    ],
    selectedProduct:null,
    totalPrice:0
}
//Public
return{
    getProducts: function(){
        return data.products;
    },
    getData:function(){
        return data;
    }

}


})();

//UI Controller
const UIController=(function(){


})();

//App Controller
const App=(function(ProductCtrl,UICtrl){
    return{
        init:function(){
            console.log('starting app...');
            const products=ProductController.getProducts();
            console.log(products);
        }
    }

})(ProductController,UIController);
App.init();