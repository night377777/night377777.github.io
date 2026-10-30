const TG = 'Night3777';
const TG_URL = 'https://t.me/' + TG;

const PRODUCTS = [
  {
    id:'usage', icon:'🧹', tag:'hot', tagText:'MODULE', vis:'#0e1a24,#0a1218',
    name:'Usage Stats Cleaner', sub:'All screen-time apps', shot:'usage.png',
    desc:'Wipes the data of any usage-stats or screen-time app in one tap — Toxy Audit, AtazMoon, Stayfree, Your Hour and the rest. Resets timers without breaking streak counters.',
    feats:[
      'Works on every usage-stats and screen-time app',
      'One-tap full wipe or per-app selective clean',
      'Screen-time apps spoofed',
      'Background auto-clean schedule',
      'Root or Shizuku supported',
      'Setup guide included'
    ],
    price:6, old:9, mode:'cart'
  },
  {
    id:'tycoonfix', icon:'🛠️', tag:'flagship', tagText:'MODULE', vis:'#1b1430,#0d0a18', flag:true,
    name:'TycoOnFix', sub:'Full toolkit', shot:'tycoonfix.png',
    desc:'The whole arsenal in one app — a real system-crash UI, fake installer errors, device spoofing and detection fixes. Every message is yours to customise.',
    feats:[
      'App Crasher — custom message with a real system-crash UI',
      'Installer Blocker — custom message, real package installer flow',
      'Fake errors like "App isn\'t compatible", "Problem parsing the package", "App not installed"',
      'Device Spoof — model, brand, Android version, DPI, build props',
      'FamPay Detection Fix',
      'Native Fix',
      'Built-in usage stats engine',
      'Personal terminal (root shell, custom commands)',
      'Lifetime updates'
    ],
    price:6, old:9, mode:'cart'
  },
  {
    id:'rootmanager', icon:'🔐', tag:'new', tagText:'ROOT MANAGER', vis:'#101a2c,#0a1120',
    name:'Private Root Manager', sub:'Stealth build', shot:'rootmanager.png',
    desc:'100% isolated from the checking app. You can create your own fully customized root manager.',
    feats:[
      '100% isolated from the checking app',
      'Build your own customized root manager',
      'Private, stealth — no visible traces',
      'Screen-time apps spoofed',
      'Per-app permission masking',
      'Auto re-hide on reboot',
      'Setup guide included'
    ],
    price:11, old:18, mode:'cart'
  },
  {
    id:'nonroot', icon:'📱', tag:'', tagText:'HACK', vis:'#151328,#0c0a18',
    name:'TycoOn Non-Rooted', sub:'Free Fire · Antiban', shot:'nonroot.png',
    desc:'Runs with zero root. Antiban layer included, and you can rebuild it with your own app name and logo.',
    feats:[
      'Zero root required',
      'Screen-time apps spoofed',
      'Antiban layer',
      'Custom package name on demand',
      'Rebuild with your own app name and logo',
      'Streamer-friendly features',
      'Price depends on key days and limitations'
    ],
    price:5, old:9, mode:'contact'
  },
  {
    id:'ios', icon:'🍏', tag:'soon', tagText:'HACK · iOS', vis:'#12202a,#0a1218',
    name:'iOS Cheats', sub:'Under work', shot:'ios.png',
    desc:'iOS side is under work — both non-rooted and rooted routes. Pricing runs on key duration, so message on Telegram for the options.',
    feats:[
      'Under work — coming soon',
      'Non-rooted route being tested',
      'Rooted route being tested',
      'Key based on time duration',
      'Priority access on Telegram'
    ],
    price:0, old:0, mode:'ios'
  },
  {
    id:'streamer', icon:'📡', tag:'soon', tagText:'TOOL · SOON', vis:'#0d1a1f,#0a1216',
    name:'TycoOn Streamer', sub:'Live', shot:'streamer.png',
    desc:'A build made for streamers. Under progress — the access list is already open on Telegram.',
    feats:[
      'Streamer-first feature set',
      'Live overlay friendly',
      'Recording-safe anti-detection',
      'Priority access at launch',
      'Pricing announced at launch'
    ],
    price:0, old:0, mode:'soon', prog:true
  }
];

let cart = JSON.parse(localStorage.getItem('cm_cart') || '[]');
const usd = n => '$' + n;

function render(){
  document.getElementById('plist').innerHTML = PRODUCTS.map(p => `
    <article class="prod ${p.flag?'flag':''}">
      <div class="pvis" style="background:linear-gradient(155deg,${p.vis})">
        <span class="ptag ${p.tag}">${p.tagText}</span>
        <i>${p.icon}</i>
        <img class="shot" src="${p.shot}" alt="${p.name}" loading="lazy" onerror="this.remove()" />
        ${p.price ? `<span class="pprice">${usd(p.price)}${p.mode==='contact'?'+':''}</span>` : ''}
      </div>
      <div class="pbody">
        <h3>${p.name} <small>${p.sub}</small></h3>
        <p>${p.desc}</p>
        <div class="feats">${p.feats.map(f=>`<div>${f}</div>`).join('')}</div>
        ${p.prog ? `<div class="progress"><span>Under progress</span><span class="bar"></span><span>62%</span></div>` : ''}
        <div class="pfoot">
          ${p.mode === 'cart'
            ? `<div class="price"><s>${usd(p.old)}</s>${usd(p.price)}<em>LIFETIME</em></div>
               <button class="add" onclick="add('${p.id}')">Add to Cart</button>`
            : p.mode === 'contact'
            ? `<div class="price">${usd(p.price)}+</div>
               <button class="add tg" onclick="askMsg('TycoOn Non-Rooted')">Ask on Telegram</button>`
            : p.mode === 'ios'
            ? `<div class="price" style="font-size:14px;color:#93a3c6">Key based · by duration</div>
               <div style="display:flex;gap:8px;flex-wrap:wrap">
                 <button class="add tg" onclick="askMsg('iOS Non-Rooted key')">Non-Rooted</button>
                 <button class="add tg" onclick="askMsg('iOS Rooted key')">Rooted</button>
               </div>`
            : `<div class="price" style="font-size:15px;color:#93a3c6">Coming soon</div>
               <button class="add" disabled>Coming Soon</button>`}
        </div>
      </div>
    </article>`).join('');
}

function add(id){
  if(!cart.includes(id)) cart.push(id);
  localStorage.setItem('cm_cart', JSON.stringify(cart));
  paint(); openCart();
}
function rm(id){
  cart = cart.filter(x => x !== id);
  localStorage.setItem('cm_cart', JSON.stringify(cart));
  paint();
}
function paint(){
  const items = cart.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  document.getElementById('cnt').textContent = items.length;
  document.getElementById('cnt').style.display = items.length ? 'grid' : 'none';
  document.getElementById('tot').textContent = usd(items.reduce((s,i)=>s+i.price,0));
  document.getElementById('cartBody').innerHTML = items.length ? items.map(p => `
    <div class="ci">
      <div class="ic">${p.icon}</div>
      <div class="in"><b>${p.name}</b><small>${usd(p.price)}</small></div>
      <button class="rm" onclick="rm('${p.id}')">Remove</button>
    </div>`).join('') : '<div class="empty">Your cart is empty.<br>Add something from the vault.</div>';
}

function openCart(){ document.getElementById('drawer').classList.add('on'); document.getElementById('ovl').classList.add('on'); }
function closeAll(){ ['drawer','modal','ovl'].forEach(i => document.getElementById(i).classList.remove('on')); }

function openPay(){
  if(!cart.length) return;
  const items = cart.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  const total = items.reduce((s,i)=>s+i.price,0);
  document.getElementById('sum').innerHTML = items
    .map(p => `<div class="sumrow"><span>${p.name}</span><span>${usd(p.price)}</span></div>`).join('');
  document.getElementById('sumTot').textContent = usd(total);
  document.getElementById('drawer').classList.remove('on');
  document.getElementById('modal').classList.add('on');
  document.getElementById('ovl').classList.add('on');
}

function goPay(){
  const items = cart.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  const total = items.reduce((s,i)=>s+i.price,0);
  const msg = 'Hi Night, order from Celestial Moon:\n\n'
    + items.map(p => '• ' + p.name + ' — $' + p.price).join('\n')
    + '\n\nTotal: $' + total
    + '\n\nMy device / Android version: ';
  if(navigator.clipboard) navigator.clipboard.writeText(msg).catch(()=>{});
  window.open(TG_URL, '_blank');
}

function askMsg(label){
  const msg = 'Hi Night, from Celestial Moon: ' + label + '. Tell me the options and price.';
  if(navigator.clipboard) navigator.clipboard.writeText(msg).catch(()=>{});
  window.open(TG_URL, '_blank');
}

document.getElementById('yr').textContent = new Date().getFullYear();
render(); paint();
