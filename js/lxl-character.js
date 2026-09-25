
const SECTIONS = ["sobre-mi","proyectos","habilidades","contacto"].map(id=>document.getElementById(id)).filter(Boolean);
if (SECTIONS.length===4 && !document.querySelector("[data-lxl-character]")) {
 const reduced=matchMedia("(prefers-reduced-motion: reduce)"), mobile=matchMedia("(max-width:600px)"), tablet=matchMedia("(max-width:900px)");
 const css=document.createElement("style"); css.dataset.lxlCharacterStyles="";
 css.textContent=`
 :root{--lc-p:#2b0038;--lc-p2:#4a075d;--lc-m:#00f5e6;--lc-r:#ff264d;--lc-g:rgba(0,245,230,.55)}
 .lxl-character-layer{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden;contain:layout paint;isolation:isolate}
 #sobre-mi,#proyectos,#habilidades,#contacto{position:relative;isolation:isolate}
 #sobre-mi>*,#proyectos>*,#habilidades>*,#contacto>*{position:relative;z-index:2}
 .lxl-character{position:absolute;left:0;top:0;width:clamp(76px,8vw,116px);aspect-ratio:1;transform:translate3d(var(--x,0),var(--y,0),0) rotate(var(--r,0deg)) scale(var(--s,1));transform-origin:center;opacity:0;transition:opacity .35s ease,filter .35s ease;will-change:transform,opacity;filter:drop-shadow(0 0 16px var(--lc-g))}
 .lxl-character.is-visible{opacity:.96}.lxl-character__float{position:absolute;inset:0;animation:lcFloat 3.8s ease-in-out infinite}
 .lxl-character__core{position:absolute;inset:20%;border-radius:20%;background:radial-gradient(circle at 28% 20%,rgba(255,255,255,.18),transparent 28%),linear-gradient(145deg,var(--lc-p2),var(--lc-p));border:1px solid rgba(0,245,230,.48);box-shadow:inset 0 0 18px rgba(255,255,255,.06),0 0 14px rgba(0,245,230,.3)}
 .lxl-character__eye{position:absolute;top:42%;width:12%;height:12%;border-radius:28%;background:var(--lc-m);box-shadow:0 0 8px var(--lc-m);transition:.2s ease}.lxl-character__eye--l{left:25%}.lxl-character__eye--r{right:25%}
 .lxl-character__mouth{position:absolute;left:44%;top:58%;width:14%;height:8%;border:3px solid var(--lc-m);border-top:0;border-left-color:transparent;border-right-color:transparent;border-radius:0 0 20px 20px;transition:.2s ease}
 .lxl-character__blush{position:absolute;top:59%;width:10%;height:3px;background:var(--lc-r);box-shadow:0 5px 0 rgba(255,38,77,.65);opacity:.8}.lxl-character__blush--l{left:22%}.lxl-character__blush--r{right:22%}
 .lxl-character__pixel{position:absolute;width:15%;aspect-ratio:1;border-radius:18%;background:var(--lc-m);box-shadow:0 0 10px currentColor;animation:lcOrbit 4.6s ease-in-out infinite}
 .lxl-character__pixel.p1{left:7%;top:15%;scale:.62;color:#fff;background:#fff}.lxl-character__pixel.p2{right:6%;top:12%;scale:.82}.lxl-character__pixel.p3{left:4%;bottom:18%;scale:.74;background:#7f42c6}.lxl-character__pixel.p4{right:3%;bottom:22%;scale:.55;background:var(--lc-r)}.lxl-character__pixel.p5{left:40%;top:2%;scale:.5;background:#fff}
 .lxl-character__signal{position:absolute;left:50%;top:-15%;translate:-50% 0;scale:.7;font:700 18px/1 "Courier New",monospace;color:var(--lc-m);opacity:0;transition:.2s;text-shadow:0 0 8px currentColor}
 .lxl-character[data-state=hello] .lxl-character__signal,.lxl-character[data-state=idea] .lxl-character__signal,.lxl-character[data-state=coding] .lxl-character__signal,.lxl-character[data-state=success] .lxl-character__signal{opacity:1}
 .lxl-character[data-state=hello] .lxl-character__signal:before{content:"✦"}.lxl-character[data-state=idea] .lxl-character__signal:before{content:"?"}.lxl-character[data-state=coding] .lxl-character__signal:before{content:"</>"}.lxl-character[data-state=success] .lxl-character__signal:before{content:"✓"}
 .lxl-character[data-state=focus] .lxl-character__eye,.lxl-character[data-state=success] .lxl-character__eye{height:4%;border-radius:999px}.lxl-character[data-state=curious] .lxl-character__eye--r{scale:.62}
 .lxl-trail-pixel,.lxl-trail-code{position:absolute;opacity:.8;animation:lcTrail .75s ease-out forwards}.lxl-trail-pixel{width:var(--z);height:var(--z);border-radius:2px;background:var(--tone);box-shadow:0 0 9px var(--tone)}.lxl-trail-code{color:var(--lc-m);font:700 10px/1 "Courier New",monospace}
 @keyframes lcFloat{50%{transform:translateY(-7px) rotate(1.5deg)}}@keyframes lcOrbit{50%{translate:4px -5px}}@keyframes lcTrail{to{opacity:0;transform:translate(-12px,8px) scale(.35)}}
 @media(max-width:900px){.lxl-character{width:82px;opacity:.82}}@media(max-width:600px){.lxl-character{width:64px}.lxl-character__pixel.p4,.lxl-character__pixel.p5{display:none}}
 @media(prefers-reduced-motion:reduce){.lxl-character,.lxl-character__float,.lxl-character__pixel{animation:none!important;transition:opacity .2s!important}.lxl-trail-pixel,.lxl-trail-code{display:none!important}}
 html[data-theme=light] .lxl-character,body.light-mode .lxl-character,body.modo-claro .lxl-character{--lc-g:rgba(0,180,170,.24);filter:drop-shadow(0 8px 14px rgba(43,0,56,.15))}
 `; document.head.appendChild(css);

 const layer=document.createElement("div"); layer.className="lxl-character-layer"; layer.setAttribute("aria-hidden","true");
 const ch=document.createElement("div"); ch.className="lxl-character"; ch.dataset.lxlCharacter=""; ch.dataset.state="idle";
 ch.innerHTML=`<div class="lxl-character__float"><span class="lxl-character__signal"></span><span class="lxl-character__pixel p1"></span><span class="lxl-character__pixel p2"></span><span class="lxl-character__pixel p3"></span><span class="lxl-character__pixel p4"></span><span class="lxl-character__pixel p5"></span><div class="lxl-character__core"><span class="lxl-character__eye lxl-character__eye--l"></span><span class="lxl-character__eye lxl-character__eye--r"></span><span class="lxl-character__mouth"></span><span class="lxl-character__blush lxl-character__blush--l"></span><span class="lxl-character__blush lxl-character__blush--r"></span></div></div>`;
 layer.appendChild(ch); document.body.prepend(layer);
 let timer=0,ticking=false,lastX=0,lastY=0,lastTrail=0;
 const state=(s,ms=0)=>{clearTimeout(timer);ch.dataset.state=s;if(ms)timer=setTimeout(()=>ch.dataset.state="idle",ms)};
 const anchors=()=>SECTIONS.map((s,i)=>{const r=s.getBoundingClientRect(),top=r.top+scrollY,right=i%2===1;return{x:right?Math.min(innerWidth-115,r.right-Math.min(70,r.width*.08)):Math.max(12,r.left+Math.min(55,r.width*.07)),y:top+Math.min(Math.max(r.height*.34,150),r.height-120)}});
 const trail=(x,y,speed)=>{if(reduced.matches||mobile.matches||speed<1.4)return;const now=performance.now();if(now-lastTrail<(tablet.matches?130:80))return;lastTrail=now;const p=document.createElement("span"),code=Math.random()<.12;p.className=code?"lxl-trail-code":"lxl-trail-pixel";if(code)p.textContent=["{}","[]","01","</>"][Math.floor(Math.random()*4)];else{p.style.setProperty("--z",(4+Math.random()*6)+"px");p.style.setProperty("--tone",["#00f5e6","#fff","#ff264d","#7f42c6"][Math.floor(Math.random()*4)])}p.style.left=(x+42+(Math.random()-.5)*20)+"px";p.style.top=(y+42+(Math.random()-.5)*20)+"px";layer.appendChild(p);p.addEventListener("animationend",()=>p.remove(),{once:true})};
 const update=()=>{ticking=false;const pts=anchors(),center=scrollY+innerHeight*.5,first=SECTIONS[0].offsetTop,last=SECTIONS[3].offsetTop+SECTIONS[3].offsetHeight;if(center<first||center>last+innerHeight*.25){ch.classList.remove("is-visible");return}ch.classList.add("is-visible");let seg=0;for(let i=0;i<3;i++)if(center>=SECTIONS[i+1].offsetTop)seg=i+1;const next=Math.min(seg+1,3),a=SECTIONS[seg].offsetTop,b=next===seg?a+1:SECTIONS[next].offsetTop,t=Math.max(0,Math.min(1,(center-a)/(b-a))),e=t*t*(3-2*t),curve=Math.sin(t*Math.PI)*(seg%2===0?38:-38),x=pts[seg].x+(pts[next].x-pts[seg].x)*e+curve,y=pts[seg].y+(pts[next].y-pts[seg].y)*e,speed=Math.hypot(x-lastX,y-lastY);ch.style.setProperty("--x",x+"px");ch.style.setProperty("--y",y+"px");ch.style.setProperty("--r",((t-.5)*5)+"deg");trail(lastX||x,lastY||y,speed);lastX=x;lastY=y;if(ch.dataset.state==="idle")state(["hello","coding","focus","contact"][seg])};
 const request=()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}};addEventListener("scroll",request,{passive:true});addEventListener("resize",request,{passive:true});
 const bind=(selector,s)=>document.querySelectorAll(selector).forEach(el=>{el.addEventListener("mouseenter",()=>state(s));el.addEventListener("mouseleave",()=>state("idle",80));el.addEventListener("focusin",()=>state(s));el.addEventListener("focusout",()=>state("idle",80))});
 bind("#proyectos .project-flip-card","coding");bind("#habilidades .skill-card","curious");bind("#contacto a","contact");bind("#sobre-mi .sobre-mi-canal-visual__icono","idea");
 const photo=(selector,s)=>document.querySelectorAll(selector).forEach(el=>{el.addEventListener("mouseenter",()=>{state(s);ch.style.setProperty("--s","1.09")});el.addEventListener("mouseleave",()=>{ch.style.setProperty("--s","1");state("idle",100)})});
 photo("#sobre-mi .sobre-mi-fiel-contacto__foto","hello");photo("#contacto .contacto-imagen-foto","success");
 document.querySelectorAll("#habilidades .skill-card").forEach(card=>{let h;card.addEventListener("mouseenter",()=>h=setTimeout(()=>state("idea"),650));card.addEventListener("mouseleave",()=>clearTimeout(h))});
 if(mobile.matches){const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){state(["hello","coding","focus","contact"][SECTIONS.indexOf(e.target)]||"idle",900);request()}}),{threshold:.25});SECTIONS.forEach(s=>o.observe(s))}
 request();
}
