const menuNode = document.getElementById("menu");
const navNode = document.getElementById("nav");
const bgNode = document.getElementById("menu-bg");

menuNode.addEventListener("click", () => {
  console.log("entra");
  menuNode.classList.toggle("change");
  bgNode.classList.toggle("change-bg");
  navNode.classList.toggle("change");
});
