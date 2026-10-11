
// template literals(``)
// const age = 16;
// console.log(`im ${age}years old`)

// object destructuring 

// const student = {
//     name: "fokrul",
//     roll: 56687,
//     class:3
// }
// console.log(student);
// console.log(student.roll);

// const {name} = student;

// console.log(name); 

// Array distucturing

 

// distructuring and rest operator

// const fruits = ["apple","sinagra","comoca","sobjirul","moglaii"];
// console.log(fruits);

// // const [a] = fruits;
// const [a,...allOthers]=fruits;
// console.log(a);
// console.log(allOthers);

// const familyMembers=["mama","kala"];
// const friendsCircle =["khagemba","atik","siyam"];

// const totalFamilyMembers=["mama","kala","khagemba","atik","siyam"];

// console.log(totalFamilyMembers);

// const totalFamilyMembersV2=[...familyMembers,...friendsCircle];

// console.log(totalFamilyMembersV2) 
           
// promise

// function orderFood(itemAvailable){ 
//     return new Promise((resolve,reject)=>{

//         setTimeout(()=>{
//             if (itemAvailable){
//                 resolve("order conjfirmed ! thank you!");
//             }
//             else{
//                 reject("sorry order incomplete");
//             }

//         },3*1000)


//     });
// }    
// orderFood(false)
//  .then((message)=>{
//     console.log(message);
//  })
//  .catch((message) => {
//     console.error(message);
//  })
//  .finally(()=>{
//     console.log("thankyou for visiting");    
//  })
// function getSuger(){
//     console.log("buiyng suger");
// }
// function  getChaPata(){
//     console.log("buying cha pata");
// }
// function makeTea(getFokrul){
//     getFokrul();
//     console.log("take water");
//     console.log("put cha pata");
//     console.log("add suger");
//     console.log("done!");
// }
// // getChaPata();
// // getSuger();
// makeTea(getSuger);

//callback

// const hEl= document.querySelector("h1");
// console.log(hEl);

// function sayHi(){
//     console.log("hi whatsapp");
// }
// hEl.addEventListener("click",sayHi);

// function savingsBox(taka,usd){
//     let total=0;
//     total= total+taka+usd;
//     console.log(total);
// }
// savingsBox(16,15);
// savingsBox(24,56);0

// function savingsBox(){
//     let total=0;
//     return function addMooney(taka){
//         total=total+taka;
//         console.log("total:",total)
//     }
   
// }
//  const amf = savingsBox();
//  amf(15);
//  amf(16);

