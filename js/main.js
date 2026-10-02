// Comportamiento de la página: tema, menú móvil, animaciones de entrada y enlace activo.
(function () {
	'use strict';

	var root = document.documentElement;
	root.classList.add('js');

	// Tema claro/oscuro (el valor inicial lo aplica el script del <head>)
	document.getElementById('theme_toggle').addEventListener('click', function () {
		var isDark = root.getAttribute('data-theme') === 'dark' ||
			(!root.hasAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
		var next = isDark ? 'light' : 'dark';
		root.setAttribute('data-theme', next);
		try { localStorage.setItem('theme', next); } catch (e) {}
	});

	// Menú móvil
	var nav = document.getElementById('nav');
	var menuBtn = document.getElementById('menu_toggle');
	function setMenu(open) {
		nav.classList.toggle('open', open);
		menuBtn.setAttribute('aria-expanded', String(open));
	}
	menuBtn.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
	nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });

	// Animaciones de entrada
	var reveals = document.querySelectorAll('.reveal');
	if ('IntersectionObserver' in window) {
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
					io.unobserve(entry.target);
				}
			});
		}, { threshold: 0.12 });
		reveals.forEach(function (el) { io.observe(el); });
	} else {
		reveals.forEach(function (el) { el.classList.add('visible'); });
	}

	// Enlace activo según la sección visible
	var links = {};
	nav.querySelectorAll('a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
	if ('IntersectionObserver' in window) {
		var spy = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) return;
				Object.keys(links).forEach(function (id) { links[id].classList.remove('active'); });
				if (links[entry.target.id]) links[entry.target.id].classList.add('active');
			});
		}, { rootMargin: '-45% 0px -50% 0px' });
		spy.observe(document.querySelector('.hero'));
		Object.keys(links).forEach(function (id) {
			var section = document.getElementById(id);
			if (section) spy.observe(section);
		});
	}
})();
