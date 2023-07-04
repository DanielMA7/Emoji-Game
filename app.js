// Creating user info

let userInfo = {
    "level": 1,
    "hintsUsed": 0,
}

// Setting important variables for the document

const emojiContainer = document.getElementById("emojiDisplay")
const hintBtn = document.getElementById("hint-btn")

// Setting loading the images for each level based on the user info

function loadLevel (){
  document.getElementById("emojiDisplay").innerHTML = "";
  fetch(`/assets/level${userInfo["level"]}/image-list.json`)
    .then(response => response.json())
    .then(data => {
      data.forEach(filename => {
        var img = document.createElement('img');
        img.src = `/assets/level${userInfo["level"]}/images/` + filename;
        emojiContainer.appendChild(img);
      });
    })
    .catch(error => {
      console.log(error);
    });
}

// Loading the initial level

loadLevel()

// Showing hints based on the level they are on and the amount of hints used

function showHint() {
  fetch(`/levelinfo/level${userInfo["level"]}-info.json`)
    .then(response => response.json())
    .then(data => {
      if(`${userInfo["hintsUsed"]}`< 3) {
        let hintBox = document.createElement("div")
        let hintImg = document.createElement("img")
        let hintText = document.createElement("span")
  
        hintBox.classList.add("hints")
  
        hintImg.src = "/assets/misc/Hintimg.png"
  
        hintText.innerHTML = `Hint: ${data["hints"][userInfo["hintsUsed"]]}`
    
        hintBox.appendChild(hintImg)
        hintBox.appendChild(hintText)
        document.getElementById("hint-box").appendChild(hintBox)

        userInfo["hintsUsed"]+= 1
      }
    })
    .catch(error => {
      console.log(error);
    });
}

