
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