//Password generator 
import {getAddDataSavePass}  from './addAccount.js'

// sliding the slider changes it's value.
// inputing a number changes it's value.
// when we change either of the inputs, it changes both value so the same number remain.
 let slider = () => {
  var slider = document.querySelector(".range-slider");
  var outputBubble = document.querySelector(".bubble");
  slider.addEventListener('input', function () {
    outputBubble.textContent = slider.value;
    console.log(slider.value);
  });
}
let generate = () => {

  var btn = document.querySelector('.button');
  var copy = document.querySelector('.copypass');
  var save = document.querySelector('.copy');
  var output = document.querySelector('.output');

  var number = document.querySelector("#number");
  var uppercase = document.querySelector("#uppercase");
  var lowercase = document.querySelector("#lowercase");
  var symbol = document.querySelector("#symbol");
  var length = document.querySelector(".range-slider");
  var outputValue = '';

  //select a randomly char from the password string based on the checked boxes and on the length provided
  const config = {
    password:'',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    number: '0123456789',
    symbol: '!@#$%^&*+=(){}[]',
  };

  //if the box is checked , we add to the final string the appropriate config
  if(number.checked === true){
    config.password += config.number;
  }
  if(uppercase.checked === true){
    config.password += config.uppercase;
  }
  if(lowercase.checked === true){
    config.password += config.lowercase;
  }
  if(symbol.checked === true){
    config.password += config.symbol;
  }

  //iterates the length provided
  //each iterations , randomly select a char from the final string
  //seeding not availble for Math.Random()
  for (let i = 1; i <= length.value; i++) {
    var char = Math.floor(Math.random()* config.password.length + 1); 
    outputValue += config.password.charAt(char)
  }
  output.value = outputValue;
  output.addEventListener('focus',function(){ this.select();})
}

// clicking the generate button provide a password based on the checked checkbox
// clicking copy, copy the generated password
let generator = () => {
  var btn = document.querySelector('.button');
  var copy = document.querySelector('.copypass');
  var save = document.querySelector('.copy');
  var output = document.querySelector('.output');
  var slider = document.querySelector(".range-slider");
  var check = document.querySelectorAll(".check-generate")
  generate()


//button event
  btn.addEventListener("click",function(){
    generate()
  });

  slider.addEventListener("input", () => {
    generate()
  })
  check.forEach((check) => {
    check.addEventListener("input",() => {
      generate()
    })
  })

  //clicking on copy select the output field and copy its value
  copy.addEventListener('click',function(){
    let msg = document.querySelector(".copymsg");
    msg.classList.add("visible")
    setTimeout(() => {
      msg.classList.remove("visible")
    }, 1000);
    navigator.clipboard.writeText(output.value)

  })
  save.addEventListener('click',function(){
    let output = document.querySelector(".output").value;
    getAddDataSavePass(output)
  })

}

export {slider,generator};
