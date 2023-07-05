// Creating user info

let userInfo = {
    "level": 1,
    "hintsUsed": 0,
}

// Setting important variables for the document

const emojiContainer = document.getElementById("emoji-display")
const hintBtn = document.getElementById("hint-btn")
const guessInput = document.getElementById("guess-input")
const levelIndicator = document.getElementById("level-indicator")

// Setting loading the images for each level based on the user info

function loadLevel (){
  document.getElementById("emoji-display").innerHTML = "";
  fetch(`/assets/level${userInfo["level"]}/image-list.json`)
    .then(response => response.json())
    .then(data => {
      data.forEach(filename => {
        var img = document.createElement('img');
        img.src = `/assets/level${userInfo["level"]}/images/` + filename;
        emojiContainer.appendChild(img);
        levelIndicator.innerHTML = `Level: ${userInfo["level"]}`
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

// Validating the answer

function submitAnswer () {
  let userGuess = guessInput.value.toLowerCase()

  fetch(`/levelinfo/level${userInfo["level"]}-info.json`)
    .then(response => response.json())
    .then(data => {
      let levelAnswer = data["answer"]
      if (levelAnswer == userGuess) {
        userInfo["level"]++
        userInfo["hintsUsed"] = 0
        document.getElementById("hint-box").innerHTML = "";
        guessInput.value= ""
        loadLevel()
      }else{
        
      }
    })
    .catch(error => {
      console.log(error);
    });

  console.log(userGuess)
}


