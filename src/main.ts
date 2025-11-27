import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('#app element not found')
}

app.innerHTML = `
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
`

const startBtn = document.querySelector<HTMLButtonElement>('#reaction-start')
const reactionArea = document.querySelector<HTMLDivElement>('#reaction-area')
const reactionMessage = document.querySelector<HTMLSpanElement>('#reaction-message')
const result = document.querySelector<HTMLParagraphElement>('#reaction-result')

let ready = false
let readyTimestamp = 0
let timeoutId: number | null = null

const resetArea = (text: string) => {
  ready = false
  reactionArea?.classList.remove('ready', 'waiting')
  reactionArea?.classList.add('idle')
  if (reactionMessage) reactionMessage.textContent = text
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
}

startBtn?.addEventListener('click', () => {
  if (!startBtn) return
  startBtn.disabled = true
  reactionArea?.classList.remove('idle')
  reactionArea?.classList.add('waiting')
  if (reactionMessage) reactionMessage.textContent = '緑になったらクリック！'

  timeoutId = window.setTimeout(() => {
    ready = true
    readyTimestamp = performance.now()
    reactionArea?.classList.remove('waiting')
    reactionArea?.classList.add('ready')
    if (reactionMessage) reactionMessage.textContent = '今だ！クリック！'
    startBtn.disabled = false
  }, 800 + Math.random() * 2000)
})

reactionArea?.addEventListener('click', () => {
  if (!startBtn) return
  if (!ready) {
    resetArea('フライング！スタートで再挑戦')
    startBtn.disabled = false
    if (result) result.textContent = '記録: フライング'
    return
  }
  const reactionTime = Math.round(performance.now() - readyTimestamp)
  if (result) result.textContent = `記録: ${reactionTime} ms`
  resetArea('スタートで準備完了')
})

resetArea('スタートで準備完了')
