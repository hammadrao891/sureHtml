"use strict";(self.webpackChunkproject=self.webpackChunkproject||[]).push([["partners"],{827:(e,t,n)=>{var r=n(642),o=n(82),i=n(187);document.addEventListener("DOMContentLoaded",(()=>{a(),c()}));const a=()=>{r.p8.registerPlugin(o.i);const e=document.querySelector(".scrollTrigger-scroller"),t=document.querySelectorAll(".tab-navigation-link"),n=document.querySelectorAll(".tab-item");let i,a=!1,c=!1;const l=e=>{const i=n[e],c=t[e];if(!i.classList.contains("active")){if(a)return;a=!0,t.forEach((e=>{e.classList.remove("active")})),c.classList.add("active"),n.forEach(((t,c)=>{const l=r.p8.timeline({paused:!0,ease:"ease.out"});l.to(t,{duration:.4,opacity:0}).to(t.querySelector(".content"),{duration:.4,scale:.95},"<").to(t.querySelector(".media"),{duration:.4,scale:.95,onComplete:()=>{r.p8.set(r.p8.utils.toArray(n),{display:"none"}),r.p8.set(i,{clearProps:"display"}),window.innerWidth>1023&&(document.querySelector(".tab-container").style.minHeight=document.querySelectorAll(".tab-item")[e].querySelector(".layout").clientHeight+40+"px",o.i.getById("tabScroller").refresh()),t.classList.remove("active"),i.classList.add("active"),r.p8.set(i.querySelector(".content"),{xPercent:-5,scale:1}),r.p8.set(i.querySelector(".media"),{xPercent:5,scale:1});const c=r.p8.timeline({paused:!0,ease:"ease.out"}),l=t.querySelector(".lottie-animation-container");c.to(i,{duration:.2,opacity:1}).to(i.querySelector(".content"),{duration:.2,xPercent:0},"<").to(i.querySelector(".media"),{duration:.2,xPercent:0},"<"),c.play(),l.lottieAnimation.goToAndPlay(0),a=!1}},"<"),l.play()}))}};return t.forEach(((e,t)=>{e.addEventListener("click",(e=>{e.preventDefault(),(e=>{if(!(window.innerWidth<1024)&&i){const t=i.start+e*((i.end-i.start)/n.length);i.scroll(t+40)}})(t),window.innerWidth>=1024||l(t)}))})),l(0),new Promise(((t,r)=>{o.i.matchMedia({"(min-width: 1024px)":()=>{i=o.i.create({trigger:e,id:"tabScroller",start:()=>`top top-=${(()=>{let t=getComputedStyle(document.querySelector(":root")),n=parseInt(t.getPropertyValue("--sectionPaddingY"));return e.querySelector(".shared-heading").clientHeight+n})()+40-document.querySelector("header").clientHeight}px`,end:()=>`top+=${window.innerHeight*n.length}px center`,pin:!0,scrub:!0,toggleActions:"play none none reverse",invalidateOnRefresh:!0,onUpdate:e=>{if(a)return;let t=Math.floor(e.progress*n.length);t=Math.min(n.length-1,t),l(t),o.i.getAll().forEach((e=>{e.trigger.classList.contains("tab-container")||e.trigger.classList.contains("tab-navigation")||e.refresh()}))}})}}),c=!0,t()}))},c=async()=>{const e=document.querySelectorAll(".lottie-animation-container");for(const t of e){const e=t.getAttribute("data-animation-json"),n=await(0,i.H)(e,t);t.lottieAnimation=n}}},187:(e,t,n)=>{n.d(t,{H:()=>i});var r=n(248),o=n.n(r);const i=async(e,t)=>{try{const n=await fetch(e),r=await n.json();return o().loadAnimation({container:t,renderer:"svg",loop:!1,autoplay:!1,animationData:r})}catch(e){return console.error("Error loading Lottie animation:",e),null}}}},e=>{e.O(0,["vendors/lottie","vendors/index","vendors/gsap-core","vendors/ScrollTrigger","vendors/Observer","vendors/CSSPlugin"],(()=>(827,e(e.s=827)))),e.O()}]);