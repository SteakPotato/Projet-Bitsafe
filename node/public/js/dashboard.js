import * as generate from './generates.js'
import * as account from './addAccount.js'

//dashboard.js is the controller for the other scripts
//generates doms on the page 
//clicking the side buttons change the main content and load the content scripts
var base_url = window.location.origin;

window.addEventListener('load',function(){

let changeContent = (place) => {
//side button 
let homeDocument = document.querySelector('.home');
let accountDocument = document.querySelector('.accounts');
let generateDocument = document.querySelector('.generates');


//fetch the page from the server
fetch(base_url+'/dashboard/'+ place)
  .then(response => response.text())
  .then((data) =>{
      document.querySelector('.page-wrap').innerHTML = data; 
      var newScript = document.createElement("script");
      newScript.type = 'module'

     // clicking on the button load the scripts for the pages 
    if(place == 'home'){
         //newScript.src = "/js/generates.js";
    }  
    else if (place == 'accounts'){
        newScript.src = "/js/addAccount.js";
        accountAll();
    }
    else if (place == 'generates'){
        newScript.src = "/js/generates.js";
        newScript.className = 'generates'
        generateAll();
    }
    if(!homeDocument || !accountDocument || !generateDocument){
        document.head.appendChild(newScript)
    }

});

}

//event for the buttons
document.querySelector('.home').addEventListener("click",() => changeContent('home'))
document.querySelector('.accounts').addEventListener("click",() =>changeContent('accounts'))
document.querySelector('.password').addEventListener("click",() =>changeContent('generates'))

})
//executes all import function
let generateAll = () => {
    generate.slider();
    generate.generator();
}
let accountAll = () => {
    account.addAccount();
    account.optionAccount();
    account.addButtonEvent();
   
}


