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

    setCurrentProduct:function(currentItem){
        data.selectedProduct=currentItem;
    },

    getCurrentProduct:function(){
        return data.selectedProduct;
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

    updateProduct:function(productName,productPrice){
        let updatedprd=null;

        data.products.forEach(function(item){
            if(item.id==data.selectedProduct.id){
                item.name=productName;
                item.price=parseFloat(productPrice);
                updatedprd=item;
            }
        });
        return updatedprd;
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
        productListItems:"#item-list tr",
        addButton:".addBtn",
        saveChanges:".updateBtn",
        deleteButton:".deleteBtn",
        cancelButton:".cancelBtn",
        productName:"#productName",
        productPrice:"#productPrice",
        productCard:".productCard",
        totalEuro:"#total-euro",
        totalDolar:"#total-dolar",
        productEdit:".prd-edit",
        trLine:".tr-line"
        
    }

    return{
        createProductList:function(item){
            let html='';
            item.forEach(prd => {
                html+=`
                <tr class="tr-line">
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

        addProductToUI: function(prd){

            document.querySelector(Selectors.productCard).style.display="block";
            var item=`
            <tr class="tr-line">
                    <td>${prd.id}</td>
                    <td>${prd.name}</td>
                    <td>${prd.price} €</td>
                    <td class="text-right">
                       
                            <i class="far fa-edit prd-edit"></i>
                        
                    </td>
                </tr>
                `;
                document.querySelector(Selectors.productList).innerHTML +=item;

        },

        showUpdatedProduct: function(prd){
            let updatedItem=null;
            let items=document.querySelectorAll(Selectors.productListItems);
            items.forEach(function(item){
                if(item.classList.contains('bg-warning')){
                    item.children[1].textContent=prd.name;
                    item.children[2].textContent=prd.price+' €';
                    updatedItem=item;

                }
            })




            return updatedItem;
        },

        
        clearWarnings: function(){
            const items=document.querySelectorAll(Selectors.productListItems);
            items.forEach(function(item){
                if(item.classList.contains('bg-warning')){
                    item.classList.remove('bg-warning');
                }
            });

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
        },

        addCurrentProduct:function(){
            const selectedProduct=ProductController.getCurrentProduct();
            document.querySelector(Selectors.productName).value=selectedProduct.name;
            document.querySelector(Selectors.productPrice).value=selectedProduct.price; 
        },

        addingState: function(bbb){
            
            UIController.clearWarnings();
            UIController.clearInputs();
            document.querySelector(Selectors.addButton).style.display='inline';
            document.querySelector(Selectors.saveChanges).style.display='none';
            document.querySelector(Selectors.deleteButton).style.display='none';
            document.querySelector(Selectors.cancelButton).style.display='none';

        },

        editState: function(tr){ 

            tr.classList.add('bg-warning');

            document.querySelector(Selectors.addButton).style.display='none';
            document.querySelector(Selectors.saveChanges).style.display='inline';
            document.querySelector(Selectors.deleteButton).style.display='inline';
            document.querySelector(Selectors.cancelButton).style.display='inline';
        }
        

    }

})();

//App Controller
const App=(function(ProductCtrl,UICtrl){

    const UISelectors=UICtrl.getSelectors();
    
    //Load Event Listeners
    const loadEventListeners = function(){
        //add product event
        document.querySelector(UISelectors.addButton).addEventListener('click',productAddSubmit);

         //edit product click
         document.querySelector(UISelectors.productList).addEventListener('click',productEditClick);

         //edit product submit
         document.querySelector(UISelectors.saveChanges).addEventListener('click',editProductSubmit);

         //candel button click
         document.querySelector(UISelectors.cancelButton).addEventListener('click',cancelUpdate);

    }

    const productAddSubmit= function (e){
        const productName=document.querySelector(UISelectors.productName).value;
        const productPrice=document.querySelector(UISelectors.productPrice).value;
        
        if(productName!==''&&productPrice!==''){
            //Add product
            const newProduct= ProductCtrl.addProduct(productName,productPrice);

            //add item to the list
            UIController.addProductToUI(newProduct);

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

    const productEditClick= function(e){

        if(e.target.classList.contains("prd-edit")){
            const id=e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
            
            //get selected product
            const editprd=ProductCtrl.getEditById(id);
            
            //set current product
            ProductCtrl.setCurrentProduct(editprd);

            //add product to UI
            UICtrl.addCurrentProduct();
            UICtrl.editState(e.target.parentNode.parentNode);
        }
           
        
        e.preventDefault();
    }

    const editProductSubmit= function(e){
        const productName=document.querySelector(UISelectors.productName).value;
        const productPrice=document.querySelector(UISelectors.productPrice).value;

        if(productName!=='' && productPrice!==''){

            //update product
            const updatedProduct= ProductCtrl.updateProduct(productName,productPrice);

            //update UI
            UICtrl.showUpdatedProduct(updatedProduct);

             //get total

             const total = ProductCtrl.getTotal();

             //show total
  
             UICtrl.showTotal(total);
             UICtrl.addingState();
        }
        e.preventDefault();
    }

    const cancelUpdate= function(e){

        UICtrl.addingState();


        e.preventDefault();
    }


    return{
        init:function(){
            console.log('starting app...');
            
            UICtrl.addingState();
            UIController.clearWarnings();

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