let userInfo = {
    "level": 1,
    "hintsUsed": 0,
}

const emojiContainer = document.getElementById("emojiDisplay")
const emojisHolder = document.createElement("div")


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
  
    let level1 = {
      "answer": "cowboy hat",
      "hints": ["Yee Haw!", "Er..Cowboys wear them?"],
  }
}