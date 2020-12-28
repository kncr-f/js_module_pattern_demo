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
    },

    addProduct: function(name,price){
        let id;
        if(data.products.length>0){
            id=data.products[data.products.length-1].id+1;
        }else{
            id=0;
        }

        const newProduct = new Product(id,name,parseFloat(price));
        data.products.push(newProduct);
        return newProduct;
    },

    getTotal: function(){

        let total=0;

        data.products.forEach(function(item){
            total+=item.price;
        });

        data.totalPrice=total;
        return data.totalPrice;

    }

}


})();

//UI Controller
const UIController=(function(){
    const Selectors={
        productList:"#item-list",
        addButton:".addBtn",
        productName:"#productName",
        productPrice:"#productPrice",
        productCard:".productCard",
        totalEuro:"#total-euro",
        totalDolar:"#total-dolar"
    }

    return{
        createProductList:function(item){
            let html='';
            item.forEach(prd => {
                html+=`
                <tr>
                    <td>${prd.id}</td>
                    <td>${prd.name}</td>
                    <td>${prd.price} $</td>
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
        },

        addProduct: function(prd){

            document.querySelector(Selectors.productCard).style.display="block";
            var item=`
            <tr>
                    <td>${prd.id}</td>
                    <td>${prd.name}</td>
                    <td>${prd.price} $</td>
                    <td class="text-right">
                        <button type="submit" class="btn btn-warning btn-sm">
                            <i class="far fa-edit"></i>
                        </button>
                    </td>
                </tr>
                `;
                document.querySelector(Selectors.productList).innerHTML +=item;

        },

        clearInputs: function(){
            document.querySelector(Selectors.productName).value="";
            document.querySelector(Selectors.productPrice).value="";
        },

        hideCard: function(){
            document.querySelector(Selectors.productCard).style.display="none";
        },

        showTotal: function(total){
            document.querySelector(Selectors.totalEuro).textContent=total;
            document.querySelector(Selectors.totalDolar).textContent=total*1.2;
        }

    }

})();

//App Controller
const App=(function(ProductCtrl,UICtrl){

    const UISelectors=UIController.getSelectors();
    
    //Load Event Listeners
    const loadEventListeners = function(){
        //add product event
        document.querySelector(UISelectors.addButton).addEventListener('click',productAddSubmit);
    }
    const productAddSubmit= function (e){
        const productName=document.querySelector(UISelectors.productName).value;
        const productPrice=document.querySelector(UISelectors.productPrice).value;
        
        if(productName!==''&&productPrice!==''){
            //Add product
            const newProduct= ProductCtrl.addProduct(productName,productPrice);

            //add item to the list
            UIController.addProduct(newProduct);

            //get total

            const total = ProductCtrl.getTotal();

           //show total

           UICtrl.showTotal(total);

            //clear  inputs

            UIController.clearInputs();
           
            

        }
        console.log(productName, productPrice);
        e.preventDefault();
    }


    return{
        init:function(){
            console.log('starting app...');
            const item2=ProductCtrl.getProducts();

            if(item2.length==0){
                UICtrl.hideCard();

            }else{
                UICtrl.createProductList(item2);
            }
           

            //load event listeners
            loadEventListeners();

            
        }
    }

})(ProductController,UIController);
App.init();