let noCount = 0;
const btnYes = document.getElementById('btnYes');
const btnNo  = document.getElementById('btnNo');
const noMsg  = document.getElementById('noMsg');

const noLines = [
  "ไม่ได้นะ กด Yess เลย 🥺",
  "แน่ใจแล้วเหรอ? 😅",
  "โอ้โห... ลองอีกทีนะ 🙏",
  "ปุ่ม Yess ใหญ่กว่าแล้ว กดได้เลย 😭",
  "ไม่เชื่อว่าจะกด No จริงๆ 😤",
  "ใจจริงเป็นยังไงล่ะ? 🤭",
  "Yess ไม่หนีไปไหนหรอกนะ 💕",
  "โอเค ครั้งสุดท้ายแล้วนะ... 👀",
];

// Reaction combos: [emoji, title, msg]
const reactions = [
  ["🌸", "ขอบคุณนะ 🥹", "รู้แล้วว่าคุณรู้สึกยังไง\nผมก็ชอบคุณเหมือนกันนะ"],
  ["🥳🎉", "เย้!! ดีใจมากเลย!", "รอคำตอบนี้อยู่นานมากแล้ว\nขอบคุณที่กด Yess นะ 💕"],
  ["😭💕", "ในที่สุดดดด!!!", "กด No มาตั้งนาน\nแต่ใจรู้ว่าคำตอบคืออะไร 🌸"],
  ["🫠💘", "หัวใจจะหลุดแล้ว!", "รอมานานมากกก\nขอบคุณนะ MoukMix 🌺"],
];

function onNo() {
  noCount++;

  // Grow Yes
  const base = 1.5;
  const newSize = Math.min(base + noCount * 0.4, 5);
  btnYes.style.fontSize = newSize + 'rem';

  // Shake No
  btnNo.style.animation = 'none';
  void btnNo.offsetHeight;
  btnNo.style.animation = 'shake 0.4s ease';

  // Shrink No
  const noSize = Math.max(1.1 - noCount * 0.12, 0.4);
  btnNo.style.fontSize = noSize + 'rem';
  if (noCount >= 5) {
    btnNo.style.opacity = '0.25';
    btnNo.style.pointerEvents = 'none';
  }

  // Message
  noMsg.textContent = noLines[Math.min(noCount - 1, noLines.length - 1)];
  noMsg.classList.add('show');

  // Float emoji
  spawnNope();
}

function spawnNope() {
  const nopes = ['😤','🙅','💔','😩','🫣'];
  const el = document.createElement('div');
  el.style.cssText = `
    position:fixed; pointer-events:none; z-index:99;
    font-size:1.6rem;
    left:${btnNo.getBoundingClientRect().left + 10}px;
    top:${btnNo.getBoundingClientRect().top}px;
    animation: nopeFloat 1.2s ease forwards;
  `;
  el.textContent = nopes[Math.floor(Math.random() * nopes.length)];
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1300);
}

function onYes() {
  document.getElementById('page1').style.display = 'none';
  const p2 = document.getElementById('page2');
  p2.classList.add('show');

  const idx = Math.min(Math.floor(noCount / 2), reactions.length - 1);
  const [emoji, title, msg] = reactions[idx];

  document.getElementById('yayEmoji').textContent = emoji;
  document.getElementById('yayTitle').textContent = title;
  document.getElementById('yayMsg').innerHTML = msg.replace(/\n/g,'<br>') +
    '<br><em style="font-family:\'Cormorant Garamond\',serif;font-style:italic;color:#e8a0b0;">MoukMix</em> 💌';

  spawnPetals();
}

function spawnPetals() {
  const petals = ['🌸','🌷','🌺','✨','💕','🩷','🌼','🎀'];
  for (let i = 0; i < 35; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'petal';
      el.textContent = petals[Math.floor(Math.random() * petals.length)];
      el.style.left = Math.random() * 100 + 'vw';
      el.style.top = '-80px';
      el.style.fontSize = (0.9 + Math.random() * 1.3) + 'rem';
      const dur = 3.5 + Math.random() * 4;
      el.style.animationDuration = dur + 's';
      el.style.animationDelay = (Math.random() * 1.5) + 's';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), (dur + 1.5) * 1000);
    }, i * 100);
  }
}