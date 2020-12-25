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
        {id:2,name:'Keyboard',price:20},
        {id:3,name:'Mouse',price:10}
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
    const Selectors={
        productList:"#item-list"
    }

    return{
        createProductList:function(item){
            let html='';
            item.forEach(prd => {
                html+=`
                <tr>
                    <td>${prd.id}</td>
                    <td>${prd.name}</td>
                    <td>${prd.price}</td>
                    <td class="text-right">
                        <button type="submit" class="btn btn-warning btn-sm">
                            <i class="far fa-edit"></i>
                        </button>
                    </td>
                </tr>
                `;
                
            });

            document.querySelector(Selectors.productList).innerHTML=html;
        },
        getSelectors:function(){
            return Selectors;
        }
    }

})();

//App Controller
const App=(function(ProductCtrl,UICtrl){
    return{
        init:function(){
            console.log('starting app...');
            const item2=ProductCtrl.getProducts();
            UICtrl.createProductList(item2);
        }
    }

})(ProductController,UIController);
App.init();