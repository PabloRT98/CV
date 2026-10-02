// i18n: carga langs/<idioma>.json y rellena los elementos [data-translate].
// Atributos: data-translate-attr="atributo:clave" (varios separados por coma).
var langs = ['en', 'es'];
var currentLang = 'es'; // idioma por defecto

try {
	var saved = localStorage.getItem('lang');
	if (langs.indexOf(saved) !== -1) currentLang = saved;
} catch (e) {}

function translate(strings) {
	document.querySelectorAll('[data-translate]').forEach(function (el) {
		var value = strings[el.getAttribute('data-translate')];
		if (value !== undefined) el.innerHTML = value;
	});

	document.querySelectorAll('[data-translate-attr]').forEach(function (el) {
		el.getAttribute('data-translate-attr').split(',').forEach(function (pair) {
			var parts = pair.split(':');
			var value = strings[parts[1].trim()];
			if (value !== undefined) el.setAttribute(parts[0].trim(), value);
		});
	});

	document.documentElement.lang = currentLang;
	if (strings.page_title) document.title = strings.page_title;
	var meta = document.querySelector('meta[name="description"]');
	if (meta && strings.meta_description) meta.setAttribute('content', strings.meta_description);
	var cv = document.getElementById('cv_link');
	if (cv && strings.cv_pdf_link) cv.setAttribute('href', strings.cv_pdf_link);
}

function loadLang(lang) {
	return fetch('./langs/' + lang + '.json')
		.then(function (res) { return res.json(); })
		.then(function (strings) {
			currentLang = lang;
			translate(strings);
			try { localStorage.setItem('lang', lang); } catch (e) {}
		});
}

window.change_lang = function () {
	return loadLang(currentLang === 'es' ? 'en' : 'es');
};

document.getElementById('change_lang').addEventListener('click', function (e) {
	e.preventDefault();
	window.change_lang();
});

loadLang(currentLang);
