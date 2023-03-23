
//install package to serve http : yarn add --dev http -server

import {ethers} from "./ethers-5.6.esm.min.js"
import {abi,contractaddress} from "./constants.js"
const connectbutton=document.getElementById("connectbutton")
const fundbutton=document.getElementById("fundbutton")
connectbutton.onclick=connect
fundbutton.onclick=fund
console.log(ethers)
async function connect(){
 
    console.log("hello")
   if(typeof window.ethereum !=="undefined"){
      //console.log("i can see a metamask")
       await window.ethereum.request({method:"eth_requestAccounts"})
       document.getElementById("connectbutton").innerHTML="connected"
   }else{
       document.getElementById("connectbutton").innerHTML="please install metamask"
   }
} 
//yarn add --dev prettier

async function fund(){
    
    const ethAmount="77"
    console.log(`funding with ${ethAmount}...`)
    if(typeof window.ethereum!== "undefined"){
        //provider/connection to the blockchain
    const provider= new ethers.providers.Web3Provider(window.ethereum);
        //signer/wallet/someone with some gas
    const signer=provider.getSigner()
        //contract that we are interacting with
    const contract =new ethers.Contract(contractaddress,abi,signer)
    try{
        const transactionresponse=await contract.fund({
            value:ethers.utils.parseEther(ethAmount),
        })
        //listen for tx to be mined
        //listen for an event <- we haven,t learned about yet!
       await listenForTransactionMine(transactionresponse,provider)
       console.log("done!")
    }
    catch(error){
        console.log(error)
    }
        //ABI and address
    }
}
function listenForTransactionMine(trnsactionresponse,provider){
    console.log(`mining ${transactionresponse.hash}...`)
    //return new Promise()
    provider.once(transactionresponse.hash,(transactionReceipt)=>{
        console.log(
            `completed with ${transactionReceipt.confirmations} confirmations`
        )
    })
}  

