import{a as p,S as m,i as a}from"./assets/vendor-CYMld6vM.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();function h(n){return p.get("https://pixabay.com/api/?key=52802727-e127d4f3f7eb26b70bb46f136&q="+encodeURIComponent(n)+"&orientation=horizontal&image_type=photo&safesearch=true").then(r=>r.data).catch(r=>{console.log(r)})}const y=new m(".gallery a",{captionsData:"alt",captionDelay:250}),f=document.querySelector(".gallery"),s=document.querySelector(".loader");function g(n){const r=n.map(t=>`
			<li class="cart">
				<a class="photo_link" href="${t.largeImageURL}">
					<img class="photo_image" src="${t.webformatURL}" alt="${t.tags}" />
				</a>
				<div class="photo_info">
					<p><b>Likes:</b> ${t.likes}</p>
					<p><b>Views:</b> ${t.views}</p>
					<p><b>Comments:</b> ${t.comments}</p>
					<p><b>Downloads:</b> ${t.downloads}</p>
				</div>
			</li>`).join("");f.insertAdjacentHTML("beforeend",r),y.refresh()}function b(){f.innerHTML=""}function L(){s&&s.classList.remove("hidden")}function l(){s&&s.classList.add("hidden")}const d=document.querySelector(".form"),u=d.elements["search-text"];d.addEventListener("submit",w);function w(n){n.preventDefault();const r=u.value.trim();if(!r){a.warning({title:"Warning",message:"Please enter a search query."});return}L(),b(),h(r).then(t=>{if(l(),t.hits.length===0){a.error({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"center",timeout:3e3});return}g(t.hits),u.value=""}).catch(t=>{l(),a.error({title:"Error",message:"Something went wrong. Please try again later."}),console.error(t)})}
//# sourceMappingURL=index.js.map
