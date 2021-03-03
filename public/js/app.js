//const { response } = require("express")

console.log("client side js file is loaded")

//fetch is not accesible in node js
fetch('https://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})

fetch("http://localhost:3000/weather?adress=,,,,,,,").then((response)=>{
    response.json().then((data)=>{
        if (data.errorText){
            console.log(data.errorText)
        }else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})

const weaherForm = document.querySelector('form')
const searchLocation = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')




weaherForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    messageOne.textContent='Loading...';
    messageTwo.textContent='';
    const location = searchLocation.value;
    fetch("http://localhost:3000/weather?adress="+location).then((response)=>{
    response.json().then((data)=>{
        if (data.errorText){
            messageOne.textContent=data.errorText;
        }else {
            messageOne.textContent=data.location;
            messageTwo.textContent=data.forecast;
        }
    })
})
})