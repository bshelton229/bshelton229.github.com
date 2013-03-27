(function(t){function e(e,a,r){var o=this;return this.on("click.pjax",e,function(e){var i=t.extend({},f(a,r));i.container||(i.container=t(this).attr("data-pjax")||o),n(e,i)})}function n(e,n,a){a=f(n,a);var o=e.currentTarget;if("A"!==o.tagName.toUpperCase())throw"$.fn.pjax or $.pjax.click requires an anchor element";if(!(e.which>1||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||location.protocol!==o.protocol||location.hostname!==o.hostname||o.hash&&o.href.replace(o.hash,"")===location.href.replace(location.hash,"")||o.href===location.href+"#")){var i={url:o.href,container:t(o).attr("data-pjax"),target:o,fragment:null},s=t.extend({},i,a),l=t.Event("pjax:click");t(o).trigger(l,[s]),l.isDefaultPrevented()||(r(s),e.preventDefault())}}function a(e,n,a){a=f(n,a);var o=e.currentTarget;if("FORM"!==o.tagName.toUpperCase())throw"$.pjax.submit requires a form element";var i={type:o.method.toUpperCase(),url:o.action,data:t(o).serializeArray(),container:t(o).attr("data-pjax"),target:o,fragment:null};r(t.extend({},i,a)),e.preventDefault()}function r(e){function n(e,n){var r=t.Event(e,{relatedTarget:a});return s.trigger(r,n),!r.isDefaultPrevented()}e=t.extend(!0,{},t.ajaxSettings,r.defaults,e),t.isFunction(e.url)&&(e.url=e.url());var a=e.target,o=p(e.url).hash,s=e.context=d(e.container);e.data||(e.data={}),e.data._pjax=s.selector;var l;e.beforeSend=function(t,a){return"GET"!==a.type&&(a.timeout=0),t.setRequestHeader("X-PJAX","true"),t.setRequestHeader("X-PJAX-Container",s.selector),n("pjax:beforeSend",[t,a])?(a.timeout>0&&(l=setTimeout(function(){n("pjax:timeout",[t,e])&&t.abort("timeout")},a.timeout),a.timeout=0),e.requestUrl=p(a.url).href,void 0):!1},e.complete=function(t,a){l&&clearTimeout(l),n("pjax:complete",[t,a,e]),n("pjax:end",[t,e])},e.error=function(t,a,r){var o=v("",t,e),s=n("pjax:error",[t,a,r,e]);"GET"==e.type&&"abort"!==a&&s&&i(o.url)},e.success=function(a,l,u){var f="function"==typeof t.pjax.defaults.version?t.pjax.defaults.version():t.pjax.defaults.version,d=u.getResponseHeader("X-PJAX-Version"),h=v(a,u,e);if(f&&d&&f!==d)return i(h.url),void 0;if(!h.contents)return i(h.url),void 0;if(r.state={id:e.id||c(),url:h.url,title:h.title,container:s.selector,fragment:e.fragment,timeout:e.timeout},(e.push||e.replace)&&window.history.replaceState(r.state,h.title,h.url),h.title&&(document.title=h.title),s.html(h.contents),g(h.scripts),"number"==typeof e.scrollTo&&t(window).scrollTop(e.scrollTo),(e.replace||e.push)&&window._gaq&&_gaq.push(["_trackPageview"]),""!==o){var m=p(h.url);m.hash=o,r.state.url=m.href,window.history.replaceState(r.state,h.title,m.href);var x=t(m.hash);x.length&&t(window).scrollTop(x.offset().top)}n("pjax:success",[a,l,u,e])},r.state||(r.state={id:c(),url:window.location.href,title:document.title,container:s.selector,fragment:e.fragment,timeout:e.timeout},window.history.replaceState(r.state,document.title));var f=r.xhr;f&&4>f.readyState&&(f.onreadystatechange=t.noop,f.abort()),r.options=e;var f=r.xhr=t.ajax(e);return f.readyState>0&&(e.push&&!e.replace&&(x(r.state.id,s.clone().contents()),window.history.pushState(null,"",u(e.requestUrl))),n("pjax:start",[f,e]),n("pjax:send",[f,e])),r.xhr}function o(e,n){var a={url:window.location.href,push:!1,replace:!0,scrollTo:!1};return r(t.extend(a,f(e,n)))}function i(t){window.history.replaceState(null,"","#"),window.location.replace(t)}function s(e){var n=e.state;if(n&&n.container){if(T&&S==n.url)return;var a=t(n.container);if(a.length){var o,s=P[n.id];r.state&&(o=r.state.id<n.id?"forward":"back",j(o,r.state.id,a.clone().contents()));var l=t.Event("pjax:popstate",{state:n,direction:o});a.trigger(l);var c={id:n.id,url:n.url,container:a,push:!1,fragment:n.fragment,timeout:n.timeout,scrollTo:!1};s?(a.trigger("pjax:start",[null,c]),n.title&&(document.title=n.title),a.html(s),r.state=n,a.trigger("pjax:end",[null,c])):r(c),a[0].offsetHeight}else i(location.href)}T=!1}function l(e){var n=t.isFunction(e.url)?e.url():e.url,a=e.type?e.type.toUpperCase():"GET",r=t("<form>",{method:"GET"===a?"GET":"POST",action:n,style:"display:none"});"GET"!==a&&"POST"!==a&&r.append(t("<input>",{type:"hidden",name:"_method",value:a.toLowerCase()}));var o=e.data;if("string"==typeof o)t.each(o.split("&"),function(e,n){var a=n.split("=");r.append(t("<input>",{type:"hidden",name:a[0],value:a[1]}))});else if("object"==typeof o)for(key in o)r.append(t("<input>",{type:"hidden",name:key,value:o[key]}));t(document.body).append(r),r.submit()}function c(){return(new Date).getTime()}function u(t){return t.replace(/\?_pjax=[^&]+&?/,"?").replace(/_pjax=[^&]+&?/,"").replace(/[\?&]$/,"")}function p(t){var e=document.createElement("a");return e.href=t,e}function f(e,n){return e&&n?n.container=e:n=t.isPlainObject(e)?e:{container:e},n.container&&(n.container=d(n.container)),n}function d(e){if(e=t(e),e.length){if(""!==e.selector&&e.context===document)return e;if(e.attr("id"))return t("#"+e.attr("id"));throw"cant get selector for pjax container!"}throw"no pjax container for "+e.selector}function h(t,e){return t.filter(e).add(t.find(e))}function m(e){return t.parseHTML(e,document,!0)}function v(e,n,a){var r={};if(r.url=u(n.getResponseHeader("X-PJAX-URL")||a.requestUrl),/<html/i.test(e))var o=t(m(e.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0])),i=t(m(e.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));else var o=i=t(m(e));if(0===i.length)return r;if(r.title=h(o,"title").last().text(),a.fragment){if("body"===a.fragment)var s=i;else var s=h(i,a.fragment).first();s.length&&(r.contents=s.contents(),r.title||(r.title=s.attr("title")||s.data("title")))}else/<html/i.test(e)||(r.contents=i);return r.contents&&(r.contents=r.contents.not(function(){return t(this).is("title")}),r.contents.find("title").remove(),r.scripts=h(r.contents,"script[src]").remove(),r.contents=r.contents.not(r.scripts)),r.title&&(r.title=t.trim(r.title)),r}function g(e){if(e){var n=t("script[src]");e.each(function(){var e=this.src,a=n.filter(function(){return this.src===e});if(!a.length){var r=document.createElement("script");r.type=t(this).attr("type"),r.src=t(this).attr("src"),document.head.appendChild(r)}})}}function x(t,e){for(P[t]=e,k.push(t);E.length;)delete P[E.shift()];for(;k.length>r.defaults.maxCacheLength;)delete P[k.shift()]}function j(t,e,n){var a,r;P[e]=n,"forward"===t?(a=k,r=E):(a=E,r=k),a.push(e),(e=r.pop())&&delete P[e]}function w(){return t("meta").filter(function(){var e=t(this).attr("http-equiv");return e&&"X-PJAX-VERSION"===e.toUpperCase()}).attr("content")}function y(){t.fn.pjax=e,t.pjax=r,t.pjax.enable=t.noop,t.pjax.disable=b,t.pjax.click=n,t.pjax.submit=a,t.pjax.reload=o,t.pjax.defaults={timeout:650,push:!0,replace:!1,type:"GET",dataType:"html",scrollTo:0,maxCacheLength:20,version:w},t(window).bind("popstate.pjax",s)}function b(){t.fn.pjax=function(){return this},t.pjax=l,t.pjax.enable=y,t.pjax.disable=t.noop,t.pjax.click=t.noop,t.pjax.submit=t.noop,t.pjax.reload=function(){window.location.reload()},t(window).unbind("popstate.pjax",s)}var T=!0,S=window.location.href,C=window.history.state;C&&C.container&&(r.state=C);var P={},E=[],k=[];0>t.inArray("state",t.event.props)&&t.event.props.push("state"),t.support.pjax=window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]|WebApps\/.+CFNetwork)/),t.support.pjax?y():b()})(jQuery),!function(t){"use strict";var e=function(e,n){this.$element=t(e),this.options=t.extend({},t.fn.button.defaults,n)};e.prototype.setState=function(t){var e="disabled",n=this.$element,a=n.data(),r=n.is("input")?"val":"html";t+="Text",a.resetText||n.data("resetText",n[r]()),n[r](a[t]||this.options[t]),setTimeout(function(){"loadingText"==t?n.addClass(e).attr(e,e):n.removeClass(e).removeAttr(e)},0)},e.prototype.toggle=function(){var t=this.$element.closest('[data-toggle="buttons-radio"]');t&&t.find(".active").removeClass("active"),this.$element.toggleClass("active")};var n=t.fn.button;t.fn.button=function(n){return this.each(function(){var a=t(this),r=a.data("button"),o="object"==typeof n&&n;r||a.data("button",r=new e(this,o)),"toggle"==n?r.toggle():n&&r.setState(n)})},t.fn.button.defaults={loadingText:"loading..."},t.fn.button.Constructor=e,t.fn.button.noConflict=function(){return t.fn.button=n,this},t(document).on("click.button.data-api","[data-toggle^=button]",function(e){var n=t(e.target);n.hasClass("btn")||(n=n.closest(".btn")),n.button("toggle")})}(window.jQuery),$(function(){$(document).pjax("a","#content",{fragment:"#content"})});