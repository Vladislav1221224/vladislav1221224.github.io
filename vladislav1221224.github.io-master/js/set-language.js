let selectLanguage;
if(document.querySelector('.change-language')){
	selectLanguage = document.querySelector('.change-language');
}
else if(getGlobalVar('global-hash')){
	selectLanguage = getGlobalVar('global-hash');
}
else{
	selectLanguage = 'en';
	console.log(selectLanguage);
}
if(selectLanguage.value){
		location.href = window.location.pathname + '#' + getGlobalVar('global-hash');
		selectLanguage.value = getGlobalVar('global-hash');
	selectLanguage.addEventListener('change', changeURLLanguage);
}
else if(!window.location.hash){
	changeURLLanguage();
}
const allLanguageName = ['ua','ru','en'];
//Redirect on URL with instruction of language
function changeURLLanguage(){
	let lang;
	if(selectLanguage.value){
		lang = selectLanguage.value;
		saveGlobalVar('global-hash',lang);
	}
	else if(selectLanguage){
		lang = selectLanguage;
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
	if(hash){
		if(!allLanguageName.includes(hash)){
			let hash1;
			if(getGlobalVar('global-hash')){
				hash1 = getGlobalVar('global-hash');
			}
			else{
				hash1 = 'en';
			}
			console.log(hash1);
			location.href = window.location.pathname + '#' + hash1;
			saveGlobalVar('global-hash',hash1);
			console.log(getGlobalVar('global-hash'));
			location.reload();
		}
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

