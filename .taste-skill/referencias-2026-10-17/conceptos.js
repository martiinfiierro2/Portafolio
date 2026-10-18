
const site=document.querySelector('.site'),params=new URLSearchParams(location.search),checkbox=document.querySelector('.switch input');
site.dataset.theme=params.get('theme')==='dark'?'dark':'light';
function applyTheme(){const dark=site.dataset.theme==='dark';checkbox.checked=dark;checkbox.setAttribute('aria-label',dark?'Activar tema claro':'Activar tema oscuro');document.querySelectorAll('[data-original-portrait]').forEach(img=>img.src='/illustrations/martin-'+(dark?'dark':'light')+'.png');document.documentElement.style.colorScheme=dark?'dark':'light';document.documentElement.style.backgroundColor=getComputedStyle(site).getPropertyValue('--bg');}
applyTheme();checkbox.addEventListener('change',()=>{site.dataset.theme=checkbox.checked?'dark':'light';applyTheme()});
const nav=document.querySelector('.header nav'),trigger=document.createElement('button');trigger.type='button';trigger.className='menu-trigger';trigger.setAttribute('aria-label','Abrir navegación');trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-controls','mobile-links');trigger.innerHTML='<span></span>';nav.prepend(trigger);nav.querySelector('ul').id='mobile-links';
function menu(open){nav.toggleAttribute('data-open',open);trigger.setAttribute('aria-expanded',String(open));trigger.setAttribute('aria-label',open?'Cerrar navegación':'Abrir navegación')}
trigger.addEventListener('click',()=>menu(!nav.hasAttribute('data-open')));document.addEventListener('click',e=>{if(!nav.contains(e.target))menu(false)});document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu(false);trigger.focus()}});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu(false)));
const observer=new IntersectionObserver(entries=>{const entry=entries.find(e=>e.isIntersecting);if(entry){nav.querySelectorAll('a').forEach(a=>a.toggleAttribute('data-active',a.hash==='#'+entry.target.id));nav.querySelectorAll('a').forEach(a=>{if(a.hash==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}},{rootMargin:'-15% 0px -70% 0px'});
['inicio','proyectos','sobre-mi','contacto'].forEach(id=>observer.observe(document.getElementById(id)));

