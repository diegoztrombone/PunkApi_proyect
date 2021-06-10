const menuNode = document.getElementById("menu");
const navNode = document.getElementById("nav");

menuNode.addEventListener("click", () => {
  menuNode.classList.toggle("change");
  navNode.classList.toggle("change");
});
