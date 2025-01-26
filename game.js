const gameOutput = document.getElementById("game-output")
const playerInput = document.getElementById("player-input")
const submitAction = document.getElementById("submit-action")

let currentScene = "start"

const scenes = {
  start: {
    description:
      "Welcome, brave adventurer! You find yourself at the entrance of a dark, mysterious cave. The air is thick with the scent of adventure and danger. What do you do?  ",
    options: ["enter cave", "examine surroundings", "turn back"],
  },
  cave: {
    description:
      "You've entered the cave. It's dark and damp, with strange echoes bouncing off the walls. You see two tunnels ahead: one to the left and one to the right.",
    options: ["go left", "go right", "listen carefully"],
  },
  leftTunnel: {
    description:
      "The left tunnel leads you to a chamber filled with glittering treasures! But there's a sleeping dragon guarding it.",
    options: ["fight dragon", "sneak past", "leave quietly"],
  },
  rightTunnel: {
    description:
      "The right tunnel opens up into a vast underground lake. You see a small boat tied to a rocky outcrop.",
    options: ["take boat", "swim across", "search area"],
  },
}


function updateGameOutput(text) {
  gameOutput.innerHTML += text + "\n\n"
  gameOutput.scrollTop = gameOutput.scrollHeight
}

function handlePlayerAction() {
  const action = playerInput.value.toLowerCase().trim()
  playerInput.value = ""

  updateGameOutput(`> ${action}`)

  // Simulate AI response
  setTimeout(() => {
    let response

    if (currentScene === "start") {
      if (action === "enter cave") {
        currentScene = "cave"
        response = scenes.cave.description
      } else if (action === "examine surroundings") {
        response =
          "You notice strange markings around the cave entrance. They seem to be ancient runes, warning of dangers within."
      } else if (action === "turn back") {
        response =
          "As you turn to leave, you hear a mysterious voice echoing from the cave: 'Your destiny awaits within...' Do you reconsider?"
      } else {
        response = "I'm not sure what you mean. Try one of these actions: " + scenes[currentScene].options.join(", ")
      }
    } else if (currentScene === "cave") {
      if (action === "go left") {
        currentScene = "leftTunnel"
        response = scenes.leftTunnel.description
      } else if (action === "go right") {
        currentScene = "rightTunnel"
        response = scenes.rightTunnel.description
      } else if (action === "listen carefully") {
        response = "You hear a faint rumbling from the left tunnel and the sound of water from the right."
      } else {
        response = "I'm not sure what you mean. Try one of these actions: " + scenes[currentScene].options.join(", ")
      }
    } else if (currentScene === "leftTunnel" || currentScene === "rightTunnel") {
      response = "The adventure continues... (This part of the story is yet to be written by our AI Dungeon Master)"
      currentScene = "start" // Reset to start for this demo
    }

    updateGameOutput(response)
  }, 1000) // Simulate AI thinking time
}

submitAction.addEventListener("click", handlePlayerAction)
playerInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handlePlayerAction()
  }
})
// Reset button functionality
document.getElementById("resetButton").addEventListener("click", () => {
  // Clear the input field
  const inputField = document.querySelector("input[type='text']");
  inputField.value = "";

  // Reset the game content area
  const gameContent = document.querySelector(".game-output"); // Update this selector based on your HTML
  gameContent.innerHTML = "Welcome, brave adventurer! You find yourself at the entrance of a dark, mysterious cave. The air is thick with the scent of adventure and danger. What do you do?";
  
  console.log("Game has been reset!");
});

// Start the game
updateGameOutput(scenes.start.description)


