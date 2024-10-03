import { AES } from "./classes/AES.js";

const animation = document.getElementById('Animation');
const noteButton = document.getElementById('note');
const nhapKey = document.getElementById('nhapKey');
const nhapPlainText = document.getElementById('nhapPlainText');
const nhapCipherText = document.getElementById('nhapCipherText');
const generate = document.getElementById('generate');
const encrypt = document.getElementById('encrypt');
const decrypt = document.getElementById('decrypt');
const plaintextResult = document.getElementById('plaintextResult');
const ciphertextResult = document.getElementById('ciphertextResult');

const aes = new AES();

let checkKeyValid = false;
let encryptResult="";
let decryptResult="";
let key="";
let plaintext="";
let ciphertext="";

nhapKey.onchange = (e)=>{
    key = e.target.value;
}
nhapPlainText.onchange = (e)=>{
    plaintext = e.target.value;
}
nhapCipherText.onchange = (e)=>{
    ciphertext = e.target.value;
}

generate.onclick = () => {
    key = aes.generateRandomHexString(16);
    nhapKey.value=key;
    checkKeyValid=true;
    nhapKey.style.color="green";
}

encrypt.onclick = ()=>{
    if(checkKeyValid){
        encryptResult = aes.runEncrypt(plaintext,key);;
        plaintextResult.innerHTML = `<p>Result: ${encryptResult}</p>`;
    }
    
    
}
decrypt.onclick = ()=>{
    if(checkKeyValid){
        decryptResult = aes.runDecrypt(ciphertext,key);
        ciphertextResult.innerHTML = `<p>Result: ${decryptResult}</p>`;
    }
}

let flag = false;

noteButton.onclick = ()=>{
    if(!flag){
        animation.classList.add('keo-qua-trai')
        animation.classList.remove('keo-qua-phai')
        
        flag = true;
    }else{
        animation.classList.remove('keo-qua-trai')
        animation.classList.add('keo-qua-phai')
        flag = false;
    }
    
}


nhapKey.onblur = (e)=>{
    
    if(e.target.value.length!==16){
        nhapKey.style.color="red"
        checkKeyValid = false;
        
    }else{
        nhapKey.style.color="green";
        checkKeyValid = true;
    }
}

