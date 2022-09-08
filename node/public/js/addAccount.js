//manage all accounts related operation
let toggle = true;
var base_url = window.location.origin;

//adding an account with an AJAX post request
let postAdd = ()=>{
    //values
    let titre = document.querySelector('#titre').value
    let email = document.querySelector('#email').value
    let hash = document.querySelector('#hash').value
    let url = document.querySelector('#url').value
    let validurl ;
    if(document.querySelector('.iconclass').id === "imgName"){
        validurl = false;
    }
    else if (document.querySelector('.iconclass').id ==="imgIcon"){
        validurl = true;
    }
    fetch(base_url + '/dashboard/addForm', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    body:JSON.stringify({titre:titre, email:email, hash:hash, url:url, validurl:validurl})
    }).then((res) => {
        console.log(res)
        getAccount()
    }).catch((err) => {
        console.log(err);
    })
}
//edit an account with an AJAX post request
let postEdit = ()=>{

    let titre = document.querySelector('#titre').value
    let email = document.querySelector('#email').value
    let hash = document.querySelector('#hash').value
    let url = document.querySelector('#url').value
    let item = document.querySelector('.add-form-container');
    let itemid = parseInt(item.id.replace('account_',''), 10);
    let validurl ;
    if(document.querySelector('.iconclass').id === "imgName"){
        validurl = false;
    }
    else if (document.querySelector('.iconclass').id ==="imgIcon"){
        validurl = true;
    }
    fetch( base_url+'/dashboard/editForm', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    body:JSON.stringify({titre:titre, email:email, hash:hash, url:url,validurl:validurl,id:itemid})
    }).then((res) => {
        getAccount()
    }).catch((err) => {
        console.log(err);
    })
}

//delete an account with an AJAX post request
let deleteAccount = (itemid) => {
    fetch(base_url + '/dashboard/accounts', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    body:JSON.stringify({id:itemid})
    }).then((res) => {
        getAccount()
    }).catch((err) => {
        console.log(err);
    })
}
//adding an account through the password creator with an AJAX post request
let getAddDataSavePass = ( pass)=>{
    fetch(base_url + '/dashboard/addForm')
    .then(response => response.text())
    .then((data) =>{
      document.querySelector('.page-wrap').innerHTML = data;
      document.querySelector('#hash').value = pass;

        let form = document.querySelector('.add-form-container').addEventListener('submit', (e)=>{
            e.preventDefault();
            postAdd();
        }) 
        let cancel = document.querySelector('#cancel').addEventListener('click', ()=>{
            getAccount();
        })
        addIconEvent();
    })
}

//get page with the form for adding an account
let getAddData = ()=>{
    fetch(base_url + '/dashboard/addForm')
    .then(response => response.text())
    .then((data) =>{
      document.querySelector('.page-wrap').innerHTML = data;

        let form = document.querySelector('.add-form-container').addEventListener('submit', (e)=>{
            e.preventDefault();
            postAdd();
        }) 
        let cancel = document.querySelector('#cancel').addEventListener('click', ()=>{
            getAccount();
        })
        addIconEvent();
    })
}

//get All the accounts page
let getAccount = ()=>{
    fetch( base_url + '/dashboard/accounts')
    .then(response => response.text())
    .then((data) =>{
      document.querySelector('.page-wrap').innerHTML = data;
      addAccount();
      optionAccount();
      addButtonEvent();
    })
}

//get the edit account page.
let getEditData = (id,copy) => {
    var url = new URL(base_url+'/dashboard/editForm')
    var params = {num:id}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    fetch(url,{
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        return response.text()
    })
    .then((data) =>{
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(data, "text/html");
        const hash = htmlDocument.documentElement.querySelector("#variableJSON").value;
        const email = htmlDocument.documentElement.querySelector("#email").value;
        const formhtml = htmlDocument.documentElement.querySelector(".form-popup")
        htmlDocument.documentElement.querySelector("#variableJSON").remove();
        if(copy === "email"){
            navigator.clipboard.writeText(email)
            return ;
        }else if(copy === "hash"){
            navigator.clipboard.writeText(hash)
            return ;
        }
        document.querySelector('.page-wrap').innerHTML = '';
        document.querySelector('.page-wrap').appendChild(formhtml);
        document.querySelector('#hash').value = hash;

        let form = document.querySelector('.add-form-container').addEventListener('submit', (e)=>{
            e.preventDefault();
            postEdit();
        })
        let cancel = document.querySelector('#cancel').addEventListener('click', ()=>{
            getAccount();
        })
        togglePswIcon();
        addIconEvent(); 
    })
}

//Listenner for add account btn
let addAccount = () => {
    let btn = document.querySelector('.addbtn').addEventListener('click', ()=> {
        getAddData()
}) 
}

//add listenners for all accounts
let optionAccount = () => {
    let editbtn = document.querySelectorAll('.accountHover').forEach(item => {
        item.addEventListener('click', ()=> {
        var id_number = parseInt(item.id.replace('num_',''), 10);
        getEditData(id_number)
        })
    })
}

//add all button listenners
let addButtonEvent = () => {
    let current = null;
    let allbtn = document.querySelectorAll(".optionbtn");

    //dropdown menu button
    allbtn.forEach((elem) => {
        elem.addEventListener("click", () => {
            if(current == null){
                elem.parentNode.querySelector('.dropdown').classList.toggle("show");
                current = elem;
                toggle = false;
            }
            else if(current == elem){
                elem.parentNode.querySelector('.dropdown').classList.toggle("show");
                current = null;
            }
            else if(current != elem){
                current.parentNode.querySelector('.dropdown').classList.toggle("show");
                elem.parentNode.querySelector('.dropdown').classList.toggle("show");
                current = elem;
            }
            
        })
    })

    //clicking outside the dropdown
    window.addEventListener('click',(event) => {
        if (!event.target.matches('.optionbtn')) {
          var dropdowns = document.querySelectorAll(".dropdown");
          
          for (var i = 0; i < dropdowns.length; i++) {

            var openDropdown = dropdowns[i];

            if (openDropdown.classList.contains('show')){
              openDropdown.classList.remove('show');
              current = null;
            }
          }
        }
    })

    //all button in the dropdown menu
    let dropDown = document.querySelectorAll('.account').forEach(item => {
        item.querySelector("#dropDelete").addEventListener('click', ()=> {
            var id_number = parseInt(item.querySelector(".accountHover").id.replace('num_',''), 10);
            deleteAccount(id_number)
        })
        item.querySelector("#dropEdit").addEventListener('click', ()=> {
            var id_number = parseInt(item.querySelector(".accountHover").id.replace('num_',''), 10);
            getEditData(id_number)
        })
        item.querySelector("#copyuser").addEventListener('click', ()=> {
            var id_number = parseInt(item.querySelector(".accountHover").id.replace('num_',''), 10);
            getEditData(id_number,"email")
        })
        item.querySelector("#copypass").addEventListener('click', ()=> {
            var id_number = parseInt(item.querySelector(".accountHover").id.replace('num_',''), 10);
            getEditData(id_number,"hash")
        })
    })

}

//all event regarding an icon
let addIconEvent = () => {
    let url = document.querySelector("#url").value;
    if(url){
        let container = document.querySelector(".iconimg");
        var newurl;
        var icon;
        try {
            newurl = new URL(url)
        } catch (er) {
            console.log(er);  
        }
        if(newurl){
            icon = newurl.origin + "/favicon.ico"
            changeIconLogo(icon)
        }
        else {
            changeIconText(container);
        }
    }

    let titreEvent = document.querySelector("#titre").addEventListener('input',() => { 
        let container = document.querySelector(".iconimg");
        if(!document.querySelector('#imgIcon')){
            changeIconText(container);            
        }            
    })
    let urlEvent = document.querySelector("#url").addEventListener('input',() => {
        let url = document.querySelector("#url");
        let container = document.querySelector(".iconimg");
        var newurl;
        var icon;
        try {
            newurl = new URL(url.value)
        } catch (er) {
            console.log(er);  
        }
        if(newurl){
            url.value = newurl.origin
            icon = newurl.origin + "/favicon.ico"
            changeIconLogo(icon)
        }
        else if (document.querySelector('#imgIcon')){
            document.querySelector('#imgIcon').remove()
            changeIconText(container);
        } 
    })

}

//change the icon to text (first 2 letters of title)
let changeIconText = (container) => {
    let imgName = document.querySelector('#imgName');
    let titre = document.querySelector("#titre").value.substr(0, 2);

    if(!imgName){
        let div = document.createElement("div");
        div.className ='iconclass'
        div.id ="imgName"
        var t = document.createTextNode(titre);
        div.appendChild(t)
        container.appendChild(div)
    }
    else{
        imgName.textContent = titre ;
    }
}

//change the icon to a fav icon
let changeIconLogo = (icon) => {
    let container = document.querySelector(".iconimg");
    let imgName = document.querySelector('#imgName');
    let imgIcon = document.querySelector('#imgIcon');
    
    if(!imgIcon){
        let img = document.createElement("img");
        img.addEventListener("error",() => {
            document.querySelector('#imgIcon').remove()
            changeIconText(container);
        })
        img.addEventListener("load",() => {
            if(imgName){
                imgName.remove();
            }
        })

        img.className ='iconclass'
        img.id ="imgIcon";
        img.width ="32"
        img.height="32"
        img.src = icon;
        container.appendChild(img);
    }
    else{
        imgIcon.addEventListener("error",() => {
            imgIcon.remove()
            changeIconText(container);
        } )
        imgIcon.src = icon;
    } 
}

//eyeIcon listenner, show password.
let togglePswIcon = () => {
    let icon = document.querySelector("#eye").addEventListener("click",() => {
        var x = document.getElementById("hash");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    })

}


export {addAccount,optionAccount,addButtonEvent,getAddDataSavePass}