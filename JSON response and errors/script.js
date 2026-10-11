const ulEl = document.querySelector("ul");
ulEl.innerHTML="<li>Buy Eggs</li>"


console.log("hi");
fetch("https://jsonplaceholder.typicode.com/todos")
.then((response)=>{
    console.log(response);
    return response.json();
})
.then((data)=>{
    console.log(data[0]);
    let todoList="";
    for(let todoItem of data){
        
        const itemText=`<li>${todoItem.id}   ${todoItem.title} ${todoItem.completed ? '😍' :'😒'} </li>`;
        console.log(itemText)
        todoList += itemText;  
      
    }
    // console.log(todoList);
    ulEl.innerHTML=todoList;
})
.catch((error)=>{
   console.log("failled:",error)
}); 
console.log("hello");


