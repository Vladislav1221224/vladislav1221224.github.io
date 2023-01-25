const selectLanguage = document.querySelector('.change-language');
if(selectLanguage){
		location.href = window.location.pathname + '#' + getGlobalVar('global-hash');
		selectLanguage.value = getGlobalVar('global-hash');
	selectLanguage.addEventListener('change', changeURLLanguage);
}else if(!window.location.hash){
	changeURLLanguage();
}
const allLanguageName = ['ua','ru','en'];
//Redirect on URL with instruction of language
function changeURLLanguage(){
	let lang;
	if(selectLanguage){
		lang = selectLanguage.value;
		saveGlobalVar('global-hash',lang);
	}
	else{
		lang = getGlobalVar('global-hash');
	}
	location.href = window.location.pathname + '#' + lang;
	location.reload();
}
function changeLanguage(){
	let hash = window.location.hash;
	hash = hash.substr(1);
	console.log(hash);
	if(!allLanguageName.includes(hash)){
		location.href = window.location.pathname + '#' + getGlobalVar('global-hash');
		location.reload();
	}
	if(selectLanguage){
		selectLanguage.value = hash;
	}
	for(let key in langArr){
		let element = document.querySelector('.lng-' + key);
			if(element){
			element.innerHTML = langArr[key][hash];
		}
	}
}
function saveGlobalVar(name,value) {
	localStorage.setItem(name,value); // сохраняем в localStorage значение
}
function getGlobalVar(name) {
	return localStorage.getItem(name); // получаем значение свойства localStorage
}
changeLanguage();
console.log('global-hash = ' + getGlobalVar('global-hash'));

