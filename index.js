function showLoader(){
  document.getElementById('loader').classList.remove('hidden');
  document.getElementById('card_container').classList.add('hidden');
}

function hideLoader(){
  document.getElementById('loader').classList.add('hidden');
  document.getElementById('card_container').classList.remove('hidden');
}


function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active");
    for (let btn of activeButtons) {
      btn.classList.remove("active");
    }
  }



  
// login functionlity

document.getElementById("nav-section").style.display = "block";

document.getElementById('login-btn').addEventListener('click',function(event){
    event.preventDefault();

    const name = document.getElementById('user_name').value
    const password = document.getElementById('user_password').value
    console.log(name)

    if(name === "" || name == null){
        alert('please fill the form')
    }
    if(password=="123456" ){
        alert('login successfull ')
    }


 

   
    document.getElementById("user_name").value = "";
    document.getElementById("user_password").value = "";

    document.getElementById("nav-section").style.display = "block";
    
})


////////////////////////////// functiond ///////////////////////


function loadLevels(){
 
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((res)=> res.json())
    .then((data)=>{
      removeActiveClass()
      console.log(data.data)
      displayLevel(data.data)
    })
}

function displayLevel(levels){
    const Category_container = document.getElementById('category-container')
   for(const element of levels){
    const div = document.createElement('div')
    div.innerHTML = `
    <button id="btn-${element.level_no}" onclick="loadwords('${element.level_no}')" class="btn border-blue-500 hover:bg-blue-500 hover:text-white">Lession ${element.level_no}</button>
    `

    Category_container.appendChild(div)
   } 

}

function loadwords(categoryName) {  
  const activeButton = document.getElementById(`btn-${categoryName}`)
  const buttons = document.querySelectorAll('button')
  for(const button of buttons){
    if(button.id!=`btn-${categoryName}`){
      button.classList.remove('active')
    }
    
  }
  
  
  activeButton.classList.add('active')

  
  showLoader()
    if (categoryName) {
      fetch(`https://openapi.programming-hero.com/api/level/${categoryName}`)
        .then((res) => res.json())
        .then((data) => {
          displaywords(data.data)
        });
    }
  }



function loadword_detail(wordiId){
  // console.log(wordiId);
  const url = `https://openapi.programming-hero.com/api/word/${wordiId}`
  fetch(url)
  .then(res=>res.json())
  .then(data=>displaywordDetail(data.data))
  

}

// function displaywordDetail(data){
//   console.log(data)
//   document.getElementById('word_detail').showModal()
//   const detailContainer = document.getElementById('detail_container')
//   detailContainer.innerHTML = `
//   <h1 class="text-3xl font-bold">${data.word}(<i class="fa-solid fa-microphone"></i> ${data.pronunciation})</h1>
//   <h1 class="text-2xl">Meaning</h1>
//   <h1 class="text-2xl">${data.meaning}</h1>

//   <h1 class="mt-2 text-2xl">Example</h1>
//   <h1>${data.sentence}</h1>

//   <h1 class="text-3xl mt-2">সমার্থক শব্দ গুলো</h1>

//  ${for(const keys of data.)}



  





   function displaywordDetail(data) {
        console.log(data);
        document.getElementById('word_detail').showModal();
        const detailContainer = document.getElementById('detail_container');
        
        let htmlContent = `
        <h1 class="text-3xl font-bold">${data.word}(<i class="fa-solid fa-microphone"></i> ${data.pronunciation})</h1>
        <h1 class="text-2xl">Meaning</h1>
        <h1 class="text-2xl">${data.meaning}</h1>
        
        <h1 class="mt-2 text-2xl">Example</h1>
        <h1>${data.sentence}</h1>
        
        <h1 class="text-3xl mt-2">সমার্থক শব্দ গুলো</h1>
        `;
    
        if (data.synonyms && data.synonyms.length > 0) {
            htmlContent += `<div class="synonyms-buttons">`;
            data.synonyms.forEach(synonym => {
                htmlContent += `
                <button class="synonym-btn bg-blue-500 text-white px-4 py-2 m-1 rounded">
                    ${synonym}
                </button>
                `;
            });
            htmlContent += `</div>`;
        } else {
            htmlContent += `<p>No synonyms available.</p>`;
        }
    
        detailContainer.innerHTML = htmlContent;
    }





function displaywords(words){
  const cardContainer = document.getElementById('card_container')
    // console.log(words);
    cardContainer.innerHTML = ""

    if(words.length == 0){
      cardContainer.innerHTML = `
      <div class="col-span-full text-center flex flex-col">
          <!-- <img src="./assets/alert-error.png" alt=""> -->
          <div id="child_text" class=" w-full text-center mt-10 bg-gray-100 py-20 rounded-xl justify-self-center items-center ml-20">
            <p class="text-gray-600 mb-5 text-sm">ar kono data nai</p>
            <h1 class="font-semibold text-xl">ar kono data nai</h1>
        </div>
        </div>
        `
        hideLoader()
        return

    }
    for(const w of words){
        const card = document.createElement('div')
        card.innerHTML = `


        <div class="card card-dash bg-base-100 w-80">
    <div class="card-body">
      <h2 class="text-3xl font-bold text-center items-center">${w.word}</h2>
      <p>pppppppppppppppppppppppppppppp</p>
      <div class="card-actions justify-end">
  
      <div class="">
         <button onclick="loadword_detail('${w.id}')" class="btn btn-primary">Detail</button>
          <button onclick="loadword_detail('${w.id}')" class="btn btn-primary">Detail</button>
      </div>
  
     
      </div>
    </div>
  </div>
        
        `
        cardContainer.appendChild(card)
       
    
    }
    hideLoader()
}
// loadwords()
loadLevels()