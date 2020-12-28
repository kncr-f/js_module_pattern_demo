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

    getEditById:function(id){
        let item=null;
        data.products.forEach(function(prd){
            if(prd.id==id){
                item=prd;
            }
        })
        return item;

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
        totalDolar:"#total-dolar",
        productEdit:".prd-edit"
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
                        
                            <i class="far fa-edit prd-edit"></i>
                        
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
                       
                            <i class="far fa-edit prd-edit"></i>
                        
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
            document.querySelector(Selectors.totalEuro).textContent=(total).toFixed(2);
            document.querySelector(Selectors.totalDolar).textContent=(total*1.2).toFixed(2);
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

         //edit product
         document.querySelector(UISelectors.productList).addEventListener('click',productEditSumbit);
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

    const productEditSumbit= function(e){

        if(e.target.classList.contains("prd-edit")){
            const id=e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
            
            //get selected product
            const editprd=ProductCtrl.getEditById(id);
            console.log(editprd);
        }
           
        
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