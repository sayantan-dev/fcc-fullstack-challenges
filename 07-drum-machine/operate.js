const drumPads = document.querySelectorAll(".drum-pad");
const displayElement = document.getElementById("display");

function triggerAudio(audioNode, parentPad) {
  if (!audioNode) return;
  
  audioNode.currentTime = 0;
  audioNode.play().catch(err => console.log("Playback blocked:", err));
  
  displayElement.innerText = parentPad.id.toUpperCase().replace(/-/g, " ");
  
  parentPad.classList.add("active");
  setTimeout(() => {
    parentPad.classList.remove("active");
  }, 100);
}

drumPads.forEach(pad => {
  pad.addEventListener("click", () => {
    const audioNode = pad.querySelector(".clip");
    triggerAudio(audioNode, pad);
  });
});

window.addEventListener("keydown", (e) => {
  const targetKey = e.key.toUpperCase();
  const audioNode = document.getElementById(targetKey);
  
  if (audioNode && audioNode.classList.contains("clip")) {
    const parentPad = audioNode.parentElement;
    triggerAudio(audioNode, parentPad);
  }
});
