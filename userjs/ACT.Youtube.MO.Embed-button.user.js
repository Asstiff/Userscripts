// ==UserScript==
// @name               ACT.Youtube.MO.Embed-button
// @description        Go to Embed page to uses auto-translate on in-page fullscreen player, for mobile users.
// @author             ACTCD
// @version            20220322.1
// @namespace          https://t.me/ACTCD
// @supportURL         https://t.me/ACTDC
// @homepageURL        https://github.com/ACTCD/Userscripts
// @updateURL          https://raw.githubusercontent.com/ACTCD/Userscripts/main/userjs/ACT.Youtube.MO.Embed-button.user.js
// @downloadURL        https://raw.githubusercontent.com/ACTCD/Userscripts/main/userjs/ACT.Youtube.MO.Embed-button.user.js
// @match              *://m.youtube.com/*
// @match              *://www.youtube-nocookie.com/embed/*
// @grant              none
// @run-at             document-start
// ==/UserScript==

(function () {
    'use strict';

    const button = document.createElement("button");
    button.id = "enterEmbed";
    button.innerText = "Embed";
    button.style.setProperty('color', 'white');
    button.style.setProperty('background-color', 'transparent');
    button.style.setProperty('border', '2px solid');
    button.style.setProperty('border-radius', '10px');
    button.style.setProperty('padding', '1px 5px');
    button.style.setProperty('font-size', '1.5em');
    button.style.setProperty('font-weight', '500');
    button.style.setProperty('text-shadow', 'black 1px 1px 2px');
    button.addEventListener('click', event => {
        let vid = new URL(location).searchParams.get('v');
        if (!vid) return;
        let url = new URL('https://www.youtube-nocookie.com/embed/?autoplay=1&cc_lang_pref=zh&cc_load_policy=1&hl=zh&modestbranding=1&tlang=zh-Hans');
        url.pathname = '/embed/' + vid;
        location.href = url;
        event.preventDefault();
        event.stopImmediatePropagation();
    });

    function insert_button() {
        if (location.hostname != 'm.youtube.com') return;
        if (location.pathname != '/watch') return;
        if (button.parentNode) return;
        document.querySelector('.mobile-topbar-header-endpoint')?.insertAdjacentElement("afterend", button);
        console.log('insert_button');
    }

    function tweak() {
        insert_button()
        document.querySelector('.ytp-fullscreen-button')?.remove();
    }

    new MutationObserver(tweak).observe(document, { subtree: true, childList: true });

    function web_app() {
        const meta = document.createElement('meta');
        meta.name = 'apple-mobile-web-app-capable';
        meta.setAttribute('content', 'yes');
        document.head.appendChild(meta);
    }

    function WindowLoaded() {
        console.log('WindowLoaded');
        tweak();
        if (location.pathname.startsWith('/embed/')) web_app();
    }

    if (document.readyState === 'complete') {
        WindowLoaded();
    } else {
        window.addEventListener('load', WindowLoaded);
    }

})();