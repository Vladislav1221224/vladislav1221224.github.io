
function PlayButtonMenu() {
document.getElementById('text')
}
let ratingInfoHtml = document.querySelector('#rating');

function setRatingInfo(value) {
	if (value && typeof value == "number" && value >= 0 && value < 4000) {
		ratingInfoHtml.innerHTML = value;
	}
}
setRatingInfo(1000);

let buttonRightMenu = document.getElementById('btn-navbar');
let rightMenu = document.querySelector('#right-nav-block');
buttonRightMenu.onclick = function (){
	console.log(rightMenu.style.display);
	rightMenu.style.display = rightMenu.style.display === 'block' ? 'none' : 'block'
	console.log(rightMenu.style.display);
}