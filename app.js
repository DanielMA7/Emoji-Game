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
const answerValidatorSpace = document.getElementById("answer-validation-display")

// Setting loading the images for each level based on the user info

function loadLevel (){
  document.getElementById("emoji-display").innerHTML = "";
  fetch(`https://danielma7.github.io/Moji/assets/level${userInfo["level"]}/image-list.json`)
    .then(response => response.json())
    .then(data => {
      data.forEach(filename => {
        var img = document.createElement('img');
        img.src = `https://danielma7.github.io/Moji/assets/level${userInfo["level"]}/images/` + filename;
        emojiContainer.appendChild(img);
        if(userInfo["level"] == 11) {
        levelIndicator.innerHTML = "The end!"
        }else{
          levelIndicator.innerHTML = `Level: ${userInfo["level"]}`
        }
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
  fetch(`./levelinfo/level${userInfo["level"]}-info.json`)
    .then(response => response.json())
    .then(data => {
      if(`${userInfo["hintsUsed"]}`< data["hints"].length) {
        let hintBox = document.createElement("div")
        let hintImg = document.createElement("img")
        let hintText = document.createElement("span")
  
        hintBox.classList.add("hints")
  
        hintImg.src = "./assets/misc/Hintimg.png"
  
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

// Correct or Incorrect reaction

function answerReaction(result) {
  if(result == 1) {
    document.getElementById("answer-validation-display").innerHTML= "";
    let reactionBox = document.createElement("div");
    let reactionImg = document.createElement("img");
    let reactionText = document.createElement("span");
  
    reactionBox.classList.add("correct-answer");
  
    reactionImg.src = "./assets/misc/correct-img.png";
  
    reactionText.innerHTML = "Congratulations! You got it!";
    
    reactionBox.appendChild(reactionImg);
    reactionBox.appendChild(reactionText);
    document.getElementById("answer-validation-display").appendChild(reactionBox);
    setTimeout(function(){
      document.getElementById("answer-validation-display").innerHTML= "";
    },3000)
  }else if(result == 2){
    document.getElementById("answer-validation-display").innerHTML= "";
    let reactionBox = document.createElement("div");
    let reactionImg = document.createElement("img");
    let reactionText = document.createElement("span");
    
    reactionBox.classList.add("incorrect-answer");
    
    reactionImg.src = "./assets/misc/incorrect-img.png";
    
    reactionText.innerHTML = "Unlucky! Try again!";
      
    reactionBox.appendChild(reactionImg);
    reactionBox.appendChild(reactionText);
    document.getElementById("answer-validation-display").appendChild(reactionBox);
    setTimeout(function(){
      document.getElementById("answer-validation-display").innerHTML= "";
    },3000)
  }else if(result == 3) {
    document.getElementById("answer-validation-display").innerHTML= "";
    let reactionBox = document.createElement("div");
    let reactionImg = document.createElement("img");
    let reactionText = document.createElement("span");
    
    reactionBox.classList.add("winner-reaction");
    
    reactionImg.src = "./assets/misc/correct-img.png";
    
    reactionText.innerHTML = "You win!!!";
      
    reactionBox.appendChild(reactionImg);
    reactionBox.appendChild(reactionText);
    document.getElementById("answer-validation-display").appendChild(reactionBox);
  }
}

// Validating the answer

function submitAnswer () {
  let userGuess = guessInput.value.toLowerCase()

  fetch(`./levelinfo/level${userInfo["level"]}-info.json`)
    .then(response => response.json())
    .then(data => {
      let levelAnswer = data["answer"]
      if (levelAnswer == userGuess) {
        if(userInfo["level"] == 10) {
          answerReaction(3)
          guessInput.value= ""
          guessInput.setAttribute('disabled', '')
          guessInput.setAttribute("placeholder", "Refresh to play again!")
          userInfo["level"]++
          userInfo["hintsUsed"] = 0
          document.getElementById("hint-box").innerHTML = "";
          loadLevel()
        }else{
          answerReaction(1)
          guessInput.value= ""
          userInfo["level"]++
          userInfo["hintsUsed"] = 0
          document.getElementById("hint-box").innerHTML = "";
          loadLevel()
        }
        
      }else{
        answerReaction(2)
      }
    })
    .catch(error => {
      console.log(error);
    });
}

// Allowing for users to press "enter" to submit answers

document.getElementById("guess-input").addEventListener("keydown", function (e) {
  if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
      submitAnswer();
  }
});


