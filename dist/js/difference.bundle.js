"use strict";(self.webpackChunkproject=self.webpackChunkproject||[]).push([["difference"],{780:(e,t,o)=>{var n=o(592),r=o(550),i=o(642),a=o(82),c=o(187);document.addEventListener("DOMContentLoaded",(()=>{s(),l(),d().then((e=>{})),u()}));const s=()=>{const e=document.querySelector(".swiper-carousel");e&&new n.Z(`.${e.className}`,{modules:[r.pt],slidesPerView:2,spaceBetween:10,loop:!0,centeredSlides:!0,maxBackfaceHiddenSlides:!1,breakpoints:{0:{slidesPerView:2,spaceBetween:10},768:{slidesPerView:2.5,spaceBetween:40},1024:{slidesPerView:3,spaceBetween:40},1280:{slidesPerView:3.5,spaceBetween:40}}})},l=()=>{i.p8.registerPlugin(a.i);const e=document.querySelectorAll(".difference-prism .prism"),t=document.querySelectorAll(".difference-rings .ring"),o=document.querySelectorAll(".difference-points .point"),n=document.querySelectorAll(".difference-content-item"),r=document.querySelector(".difference-graphic");i.p8.set(i.p8.utils.toArray(e),{scale:.75,opacity:0}),i.p8.set(i.p8.utils.toArray(t),{scale:0}),i.p8.set(i.p8.utils.toArray(o),{scale:0}),i.p8.set(i.p8.utils.toArray(n),{opacity:0,yPercent:25});const c=.3,s="expo.out",l="back.out(1.5)",d=i.p8.timeline({paused:!0});d.to(e[0],{scale:1,opacity:1,duration:.3,ease:"expo.out"}),d.add("content");for(let e=0;e<1;e++)d.to(t[e],{scale:1,duration:c,ease:s},"content+="+e*c);d.to(o[1],{scale:1,duration:.3,ease:l},">");for(let e=1;e<5;e++)d.to(t[e],{scale:1,duration:c,ease:s},"content+="+e*c);d.to(o[2],{scale:1,duration:.3,ease:l},">");for(let e=5;e<6;e++)d.to(t[e],{scale:1,duration:c,ease:s},"content+="+e*c);d.to(o[0],{scale:1,duration:.3,ease:l},">");for(let e=0;e<6;e++)d.to(n[e],{opacity:1,yPercent:0,duration:.3,ease:"expo.out"},"content+="+.3*e);a.i.create({trigger:r,id:"graphic",start:()=>"top center",end:"top center",animation:d,toggleActions:"play none none none"}),n.forEach(((e,t)=>{let o=getComputedStyle(document.querySelector(":root")),n=parseInt(o.getPropertyValue("--sectionPaddingY"));i.p8.set(e,{"will-change":"transform, opacity",opacity:0,yPercent:15});const r=e.parentNode.querySelectorAll(".difference-content-item");a.i.matchMedia({"(max-width: 767px)":()=>{a.i.batch(r,{id:"reveal-batch-on-scroll",start:()=>"top bottom-="+.5*n,end:()=>"bottom top+="+.5*n,invalidateOnRefresh:!0,onEnter:e=>(e=>{i.p8.to(e,{opacity:1,yPercent:0,stagger:.1})})(e)})}})}))},d=()=>{i.p8.registerPlugin(a.i);const e=document.querySelector(".scrollTrigger-scroller"),t=document.querySelectorAll(".tab-navigation-link"),o=document.querySelectorAll(".tab-item");let n,r=!1,c=!1;const s=e=>{const n=o[e],c=t[e];if(!n.classList.contains("active")){if(r)return;r=!0,t.forEach((e=>{e.classList.remove("active")})),c.classList.add("active"),o.forEach(((t,c)=>{const s=i.p8.timeline({paused:!0,ease:"ease.out"});s.to(t,{duration:.4,opacity:0}).to(t.querySelector(".content"),{duration:.4,scale:.95},"<").to(t.querySelector(".media"),{duration:.4,scale:.95,onComplete:()=>{i.p8.set(i.p8.utils.toArray(o),{display:"none"}),i.p8.set(n,{clearProps:"display"}),window.innerWidth>1023&&(document.querySelector(".tab-container").style.minHeight=document.querySelectorAll(".tab-item")[e].querySelector(".layout").clientHeight+40+"px",a.i.getById("tabScroller").refresh()),t.classList.remove("active"),n.classList.add("active"),i.p8.set(n.querySelector(".content"),{xPercent:-5,scale:1}),i.p8.set(n.querySelector(".media"),{xPercent:5,scale:1});const c=i.p8.timeline({paused:!0,ease:"ease.out"}),s=t.querySelector(".lottie-animation-container");c.to(n,{duration:.2,opacity:1}).to(n.querySelector(".content"),{duration:.2,xPercent:0},"<").to(n.querySelector(".media"),{duration:.2,xPercent:0},"<"),c.play(),s.lottieAnimation.goToAndPlay(0),r=!1}},"<"),s.play()}))}};t.forEach(((e,t)=>{e.addEventListener("click",(e=>{e.preventDefault(),(e=>{if(!(window.innerWidth<1024)&&n){const t=n.start+e*((n.end-n.start)/o.length);n.scroll(t+40)}})(t),window.innerWidth>=1024||s(t)}))}));const l=()=>{let t=getComputedStyle(document.querySelector(":root")),o=parseInt(t.getPropertyValue("--sectionPaddingY"));return e.querySelector(".shared-heading").clientHeight+o};return s(0),new Promise(((t,i)=>{a.i.matchMedia({"(min-width: 1024px)":()=>{n=a.i.create({trigger:e,id:"tabScroller",start:()=>`top+=${l()-document.querySelector("header").clientHeight}px center-=${l()}px`,end:()=>`top+=${window.innerHeight*o.length}px center`,pin:!0,scrub:!0,toggleActions:"play none none reverse",invalidateOnRefresh:!0,onUpdate:e=>{if(r)return;let t=Math.floor(e.progress*o.length);t=Math.min(o.length-1,t),s(t),a.i.getAll().forEach((e=>{e.trigger.classList.contains("tab-container")||e.trigger.classList.contains("tab-navigation")||e.refresh()}))}})}}),c=!0,t()}))},u=async()=>{const e=document.querySelectorAll(".lottie-animation-container");for(const t of e){const e=t.getAttribute("data-animation-json"),o=await(0,c.H)(e,t);t.lottieAnimation=o}}},187:(e,t,o)=>{o.d(t,{H:()=>i});var n=o(248),r=o.n(n);const i=async(e,t)=>{try{const o=await fetch(e),n=await o.json();return r().loadAnimation({container:t,renderer:"svg",loop:!1,autoplay:!1,animationData:n})}catch(e){return console.error("Error loading Lottie animation:",e),null}}}},e=>{e.O(0,["vendors/lottie","vendors/swiper-core-mjs","vendors/zoom-mjs","node_modules_swiper_modules_index_mjs-node_modules_swiper_swiper_mjs","vendors/index","vendors/gsap-core","vendors/ScrollTrigger","vendors/Observer","vendors/CSSPlugin"],(()=>(780,e(e.s=780)))),e.O()}]);