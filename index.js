// login functionlity

document.getElementById("nav-section").style.display = "none";

document.getElementById('login-btn').addEventListener('click',function(event){
    event.preventDefault();

    const name = document.getElementById('user_name').value
    const password = document.getElementById('user_password').value
    console.log(name)

    if(name === "" || name == null){
        alert('please fill the form')
    }
    if(password.length <=6 ){
        alert('password more then 6 ')
    }

    if(password.length >=10 ){
        alert('password length is not more then 10 ')
    }
 

   
    document.getElementById("user_name").value = "";
    document.getElementById("user_password").value = "";

    document.getElementById("nav-section").style.display = "block";
    
})


////////////////////////////// functiond ///////////////////////


function loadLevels(){
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((res)=> res.json())
    .then((data)=>displayLevel(data.data))
}

function displayLevel(levels){
    const Category_container = document.getElementById('category-container')
   for(const element of levels){
    const div = document.createElement('div')
    div.innerHTML = `
    <button onclick="()=>loadwords('${element.level_no}')" class="btn border-blue-500 hover:bg-blue-500 hover:text-white">Lecture ${element.level_no}</button>
    `
    Category_container.appendChild(div)
    

   } 

}
function loadwords(categoryName){
    // console.log(categoryName)
    console.log('click')
    fetch(`https://openapi.programming-hero.com/api/level/${categoryName}`)
    .then((res)=>res.json())
    .then((data)=>displaywords(data.data))

}

function displaywords(words){
    // console.log(words);
    card_container.innerHTML = ""
    for(const w of words){
        CardContainer = document.getElementById('card_container')
        const card = document.createElement('div')
        card.innerHTML = `

        <div class="card card-dash bg-base-100 w-80">
  <div class="card-body">
    <h2 class="card-title">${w.word}</h2>
    <p>pppppppppppppppppppppppppppppp</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
        
        
        `
        CardContainer.appendChild(card)
    }
    

}
loadwords()
loadLevels()