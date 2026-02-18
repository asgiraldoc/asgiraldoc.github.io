// Darwin vs Kropotkin Lab
// Standalone, no build step. Designed for GitHub Pages.

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function randn(rng) {
  // Box–Muller
  let u = 0, v = 0;
  while (u === 0) u = rng();
  while (v === 0) v = rng();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function clamp(x, lo, hi) { return Math.max(lo, Math.min(hi, x)); }

function shannonEvenness(values) {
  const xs = values.filter(v => v > 0);
  const S = xs.length;
  const tot = xs.reduce((a,b)=>a+b, 0);
  if (S === 0 || tot === 0) return { H: 0, J: 1 };
  let H = 0;
  for (const v of xs) {
    const p = v / tot;
    H += -p * Math.log(p);
  }
  const J = S > 1 ? H / Math.log(S) : 1;
  return { H, J };
}

function gini(values) {
  const xs = values.slice().map(v => Math.max(0, v)).sort((a,b)=>a-b);
  const n = xs.length;
  const sum = xs.reduce((a,b)=>a+b, 0);
  if (n === 0 || sum === 0) return 0;
  let cum = 0;
  for (let i=0;i<n;i++) cum += (i+1)*xs[i];
  // Gini = (2*Σ i*xi)/(n*Σ xi) - (n+1)/n
  return (2*cum)/(n*sum) - (n+1)/n;
}

function pickWeighted(rng, weights) {
  const tot = weights.reduce((a,b)=>a+b, 0);
  if (tot <= 0) return Math.floor(rng()*weights.length);
  let r = rng() * tot;
  for (let i=0;i<weights.length;i++) {
    r -= weights[i];
    if (r <= 0) return i;
  }
  return weights.length - 1;
}

// ---------- Networks ----------
function makeAdjListComplete(n) {
  const adj = Array.from({length:n}, ()=>[]);
  for (let i=0;i<n;i++){
    for (let j=0;j<n;j++){
      if (i!==j) adj[i].push(j);
    }
  }
  return adj;
}

function makeAdjListRing(n, k=2) {
  // degree 2k (k each side)
  const adj = Array.from({length:n}, ()=>[]);
  for (let i=0;i<n;i++){
    for (let d=1; d<=k; d++){
      const j1 = (i+d) % n;
      const j2 = (i-d+n) % n;
      adj[i].push(j1);
      adj[i].push(j2);
    }
  }
  return adj;
}

function makeAdjListRandom(n, p, rng) {
  const adj = Array.from({length:n}, ()=>[]);
  for (let i=0;i<n;i++){
    for (let j=i+1;j<n;j++){
      if (rng() < p){
        adj[i].push(j);
        adj[j].push(i);
      }
    }
  }
  // ensure no isolates
  for (let i=0;i<n;i++){
    if (adj[i].length===0){
      const j = (i+1)%n;
      adj[i].push(j);
      adj[j].push(i);
    }
  }
  return adj;
}

function rewireSmallWorld(adj, beta, rng) {
  // naive Watts–Strogatz rewire for ring-based adjacency (undirected).
  const n = adj.length;
  const setAdj = adj.map(nei => new Set(nei));
  for (let i=0;i<n;i++){
    for (const j of Array.from(setAdj[i])) {
      if (j <= i) continue; // handle each edge once
      if (rng() < beta) {
        // remove edge
        setAdj[i].delete(j);
        setAdj[j].delete(i);
        // add new edge to random k not equal i and not already connected
        let k = i;
        let tries = 0;
        while ((k===i || setAdj[i].has(k)) && tries < 1000) {
          k = Math.floor(rng()*n);
          tries++;
        }
        if (k!==i && !setAdj[i].has(k)) {
          setAdj[i].add(k);
          setAdj[k].add(i);
        } else {
          // revert if failed
          setAdj[i].add(j);
          setAdj[j].add(i);
        }
      }
    }
  }
  return setAdj.map(s => Array.from(s));
}

function makeAdjListModular(n, modules=3, pIn=0.75, pOut=0.05, rng) {
  const adj = Array.from({length:n}, ()=>[]);
  const modOf = Array.from({length:n}, (_,i)=> Math.floor(i * modules / n));
  for (let i=0;i<n;i++){
    for (let j=i+1;j<n;j++){
      const same = modOf[i]===modOf[j];
      const p = same ? pIn : pOut;
      if (rng() < p){
        adj[i].push(j);
        adj[j].push(i);
      }
    }
  }
  for (let i=0;i<n;i++){
    if (adj[i].length===0){
      const j = (i+1)%n;
      adj[i].push(j);
      adj[j].push(i);
    }
  }
  return adj;
}

// ---------- Presets ----------
const PRESETS = {
  ecology: {
    darwin: [
      { id:"eco_darwin_scramble", name:"Competitive scramble (complete)", p:{species:6,rBase:0.35,KBase:120,alpha:1.0,beta:0.1,halfSat:40,noise:0.02,net:"complete"} },
      { id:"eco_huxley_harsh", name:"Harsh environment + competition (Huxley-ish)", p:{species:6,rBase:0.28,KBase:90,alpha:1.1,beta:0.0,halfSat:40,noise:0.07,net:"random"} }
    ],
    kropotkin: [
      { id:"eco_kropotkin_harsh", name:"Mutual aid under harshness", p:{species:8,rBase:0.25,KBase:80,alpha:0.35,beta:1.1,halfSat:30,noise:0.08,net:"modular"} },
      { id:"eco_kropotkin_ring", name:"Cooperation on a lattice (ring)", p:{species:10,rBase:0.32,KBase:110,alpha:0.45,beta:0.9,halfSat:35,noise:0.03,net:"ring"} }
    ],
    contemporary: [
      { id:"eco_contemp_mix", name:"Mixed ecology (α≈β), modular network", p:{species:10,rBase:0.35,KBase:120,alpha:0.65,beta:0.65,halfSat:40,noise:0.03,net:"modular"} },
      { id:"eco_contemp_fragile", name:"High competition, needs institutions (β helps but saturates)", p:{species:12,rBase:0.33,KBase:120,alpha:0.9,beta:0.7,halfSat:60,noise:0.04,net:"random"} }
    ]
  },
  moran: {
    darwin: [
      { id:"mor_pd_wellmixed", name:"Prisoner’s dilemma, well-mixed", p:{Npop:120,game:"pd",b:3,c:1,sel:0.6,mu:0.001,net:"wellmixed",institution:0.0,update:"bd"} },
      { id:"mor_pd_highcost", name:"PD, higher cost (defection wins faster)", p:{Npop:120,game:"pd",b:2.5,c:1.2,sel:0.7,mu:0.001,net:"wellmixed",institution:0.0,update:"bd"} }
    ],
    kropotkin: [
      { id:"mor_pd_network", name:"Network reciprocity (ring)", p:{Npop:160,game:"pd",b:6,c:1,sel:0.6,mu:0.001,net:"ring",institution:0.0,update:"db"} },
      { id:"mor_pd_smallworld", name:"Reciprocity via clustering (small-world)", p:{Npop:200,game:"pd",b:5,c:1,sel:0.5,mu:0.001,net:"smallworld",institution:0.0,update:"db"} }
    ],
    contemporary: [
      { id:"mor_pgg_noinst", name:"Commons dilemma, no institution", p:{Npop:160,game:"pgg",b:1.6,c:1,sel:0.6,mu:0.001,net:"smallworld",institution:0.0,update:"db"} },
      { id:"mor_pgg_inst", name:"Commons + institution (Ostrom-ish)", p:{Npop:160,game:"pgg",b:1.6,c:1,sel:0.6,mu:0.001,net:"smallworld",institution:0.8,update:"db"} }
    ]
  }
};

// ---------- State ----------
const state = {
  lang: "en",
  i18n: {},
  mode: "ecology",
  voice: "darwin",
  presetId: null,
  t: 0,
  running: false,
  timer: null,

  // ecology
  eco: {
    species: 6,
    rBase: 0.35,
    KBase: 120,
    alpha: 0.7,
    beta: 0.8,
    halfSat: 40,
    noise: 0.03,
    net: "complete",
    softCap: 5,
    dt: 1,
    N: [],
    r: [],
    K: [],
    adj: [],
    history: [],
    metricsHistory: []
  },

  // moran
  mor: {
    Npop: 120,
    game: "pd",
    b: 3,
    c: 1,
    sel: 0.5,
    mu: 0.001,
    net: "wellmixed",
    institution: 0.0,
    update: "bd",
    strat: [], // 1=C, 0=D
    adj: [],
    history: [],
    metricsHistory: [],
    shock: null
  },

  seed: 123,
  rng: mulberry32(123)
};

// ---------- UI wiring ----------
const el = {};
function cacheEls() {
  const ids = [
    "mode","voice","preset",
    "runBtn","stepBtn","shockBtn","resetBtn",
    "seed","species","rBase","KBase","alpha","beta","halfSat","noise","netEcology",
    "Npop","game","b","c","sel","mu","netMoran","institution",
    "paramsEcology","paramsMoran",
    "metrics","interpretBox",
    "t_title","t_subtitle","t_controls","t_outputs","t_mode","t_voice","t_preset","t_presetHint",
    "t_status","t_step","t_langBadge","t_params","t_paramNote","t_interpret"
  ];
  for (const id of ids) el[id] = document.getElementById(id);
}

function setBadge(text) {
  el.t_status.textContent = text;
}

function updateModePanels() {
  const isEco = state.mode === "ecology";
  el.paramsEcology.style.display = isEco ? "" : "none";
  el.paramsMoran.style.display = isEco ? "none" : "";
}

function readInputs() {
  state.seed = Number(el.seed.value) || 0;
  state.rng = mulberry32(state.seed);

  state.mode = el.mode.value;
  state.voice = el.voice.value;

  // ecology inputs
  state.eco.species = clamp(Number(el.species.value)||6, 2, 30);
  state.eco.rBase = Number(el.rBase.value)||0.35;
  state.eco.KBase = Number(el.KBase.value)||120;
  state.eco.alpha = Number(el.alpha.value)||0;
  state.eco.beta = Number(el.beta.value)||0;
  state.eco.halfSat = Math.max(1e-6, Number(el.halfSat.value)||40);
  state.eco.noise = Math.max(0, Number(el.noise.value)||0);
  state.eco.net = el.netEcology.value;

  // moran inputs
  state.mor.Npop = clamp(Number(el.Npop.value)||120, 10, 500);
  state.mor.game = el.game.value;
  state.mor.b = Number(el.b.value)||3;
  state.mor.c = Number(el.c.value)||1;
  state.mor.sel = clamp(Number(el.sel.value)||0, 0, 1);
  state.mor.mu = clamp(Number(el.mu.value)||0, 0, 0.1);
  state.mor.net = el.netMoran.value;
  state.mor.institution = clamp(Number(el.institution.value)||0, 0, 2);
}

function writeInputsFromState() {
  el.seed.value = state.seed;

  el.mode.value = state.mode;
  el.voice.value = state.voice;

  // ecology
  el.species.value = state.eco.species;
  el.rBase.value = state.eco.rBase;
  el.KBase.value = state.eco.KBase;
  el.alpha.value = state.eco.alpha;
  el.beta.value = state.eco.beta;
  el.halfSat.value = state.eco.halfSat;
  el.noise.value = state.eco.noise;
  el.netEcology.value = state.eco.net;

  // moran
  el.Npop.value = state.mor.Npop;
  el.game.value = state.mor.game;
  el.b.value = state.mor.b;
  el.c.value = state.mor.c;
  el.sel.value = state.mor.sel;
  el.mu.value = state.mor.mu;
  el.netMoran.value = state.mor.net;
  el.institution.value = state.mor.institution;

  updateModePanels();
}

function populatePresets() {
  const list = PRESETS[state.mode][state.voice];
  el.preset.innerHTML = "";
  for (const p of list) {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = p.name;
    el.preset.appendChild(opt);
  }
  if (!state.presetId || !list.some(x=>x.id===state.presetId)) {
    state.presetId = list[0]?.id || null;
  }
  el.preset.value = state.presetId;
}

function loadPreset(presetId) {
  const list = PRESETS[state.mode][state.voice];
  const found = list.find(x=>x.id===presetId) || list[0];
  if (!found) return;
  state.presetId = found.id;
  // apply parameters
  if (state.mode === "ecology") {
    Object.assign(state.eco, found.p);
    // ensure key names
    state.eco.species = found.p.species;
    state.eco.net = found.p.net;
  } else {
    Object.assign(state.mor, found.p);
    state.mor.net = found.p.net;
  }
  writeInputsFromState();
  resetSim();
}

function describeMetricsEco(m) {
  // tiny narrative, intentionally short
  const alpha = state.eco.alpha, beta = state.eco.beta;
  const dir = (beta > alpha) ? "mutual aid dominates" : (alpha > beta ? "competition dominates" : "mixed regime");
  const ext = m.extinctions > 0 ? `Extinctions: ${m.extinctions}.` : "No extinctions yet.";
  const div = `Diversity (Shannon) ≈ ${m.H.toFixed(2)}, inequality (Gini) ≈ ${m.gini.toFixed(2)}.`;
  return `${dir}. Total biomass ≈ ${m.total.toFixed(1)}. ${div} ${ext}`;
}

function describeMetricsMoran(m) {
  const p = m.pC;
  const drift = state.mor.sel < 0.15 ? "Drift-heavy" : "Selection-visible";
  const inst = state.mor.institution > 0.01 ? `Institution active (strength ${state.mor.institution.toFixed(1)}).` : "No institution.";
  return `${drift}. Cooperation frequency p(C) = ${(100*p).toFixed(1)}%. ${inst} Mean payoff ≈ ${m.meanPayoff.toFixed(2)} (Gini ≈ ${m.giniPayoff.toFixed(2)}).`;
}

// ---------- Simulation init ----------
function initEcology() {
  const rng = state.rng;
  const S = state.eco.species;

  // parameters
  const rBase = state.eco.rBase;
  const KBase = state.eco.KBase;

  // heterogeneous r and K
  state.eco.r = Array.from({length:S}, ()=> clamp(rBase*(0.7 + 0.6*rng()), 0.01, 2));
  state.eco.K = Array.from({length:S}, ()=> clamp(KBase*(0.6 + 0.8*rng()), 5, 1e9));
  state.eco.N = Array.from({length:S}, (_,i)=> clamp(0.3*state.eco.K[i]*(0.7+0.6*rng()), 0, state.eco.softCap*state.eco.K[i]));

  // network
  if (state.eco.net === "complete") state.eco.adj = makeAdjListComplete(S);
  else if (state.eco.net === "ring") state.eco.adj = makeAdjListRing(S, 1);
  else if (state.eco.net === "random") state.eco.adj = makeAdjListRandom(S, 0.25, rng);
  else if (state.eco.net === "modular") state.eco.adj = makeAdjListModular(S, 3, 0.7, 0.08, rng);
  else state.eco.adj = makeAdjListComplete(S);

  state.eco.history = [];
  state.eco.metricsHistory = [];
}

function stepEcology() {
  const {N, r, K, adj} = state.eco;
  const S = N.length;
  const alpha = state.eco.alpha;
  const beta = state.eco.beta;
  const H = state.eco.halfSat;
  const noise = state.eco.noise;
  const dt = state.eco.dt;
  const rng = state.rng;

  const Nnext = N.slice();

  for (let i=0;i<S;i++){
    const Ni = N[i];
    const growth = r[i] * Ni * (1 - Ni / K[i]);

    let compSum = 0;
    let mutSum = 0;
    const neigh = adj[i];
    for (let idx=0; idx<neigh.length; idx++){
      const j = neigh[idx];
      const Nj = N[j];
      compSum += Nj / Math.max(1e-6, K[j]);
      mutSum += (Nj / (H + Nj));
    }

    const comp = alpha * Ni * compSum;
    const mut = beta * Ni * mutSum;

    const dN = dt * (growth - comp + mut) + dt * noise * Ni * randn(rng);

    const cap = state.eco.softCap * K[i];
    Nnext[i] = clamp(Ni + dN, 0, cap);
  }

  state.eco.N = Nnext;

  // metrics
  const total = Nnext.reduce((a,b)=>a+b, 0);
  const {H:sh, J} = shannonEvenness(Nnext);
  const gin = gini(Nnext);
  const ext = Nnext.filter(x=>x < 1).length;
  const m = { total, H: sh, J, gini: gin, extinctions: ext };

  state.eco.history.push({t: state.t, N: Nnext.slice(), total});
  state.eco.metricsHistory.push({t: state.t, ...m});

  return m;
}

// ---------- Moran ----------
function initMoran() {
  const rng = state.rng;
  const N = state.mor.Npop;

  // init with 50% cooperators
  state.mor.strat = Array.from({length:N}, ()=> (rng() < 0.5 ? 1 : 0));

  // network
  if (state.mor.net === "wellmixed") {
    state.mor.adj = null;
  } else if (state.mor.net === "ring") {
    state.mor.adj = makeAdjListRing(N, 1);
  } else if (state.mor.net === "random") {
    state.mor.adj = makeAdjListRandom(N, 0.04, rng);
  } else if (state.mor.net === "smallworld") {
    const base = makeAdjListRing(N, 2);
    state.mor.adj = rewireSmallWorld(base, 0.15, rng);
  } else {
    state.mor.adj = null;
  }

  state.mor.history = [];
  state.mor.metricsHistory = [];
  state.mor.shock = null;
}

function computePayoffsWellMixed(strat) {
  const N = strat.length;
  const iC = strat.reduce((a,b)=>a+b, 0);
  const p = iC / N;
  const b = state.mor.b, c = state.mor.c;
  // expected payoffs (PD)
  const piC = p*(b - c) + (1 - p)*(-c);
  const piD = p*b + (1 - p)*0;
  return {piC, piD};
}

function computePayoffsNetworkPD(strat, adj) {
  const N = strat.length;
  const b = state.mor.b, c = state.mor.c;
  const payoff = new Array(N).fill(0);

  for (let i=0;i<N;i++){
    const si = strat[i];
    const neigh = adj[i];
    let sum = 0;
    for (let k=0;k<neigh.length;k++){
      const j = neigh[k];
      const sj = strat[j];
      if (si === 1 && sj === 1) sum += (b - c);
      else if (si === 1 && sj === 0) sum += (-c);
      else if (si === 0 && sj === 1) sum += b;
      // else 0
    }
    payoff[i] = neigh.length ? sum / neigh.length : 0;
  }
  return payoff;
}

function computePayoffsNetworkPGG(strat, adj) {
  const N = strat.length;
  const r = state.mor.b; // synergy factor
  const c = state.mor.c;
  const inst = state.mor.institution;
  const payoff = new Array(N).fill(0);

  for (let i=0;i<N;i++){
    const group = [i, ...adj[i]];
    const gsize = group.length;
    let m = 0;
    for (const j of group) m += strat[j];
    const perCap = (r * m * c) / gsize;

    const si = strat[i];
    let pi = perCap - (si ? c : 0);

    // crude institution: punish defectors more when local cooperation is high; cooperators pay small admin cost
    if (inst > 0) {
      if (si === 0) pi -= inst * (m/gsize) * c;
      else pi -= 0.2 * inst * c;
    }

    payoff[i] = pi;
  }
  return payoff;
}

function stepMoran() {
  const rng = state.rng;
  const strat = state.mor.strat;
  const N = strat.length;
  const w = state.mor.sel;
  const mu = state.mor.mu;
  const update = state.mor.update || "bd";

  let payoffArr = null;
  let piC = 0, piD = 0;

  if (state.mor.net === "wellmixed") {
    // use expected payoffs
    const exp = computePayoffsWellMixed(strat);
    piC = exp.piC; piD = exp.piD;

    // fitness of each individual depends only on strategy
    const fitC = Math.exp(w * piC);
    const fitD = Math.exp(w * piD);
    const weights = strat.map(s => s ? fitC : fitD);

    const parent = pickWeighted(rng, weights);
    let dead = Math.floor(rng()*N);
    // ensure not same? not necessary
    let childStrat = strat[parent];
    if (rng() < mu) childStrat = 1 - childStrat;
    strat[dead] = childStrat;

    // for metrics, synthesize payoff array
    payoffArr = strat.map(s => s ? piC : piD);
  } else {
    const adj = state.mor.adj;
    if (!adj) return { pC: 0.5, meanPayoff: 0, giniPayoff: 0 };

    if (state.mor.game === "pgg") payoffArr = computePayoffsNetworkPGG(strat, adj);
    else payoffArr = computePayoffsNetworkPD(strat, adj);

    // fitness
    // shift payoffs to avoid underflow when very negative
    let minPi = Infinity;
    for (let i=0;i<N;i++) if (payoffArr[i] < minPi) minPi = payoffArr[i];
    const shift = (minPi < 0) ? (-minPi) : 0;
    const fitness = payoffArr.map(pi => Math.exp(w * (pi + shift)));

    if (update === "db") {
      // death-birth: random death, neighbors compete
      const dead = Math.floor(rng()*N);
      const neigh = adj[dead];
      const candidates = neigh.length ? neigh : Array.from({length:N}, (_,i)=>i);
      const weights = candidates.map(i => fitness[i]);
      const winnerIdx = candidates[pickWeighted(rng, weights)];
      let childStrat = strat[winnerIdx];
      if (rng() < mu) childStrat = 1 - childStrat;
      strat[dead] = childStrat;
    } else {
      // birth-death: global parent, replace random neighbor
      const parent = pickWeighted(rng, fitness);
      const neigh = adj[parent];
      const dead = neigh.length ? neigh[Math.floor(rng()*neigh.length)] : Math.floor(rng()*N);
      let childStrat = strat[parent];
      if (rng() < mu) childStrat = 1 - childStrat;
      strat[dead] = childStrat;
    }
  }

  // shock handling (temporary b drop)
  if (state.mor.shock && state.t >= state.mor.shock.until) {
    state.mor.b = state.mor.shock.restoreB;
    state.mor.shock = null;
    writeInputsFromState();
  }

  const iC = strat.reduce((a,b)=>a+b, 0);
  const pC = iC / N;
  const meanPayoff = payoffArr ? payoffArr.reduce((a,b)=>a+b,0)/N : 0;
  const giniPayoff = payoffArr ? gini(payoffArr.map(x => x - Math.min(0, Math.min(...payoffArr)))) : 0; // shift negatives for gini
  const {H, J} = shannonEvenness([iC, N-iC]);

  const m = { pC, meanPayoff, giniPayoff, H, J };

  state.mor.history.push({t: state.t, pC});
  state.mor.metricsHistory.push({t: state.t, ...m});

  return m;
}

// ---------- Charts ----------
let chart1 = null;
let chart2 = null;

function makeChart(ctx, datasets, yLabel) {
  return new Chart(ctx, {
    type: "line",
    data: { labels: [], datasets },
    options: {
      responsive: true,
      animation: false,
      maintainAspectRatio: false,
      plugins: { legend: { display: true } },
      scales: {
        x: { title: { display: true, text: "t" } },
        y: { title: { display: true, text: yLabel } }
      }
    }
  });
}

function initCharts() {
  if (chart1) chart1.destroy();
  if (chart2) chart2.destroy();

  const ctx1 = document.getElementById("chart1");
  const ctx2 = document.getElementById("chart2");

  if (state.mode === "ecology") {
    const S = state.eco.species;
    const show = Math.min(8, S);
    const ds = [];
    for (let i=0;i<show;i++){
      ds.push({ label: `S${i+1}`, data: [], borderWidth: 2, pointRadius: 0 });
    }
    ds.push({ label: "Total", data: [], borderWidth: 3, borderDash: [6,4], pointRadius: 0 });
    chart1 = makeChart(ctx1, ds, "Population / biomass");

    const ds2 = [
      { label: "Shannon H", data: [], borderWidth: 2, pointRadius: 0 },
      { label: "Gini", data: [], borderWidth: 2, pointRadius: 0 },
      { label: "Extinctions", data: [], borderWidth: 2, pointRadius: 0 }
    ];
    chart2 = makeChart(ctx2, ds2, "Metric value");
  } else {
    chart1 = makeChart(ctx1, [{ label: "p(C)", data: [], borderWidth: 3, pointRadius: 0 }], "Cooperator frequency");
    chart2 = makeChart(ctx2, [
      { label: "Mean payoff", data: [], borderWidth: 2, pointRadius: 0 },
      { label: "Payoff inequality (Gini)", data: [], borderWidth: 2, pointRadius: 0 }
    ], "Value");
  }
}

function pushChartPoint(t, m) {
  const maxPoints = 300;

  chart1.data.labels.push(t);
  chart2.data.labels.push(t);

  if (state.mode === "ecology") {
    const N = state.eco.N;
    const show = Math.min(8, N.length);
    for (let i=0;i<show;i++){
      chart1.data.datasets[i].data.push(N[i]);
    }
    // total dataset is last
    chart1.data.datasets[show].data.push(m.total);

    chart2.data.datasets[0].data.push(m.H);
    chart2.data.datasets[1].data.push(m.gini);
    chart2.data.datasets[2].data.push(m.extinctions);
  } else {
    chart1.data.datasets[0].data.push(m.pC);
    chart2.data.datasets[0].data.push(m.meanPayoff);
    chart2.data.datasets[1].data.push(m.giniPayoff);
  }

  // trim
  if (chart1.data.labels.length > maxPoints) {
    chart1.data.labels.shift();
    chart1.data.datasets.forEach(ds => ds.data.shift());
  }
  if (chart2.data.labels.length > maxPoints) {
    chart2.data.labels.shift();
    chart2.data.datasets.forEach(ds => ds.data.shift());
  }

  chart1.update();
  chart2.update();
}

// ---------- Metrics UI ----------
function renderMetrics(m) {
  const box = el.metrics;
  box.innerHTML = "";

  function add(k, v) {
    const d = document.createElement("div");
    d.className = "metric";
    d.innerHTML = `<div class="k">${k}</div><div class="v">${v}</div>`;
    box.appendChild(d);
  }

  if (state.mode === "ecology") {
    add("Total biomass", m.total.toFixed(1));
    add("Shannon H", m.H.toFixed(2));
    add("Evenness J", m.J.toFixed(2));
    add("Gini", m.gini.toFixed(2));
    add("Extinctions", String(m.extinctions));
    add("Network", state.eco.net);
    el.interpretBox.textContent = describeMetricsEco(m);
  } else {
    add("p(C)", (100*m.pC).toFixed(1) + "%");
    add("Shannon H", m.H.toFixed(2));
    add("Evenness J", m.J.toFixed(2));
    add("Mean payoff", m.meanPayoff.toFixed(2));
    add("Gini payoff", m.giniPayoff.toFixed(2));
    add("Structure", state.mor.net);
    el.interpretBox.textContent = describeMetricsMoran(m);
  }
}

// ---------- Top-level simulation control ----------
function resetSim() {
  stopRun();
  state.t = 0;
  el.t_step.textContent = "t = 0";
  setBadge("Paused");

  readInputs();
  populatePresets();
  // note: keep current preset selection, do not override
  // but if preset selection changed, apply it
  // (this keeps UI consistent)
  const pid = el.preset.value || state.presetId;
  state.presetId = pid;

  if (state.mode === "ecology") initEcology();
  else initMoran();

  initCharts();

  // initial metric push
  let m = null;
  if (state.mode === "ecology") {
    m = { total: state.eco.N.reduce((a,b)=>a+b,0), ...shannonEvenness(state.eco.N), gini: gini(state.eco.N), extinctions: state.eco.N.filter(x=>x<1).length };
  } else {
    const iC = state.mor.strat.reduce((a,b)=>a+b,0);
    const pC = iC / state.mor.strat.length;
    const {H,J} = shannonEvenness([iC, state.mor.strat.length-iC]);
    m = { pC, meanPayoff:0, giniPayoff:0, H, J };
  }
  renderMetrics(m);
  pushChartPoint(state.t, m);
}

function stepOnce() {
  // do not step while running (avoid double)
  let m = null;
  if (state.mode === "ecology") m = stepEcology();
  else m = stepMoran();

  state.t += 1;
  el.t_step.textContent = `t = ${state.t}`;

  renderMetrics(m);
  pushChartPoint(state.t, m);
}

function runLoop() {
  // moderate speed: 4 steps per tick
  for (let k=0;k<4;k++) stepOnce();
}

function startRun() {
  if (state.running) return;
  state.running = true;
  setBadge("Running");
  el.runBtn.textContent = "Pause";
  state.timer = setInterval(runLoop, 180);
}

function stopRun() {
  state.running = false;
  el.runBtn.textContent = "Run";
  if (state.timer) clearInterval(state.timer);
  state.timer = null;
}

function toggleRun() {
  if (state.running) {
    stopRun();
    setBadge("Paused");
  } else {
    startRun();
  }
}

function applyShock() {
  if (state.mode === "ecology") {
    state.eco.N = state.eco.N.map(x => x * 0.5);
    const m = { total: state.eco.N.reduce((a,b)=>a+b,0), ...shannonEvenness(state.eco.N), gini: gini(state.eco.N), extinctions: state.eco.N.filter(x=>x<1).length };
    renderMetrics(m);
    pushChartPoint(state.t, m);
  } else {
    // temporary benefit drop
    if (!state.mor.shock) {
      state.mor.shock = { restoreB: state.mor.b, until: state.t + 100 };
      state.mor.b = state.mor.b * 0.5;
      writeInputsFromState();
    }
  }
}

// ---------- i18n ----------
function getLangFromQuery() {
  const m = new URLSearchParams(location.search).get("lang");
  if (m && m.toLowerCase().startsWith("es")) return "es";
  return "en";
}

async function loadI18n(lang) {
  // Try i18n/lang.json; fall back to en.json
  async function fetchJson(p) {
    const res = await fetch(p, {cache:"no-cache"});
    if (!res.ok) throw new Error("fetch failed");
    return await res.json();
  }
  try {
    return await fetchJson(`./i18n/${lang}.json`);
  } catch (_) {
    try { return await fetchJson(`./i18n/en.json`); } catch (e) { return {}; }
  }
}

function applyI18n() {
  const t = state.i18n || {};
  const map = {
    t_title: "title",
    t_subtitle: "subtitle",
    t_controls: "controls",
    t_outputs: "outputs",
    t_mode: "mode",
    t_voice: "voice",
    t_preset: "preset",
    t_presetHint: "presetHint",
    t_params: "params",
    t_paramNote: "paramNote",
    t_interpret: "interpret"
  };
  for (const [id, key] of Object.entries(map)) {
    if (t[key]) document.getElementById(id).textContent = t[key];
  }
  el.t_langBadge.textContent = state.lang.toUpperCase();
}

// ---------- Events ----------
function wireEvents() {
  el.mode.addEventListener("change", () => {
    readInputs();
    updateModePanels();
    populatePresets();
    resetSim();
  });

  el.voice.addEventListener("change", () => {
    readInputs();
    populatePresets();
    resetSim();
  });

  el.preset.addEventListener("change", () => {
    readInputs();
    loadPreset(el.preset.value);
  });

  el.runBtn.addEventListener("click", toggleRun);
  el.stepBtn.addEventListener("click", () => { if (!state.running) stepOnce(); });
  el.resetBtn.addEventListener("click", resetSim);
  el.shockBtn.addEventListener("click", applyShock);

  // any parameter edit triggers reset (to keep logic clean)
  const resetOn = ["seed","species","rBase","KBase","alpha","beta","halfSat","noise","netEcology","Npop","game","b","c","sel","mu","netMoran","institution"];
  resetOn.forEach(id => {
    const node = el[id];
    if (!node) return;
    node.addEventListener("change", resetSim);
  });

  // iframe ↔ parent bridge
  window.addEventListener("message", (ev) => {
    const data = ev.data || {};
    if (data.type === "loadPreset" && typeof data.presetId === "string") {
      // figure out which mode/voice it belongs to
      for (const mode of ["ecology","moran"]) {
        for (const voice of ["darwin","kropotkin","contemporary"]) {
          const list = PRESETS[mode][voice];
          if (list.some(p => p.id === data.presetId)) {
            state.mode = mode;
            state.voice = voice;
            state.presetId = data.presetId;
            writeInputsFromState();
            populatePresets();
            el.preset.value = data.presetId;
            resetSim();
            return;
          }
        }
      }
    }
    if (data.type === "setLang" && (data.lang === "en" || data.lang === "es")) {
      setLang(data.lang);
    }
  });
}

async function setLang(lang) {
  state.lang = lang;
  state.i18n = await loadI18n(lang);
  applyI18n();
}

// ---------- Boot ----------
(async function boot() {
  cacheEls();
  state.lang = getLangFromQuery();
  state.i18n = await loadI18n(state.lang);
  applyI18n();

  readInputs();
  updateModePanels();
  populatePresets();
  resetSim();
  wireEvents();
})();
