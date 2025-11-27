(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))f(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&f(l)}).observe(document,{childList:!0,subtree:!0});function y(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function f(e){if(e.ep)return;e.ep=!0;const t=y(e);fetch(e.href,t)}})();const m=document.querySelector("#app");if(!m)throw new Error("#app element not found");m.innerHTML=`
  <main class="shell">
    <header>
      <p class="badge">Game 02</p>
      <h1>リアクションタイマー</h1>
      <p class="lead">
        「スタート」で待機状態に入り、フィールドが緑色に変わった瞬間をクリック。
        早押しでフライングすると失敗になります。
      </p>
    </header>

    <section class="card">
      <div class="reaction-area idle" id="reaction-area">
        <span id="reaction-message">スタートで準備完了</span>
      </div>
      <div class="control-row">
        <button id="reaction-start" class="primary">スタート</button>
        <p id="reaction-result" class="record">記録: -- ms</p>
      </div>
    </section>
  </main>
`;const s=document.querySelector("#reaction-start"),r=document.querySelector("#reaction-area"),o=document.querySelector("#reaction-message"),i=document.querySelector("#reaction-result");let u=!1,p=0,a=null;const d=n=>{u=!1,r?.classList.remove("ready","waiting"),r?.classList.add("idle"),o&&(o.textContent=n),a&&(clearTimeout(a),a=null)};s?.addEventListener("click",()=>{s&&(s.disabled=!0,r?.classList.remove("idle"),r?.classList.add("waiting"),o&&(o.textContent="緑になったらクリック！"),a=window.setTimeout(()=>{u=!0,p=performance.now(),r?.classList.remove("waiting"),r?.classList.add("ready"),o&&(o.textContent="今だ！クリック！"),s.disabled=!1},800+Math.random()*2e3))});r?.addEventListener("click",()=>{if(!s)return;if(!u){d("フライング！スタートで再挑戦"),s.disabled=!1,i&&(i.textContent="記録: フライング");return}const n=Math.round(performance.now()-p);i&&(i.textContent=`記録: ${n} ms`),d("スタートで準備完了")});d("スタートで準備完了");
