(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){document.removeEventListener("keydown",n),e.removeEventListener("click",r),e.classList.remove("popup_opened")}e.d({},{x:()=>B});var n=function(e){27==e.keyCode&&(e.preventDefault(),t(document.querySelector(".popup_opened")))},r=function(e){(e.target.classList.contains("popup")||e.target.classList.contains("popup__exit-button"))&&t(e.currentTarget)};function o(e){e.classList.add("popup_opened"),document.addEventListener("keydown",n),e.addEventListener("click",r)}var a={formSelector:".popup__form",inputSelector:".popup__item",errorClass:"popup__error-message_visible",inputInvalidClass:"popup__item_invalid",buttonSelector:".popup__button",buttonDisabledClass:"popup__button_disabled"},c=function(e,t){e.classList.add(t.buttonDisabledClass),e.disabled=!0},u=function(e,t,n){var r=e.querySelector(n.buttonSelector);!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?function(e,t){e.classList.remove(t.buttonDisabledClass),e.disabled=!1}(r,n):c(r,n)},i={url:"https://nomoreparties.co/v1/plus-cohort7",headers:{authorization:"8ced4900-b351-425e-b929-76d82504c0ac","Content-Type":"application/json"}},l=function(e){return e.ok?e.json():Promise.reject(new Error("Произошла ошибка со статус-кодом ".concat(e.status)))},s=document.querySelector(".profile__edit-button"),d=document.querySelector("#edit-info"),f=document.querySelector(".profile__add-button"),m=document.querySelector("#add-card"),p=document.querySelector("#popup-image"),_=document.querySelector(".profile__nickname"),v=document.querySelector(".profile__text"),y=document.querySelector("#edit-avatar"),h=document.querySelector(".profile__edit-avatar"),b=document.querySelector(".popup__button_type_edit"),S=document.querySelector(".profile__avatar"),g=document.querySelector("#form-avatar"),q=document.querySelector('[name="form-place"]'),L=document.querySelector('[name="form-info"]'),k=document.querySelector('[name="nickname"]'),C=document.querySelector('[name="text"]'),E=document.querySelector(".popup__button_type_create"),x=document.querySelector(".popup__button_type_save");function A(e){e.textContent="Сохранение..."}function w(e){e.textContent=e===E?"Создать":"Сохранить"}var D=document.querySelector(".popup__image"),T=document.querySelector(".popup__name");function j(e){D.src=e.target.src,D.alt=e.target.alt,T.textContent=e.target.alt,o(p)}var O=document.querySelector('[name="place"]'),I=document.querySelector('[name="url-card"]'),P=document.querySelector('[name="url-avatar"]'),N=document.querySelector(".cards__gallery"),J=document.querySelector("#card").content;function H(e){var t;e.target.classList.contains("cards__like-button_active")?(t=e.target.closest(".cards__item").dataset.id,fetch("".concat(i.url,"/cards/likes/").concat(t),{method:"DELETE",headers:i.headers}).then((function(e){return l(e)}))).then((function(t){e.target.classList.remove("cards__like-button_active"),e.target.closest(".cards__item").querySelector(".cards__likes").textContent=t.likes.length})).catch((function(e){console.log("Ошибка при снятии лайка")})):function(e){return fetch("".concat(i.url,"/cards/likes/").concat(e),{method:"PUT",headers:i.headers}).then((function(e){return l(e)}))}(e.target.closest(".cards__item").dataset.id).then((function(t){e.target.classList.add("cards__like-button_active"),e.target.closest(".cards__item").querySelector(".cards__likes").textContent=t.likes.length})).catch((function(e){console.log("Ошибка при постановке лайка")}))}function M(e){var t;(t=e.target.closest(".cards__item").dataset.id,fetch("".concat(i.url,"/cards/").concat(t),{method:"DELETE",headers:i.headers}).then((function(e){return l(e)}))).then((function(){e.target.closest(".cards__item").remove()})).catch((function(e){console.log("Ошибка при удалении карточки")}))}function U(e,t,n,r,o){var a=J.querySelector(".cards__item").cloneNode(!0),c=a.querySelector(".cards__trash-button"),u=a.querySelector(".cards__like-button"),i=a.querySelector(".cards__photo"),l=a.querySelector(".cards__name"),s=a.querySelector(".cards__likes");return r==B&&c.classList.add("cards__trash-button_visible"),o.some((function(e){return e._id==B}))&&u.classList.add("cards__like-button_active"),i.src=t,i.alt=e,l.textContent=e,a.dataset.id=n,s.textContent=o.length,u.addEventListener("click",H),c.addEventListener("click",M),i.addEventListener("click",j),a}function z(e,t){if(e){if("string"==typeof e)return $(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?$(e,t):void 0}}function $(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var B,F=document.querySelector(".profile__avatar");Promise.all([fetch("".concat(i.url,"/users/me"),{headers:i.headers}).then((function(e){return l(e)})),fetch("".concat(i.url,"/cards"),{headers:i.headers}).then((function(e){return l(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a=[],c=!0,u=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);c=!0);}catch(e){u=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(u)throw o}}return a}}(t,n)||z(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],a=r[1];_.textContent=o.name,v.textContent=o.about,B=o._id,F.src=o.avatar;var c=a.map((function(e){return U(e.name,e.link,e._id,e.owner._id,e.likes)}));N.prepend.apply(N,function(e){return function(e){if(Array.isArray(e))return $(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||z(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(c))})).catch((function(e){console.log("Ошибка при загрузке данных с сервера")})),L.addEventListener("submit",(function(e){e.preventDefault();var n,r,o,a=k.value,c=C.value;A(x),(n=a,r=c,o={name:n,about:r},fetch("".concat(i.url,"/users/me"),{method:"PATCH",headers:i.headers,body:JSON.stringify(o)}).then((function(e){return l(e)}))).then((function(e){_.textContent=e.name,v.textContent=e.about,t(d)})).catch((function(e){console.log("Ошибка при редактировании профиля")})).finally((function(){w(x)}))})),q.addEventListener("submit",(function(e){e.preventDefault();var n,r,o,u=O.value,s=I.value;A(E),(n=u,r=s,o={name:n,link:r},fetch("".concat(i.url,"/cards"),{method:"POST",headers:i.headers,body:JSON.stringify(o)}).then((function(e){return l(e)}))).then((function(e){N.prepend(U(e.name,e.link,e._id,e.owner._id,e.likes)),t(m),O.value="",I.value="",c(E,a)})).catch((function(e){console.log("Ошибка при отправке карточки")})).finally((function(){w(E)}))})),g.addEventListener("submit",(function(e){e.preventDefault();var n,r,o=P.value;A(b),(n=o,r={avatar:n},fetch("".concat(i.url,"/users/me/avatar"),{method:"PATCH",headers:i.headers,body:JSON.stringify(r)}).then((function(e){return l(e)}))).then((function(e){S.src=e.avatar,t(y),P.value="",c(b,a)})).catch((function(e){console.log("Ошибка при обновлении аватара")})).finally((function(){w(b)}))})),s.addEventListener("click",(function(){k.value=_.textContent,C.value=v.textContent,o(d)})),f.addEventListener("click",(function(){o(m)})),h.addEventListener("click",(function(){o(y)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){var r=e.querySelector("#error-".concat(t.id));t.validity.valid?function(e,t,n){e.classList.remove(n.inputInvalidClass),t.classList.remove(n.errorClass),t.textContent=""}(t,r,n):function(e,t,n,r){e.classList.add(r.inputInvalidClass),t.classList.add(r.errorClass),t.textContent=n}(t,r,t.validationMessage,n)}(e,r,t),u(e,n,t)}))})),u(e,n,t)}(t,e)}))}(a)})();