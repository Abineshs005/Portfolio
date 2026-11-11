const $=(s,r=document)=>r.querySelector(s);
$('#menu').onclick=e=>{const o=$('#nav').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',o)};
document.querySelectorAll('#nav a').forEach(a=>a.onclick=()=>$('#nav').classList.remove('open'));
// Project filter by technology
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.filters button').forEach(x=>x.classList.toggle('on',x===b));
  const f=b.dataset.f;
  document.querySelectorAll('.pj .box').forEach(c=>c.hidden=!(f==='all'||c.dataset.t.split(' ').includes(f)));
});
// Highlight current section in nav
const links=[...document.querySelectorAll('#nav a')];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('section[id]').forEach(s=>io.observe(s));
