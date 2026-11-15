import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const PARTS = window.PARTS;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* =================== 3D =================== */
const stage = document.getElementById('stage');
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
stage.prepend(renderer.domElement);
const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(renderer),0.04).texture;
const camera = new THREE.PerspectiveCamera(32,1,1,2000);
const HOME = new THREE.Vector3(-34,26,122);
camera.position.copy(HOME);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; controls.minDistance = 35; controls.maxDistance = 260; controls.target.set(0,0,0);
renderer.toneMappingExposure = 1.45;
const key = new THREE.DirectionalLight(0xffffff,2.6);
const fill = new THREE.DirectionalLight(0xdbe6ff,1.2); fill.position.set(-60,20,80); scene.add(fill); key.position.set(40,80,90); scene.add(key);
scene.add(new THREE.HemisphereLight(0xe6eeff,0x4a3e33,1.1));

function stageColor(){ return getComputedStyle(document.documentElement).getPropertyValue('--stage').trim()||'#DCE2E6'; }
function applyTheme(){ renderer.setClearColor(new THREE.Color(stageColor())); }
applyTheme();
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',applyTheme);
new MutationObserver(applyTheme).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});

// material helpers
const M = (color, o={}) => new THREE.MeshStandardMaterial({color, roughness:o.r??0.55, metalness:o.m??0.1, transparent:o.t!=null, opacity:o.t??1, side:o.side??THREE.FrontSide, depthWrite:o.t==null});
const box = (w,h,d,mat,x=0,y=0,z=0,parent) => { const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat); m.position.set(x,y,z); parent&&parent.add(m); return m; };
const cyl = (r,h,mat,seg=32) => new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,seg),mat);

function pcbTexture(base,trace,label){
  const c=document.createElement('canvas'); c.width=512;c.height=640; const g=c.getContext('2d');
  g.fillStyle=base; g.fillRect(0,0,512,640);
  g.strokeStyle=trace; g.lineWidth=2; g.globalAlpha=.55;
  let s=7; const rnd=()=> (s=(s*16807)%2147483647)/2147483647;
  for(let i=0;i<140;i++){ let x=rnd()*512,y=rnd()*640; g.beginPath(); g.moveTo(x,y); for(let k=0;k<3;k++){ if(rnd()<.5) x+= (rnd()-.5)*160; else y+=(rnd()-.5)*160; g.lineTo(x,y);} g.stroke(); }
  g.globalAlpha=1; g.fillStyle='rgba(255,255,255,.55)'; g.font='bold 22px monospace'; if(label) g.fillText(label,26,612);
  const t=new THREE.CanvasTexture(c); t.colorSpace=THREE.SRGBColorSpace; return t;
}

function makeFan(size, frameMat, bladeMat){
  const g=new THREE.Group(), R=size/2, d=2.5, t=0.7;
  box(size,t,d,frameMat,0,R-t/2,0,g); box(size,t,d,frameMat,0,-R+t/2,0,g);
  box(t,size,d,frameMat,R-t/2,0,0,g); box(t,size,d,frameMat,-R+t/2,0,0,g);
  const ring=new THREE.Mesh(new THREE.CylinderGeometry(R-0.5,R-0.5,d,40,1,true),frameMat); ring.material=frameMat.clone(); ring.material.side=THREE.DoubleSide; ring.rotation.x=Math.PI/2; g.add(ring);
  const rotor=new THREE.Group(); g.add(rotor);
  const hub=cyl(R*0.32,d*0.8,frameMat); hub.rotation.x=Math.PI/2; rotor.add(hub);
  for(let i=0;i<7;i++){ const piv=new THREE.Group(); piv.rotation.z=i*Math.PI*2/7; const L=R*0.62; const b=box(L,R*0.36,0.12,bladeMat,R*0.32+L/2-0.2,0,0,piv); b.rotation.x=0.55; rotor.add(piv); }
  g.userData.rotor=rotor; return g;
}

const parts={}; const spinners=[];
function part(id, base, offset, anchor){
  const g=new THREE.Group(); g.position.copy(base); g.userData={id, base:base.clone(), offset, anchor: anchor||new THREE.Vector3()};
  scene.add(g); parts[id]=g; return g;
}
const V=(x,y,z)=>new THREE.Vector3(x,y,z);

/* ---- CASE (front = +x, rear = -x, glass = +z) ---- */
const W=22,H=46,D=44;
const caseG = part('case', V(0,0,0), V(0,0,0), V(-D/2+5,-H/2+3,W/2));
{
  const steel=M(0x23272b,{r:.6,m:.5}), steel2=M(0x2d3237,{r:.7,m:.4});
  box(D,H,0.4,steel2,0,0,-W/2,caseG);                       // back wall (mobo tray)
  box(D,0.5,W,steel,0,H/2,0,caseG); box(D,0.5,W,steel,0,-H/2,0,caseG); // top/bottom
  box(0.5,H,W,M(0x1b1e21,{r:.9}),-D/2,0,0,caseG);           // rear panel
  // front mesh panel
  const front=box(0.6,H,W,M(0x16181a,{r:.95,t:.45}),D/2,0,0,caseG);
  // shroud
  box(D-1,0.4,W-0.6,steel,0,-13.6,0,caseG); box(D-1,9.2,0.4,steel,0,-18.2,W/2-0.5,caseG);
  // feet & rear IO cutout frame
  [[-18,-8],[18,-8],[-18,8],[18,8]].forEach(([x,z])=>box(4,1,2.4,M(0x0d0e0f),x,-H/2-0.7,z,caseG));
  // power button + USB
  const pb=cyl(0.8,0.4,M(0xcfd5d9,{m:.8,r:.3})); pb.position.set(D/2-6,H/2+0.25,4); caseG.add(pb);
  box(1.4,0.3,0.6,M(0x0a0a0a),D/2-10,H/2+0.2,4,caseG); box(1.4,0.3,0.6,M(0x0a0a0a),D/2-12.5,H/2+0.2,4,caseG);
  // glass side
  const glass=new THREE.Mesh(new THREE.BoxGeometry(D-1,H-1,0.4), new THREE.MeshPhysicalMaterial({color:0x8899a6,transparent:true,opacity:.16,roughness:.05,metalness:0,depthWrite:false}));
  glass.position.set(0,0,W/2); glass.userData.glass=true; caseG.add(glass);
  // glass edge frame
  const ef=M(0x111315,{r:.5,m:.4});
  box(D,0.6,0.6,ef,0,H/2-0.3,W/2,caseG); box(D,0.6,0.6,ef,0,-H/2+0.3,W/2,caseG); box(0.6,H,0.6,ef,-D/2+0.3,0,W/2,caseG); box(0.6,H,0.6,ef,D/2-0.3,0,W/2,caseG);
  caseG.userData.glass=glass;
}

/* ---- MOTHERBOARD ---- */
const moboG = part('mobo', V(-8.3,6.75,-W/2+0.6), V(0,0,-4), V(5,-4,0.5));
{
  const pcb=new THREE.MeshStandardMaterial({map:pcbTexture('#15201b','#3f8f6a','ATX · B650'),roughness:.7,metalness:.1});
  box(24.4,30.5,0.2,pcb,0,0,0,moboG);
  // rear IO shroud
  box(3,13,3,M(0x2b2f33,{m:.5,r:.4}),-10.6,7.5,1.6,moboG);
  // VRM heatsinks
  box(2.4,10,2,M(0x3a4047,{m:.7,r:.35}),-8.2,7.5,1.1,moboG); box(9,2.4,2,M(0x3a4047,{m:.7,r:.35}),-2.5,13.4,1.1,moboG);
  // socket
  box(5.6,5.6,0.6,M(0x8f969c,{m:.8,r:.3}),-1.8,6.2,0.4,moboG);
  // RAM slots
  for(let i=0;i<4;i++) box(0.75,13.3,0.9,M(0x1c1c1e),6.0+i*1.05,6.2,0.55,moboG);
  // PCIe slots
  box(9,0.8,0.9,M(0x9aa1a7,{m:.6,r:.35}),-4.5,-7.75,0.55,moboG); box(9,0.8,0.9,M(0x1c1c1e),-4.5,-13,0.55,moboG);
  // chipset heatsink + M.2 cover area
  box(5,5,1,M(0x3a4047,{m:.7,r:.35}),5,-10,0.6,moboG);
  // 24 pin
  box(1.2,5.2,1.4,M(0x0f0f10),11.4,4,0.8,moboG);
  // CMOS battery
  const bat=cyl(1,0.35,M(0xc9cdd0,{m:.9,r:.25})); bat.rotation.x=Math.PI/2; bat.position.set(0,-11,0.3); moboG.add(bat);
}

/* ---- CPU ---- */
const cpuBase=V(-10.1,12.95,-W/2+1.4);
const cpuG = part('cpu', cpuBase, V(0,6,16), V(0,0,0.5));
{
  box(4,4,0.25,M(0x1f5a3c,{r:.6}),0,0,0,cpuG);
  box(3.4,3.4,0.45,M(0xbfc5ca,{m:.95,r:.25}),0,0,0.35,cpuG);
}

/* ---- COOLER ---- */
const coolG = part('cooler', V(-10.1,12.95,-W/2+1.9), V(-4,16,28), V(0,6.5,14));
{
  const al=M(0xc7ccd1,{m:.85,r:.32}), cu=M(0xb87333,{m:.9,r:.3});
  box(4,4,0.8,cu,0,0,0.4,coolG);
  for(let i=0;i<4;i++){ const hp=cyl(0.3,13,cu,12); hp.rotation.x=Math.PI/2; hp.position.set(-1.2+i*0.8,0,6.5); coolG.add(hp); }
  for(let i=0;i<24;i++) box(5,12.4,0.14,al,0,0,2.6+i*0.5,coolG);
  box(5.1,12.4,0.5,M(0x1a1c1e,{m:.4,r:.4}),0,0,14.6,coolG); // top cap
  const f=makeFan(12,M(0x1b1d20,{r:.6}),M(0x2c2f33,{r:.5})); f.rotation.y=Math.PI/2; f.position.set(3.8,0,8.6); coolG.add(f); spinners.push(f.userData.rotor);
}

/* ---- RAM ---- */
const ramG = part('ram', V(-2.3+0.0,12.95,-W/2+1.2), V(10,12,20), V(1.5,7,4));
{
  const hs=M(0x1d2024,{m:.6,r:.35}), rgb=new THREE.MeshStandardMaterial({color:0xffffff,emissive:0x8fd3ff,emissiveIntensity:.9,roughness:.3});
  [1.05,3.15].forEach(x=>{ box(0.7,13.3,3.5,hs,x,0,1.75,ramG); box(0.72,13.3,0.5,rgb,x,0,3.6,ramG); box(0.5,13.3,0.3,M(0x1f5a3c),x,0,-0.05,ramG); });
}

/* ---- M.2 NVMe ---- */
const nvmeG = part('nvme', V(-9.8,4.2,-W/2+1.1), V(-8,0,12), V(0,0,0.6));
{
  box(8,2.2,0.15,M(0x13301f,{r:.6}),0,0,0,nvmeG);
  box(2.2,1.7,0.25,M(0x0c0c0c,{r:.5}),-1.6,0,0.2,nvmeG); box(2.2,1.7,0.25,M(0x0c0c0c,{r:.5}),1.2,0,0.2,nvmeG);
  box(1.2,1.2,0.22,M(0x0c0c0c),3.2,0,0.18,nvmeG);
  box(8.2,2.4,0.4,M(0x5c646c,{m:.8,r:.35,t:.0001}),0,0,0.5,nvmeG); // placeholder invisible (heatsink off)
}

/* ---- GPU ---- */
const gpuG = part('gpu', V(-6,-1.3,-W/2+1.6), V(2,-6,24), V(4,0,6));
{
  const shroud=M(0x24272b,{m:.45,r:.42}), accent=M(0x6d747b,{m:.8,r:.3});
  box(30,0.15,11,M(0x15201b),0,1.1,5.5,gpuG);            // PCB
  box(30,3.4,12,shroud,0,-0.8,6,gpuG);                     // cooler shroud
  box(30,0.2,12,accent,0,0.98,6,gpuG);                     // backplate (top)
  box(0.3,1.2,12.4,accent,-15.1,-0.4,6.1,gpuG);            // stripe
  box(0.25,12,2.0,M(0xa9b0b6,{m:.9,r:.25}),-15.2,-0.2,-0.4,gpuG); // bracket
  box(0.4,1.2,0.6,M(0x0d0d0d),5,1.6,11,gpuG);               // 12V-2x6 plug
  [-9.5,0,9.5].forEach(x=>{ const f=makeFan(9.2,M(0x1a1c1f,{r:.6}),M(0x34383d,{r:.45})); f.rotation.x=Math.PI/2; f.position.set(x,-2.6,6); gpuG.add(f); spinners.push(f.userData.rotor); });
  box(10,0.5,0.5,M(0x9aa1a7,{m:.6}),-4.3,1.2,-0.4,gpuG);   // edge connector
}

/* ---- PSU ---- */
const psuG = part('psu', V(-13,-18.3,-0.5), V(-16,-12,20), V(0,4.5,7.5));
{
  const shell=M(0x16181a,{r:.55,m:.5});
  box(15,8.6,15,shell,0,0,0,psuG);
  const f=makeFan(12,M(0x101112,{r:.6}),M(0x2a2d30)); f.rotation.x=Math.PI/2; f.position.set(0,-4.5,0); psuG.add(f);
  box(0.3,3,4,M(0x050505),-7.6,1,3,psuG);
  box(15.05,1,15.05,M(0x2e3236,{m:.6}),0,3.8,0,psuG);
}

/* ---- SATA (HDD + 2.5 SSD) ---- */
const sataG = part('sata', V(12,-19.6,0), V(20,-12,16), V(0,1.5,5));
{
  box(14.7,2.6,10.2,M(0xaab1b7,{m:.85,r:.35}),0,0,0,sataG);
  box(14.7,0.15,10.2,M(0x9097a0,{m:.85,r:.3}),0,1.35,0,sataG);
  box(7,0.1,5,M(0xe8ecef,{r:.8}),0,1.43,0,sataG);
  // 2.5 SSD on shroud
  box(10,0.7,7,M(0x2a2e33,{m:.4,r:.5}),0,7,0,sataG); box(6,0.05,3,M(0xE58C52,{r:.5}),0,7.37,0,sataG);
}

/* ---- FANS ---- */
const fansG = part('fans', V(D/2-1.8,0,0), V(14,0,0), V(0,17,0));
{
  [17,4.5,-8].forEach(y=>{ const f=makeFan(12,M(0x1b1d20,{r:.6}),M(0x2c3035,{r:.45})); f.rotation.y=Math.PI/2; f.position.set(0,y,0); fansG.add(f); spinners.push(f.userData.rotor); });
  const rf=makeFan(12,M(0x1b1d20,{r:.6}),M(0x2c3035,{r:.45})); rf.rotation.y=Math.PI/2; rf.position.set(-D+3.6,14.8,0); fansG.add(rf); spinners.push(rf.userData.rotor);
  fansG.userData.rear=rf;
}

/* ---- cables (decor, fade when exploded) ---- */
const cableMat=new THREE.MeshStandardMaterial({color:0x111214,roughness:.8,transparent:true,opacity:1});
const cables=new THREE.Group(); scene.add(cables);
function cable(pts,r=0.45){ const c=new THREE.CatmullRomCurve3(pts.map(p=>V(...p))); cables.add(new THREE.Mesh(new THREE.TubeGeometry(c,40,r,8,false),cableMat)); }
cable([[-8,-13.8,4],[2,-13.2,6],[3.4,1,-5],[3.4,10.75,-9.2]],0.75);   // 24-pin
cable([[-14,-13.8,3],[-16,0,0],[-17,18,-6],[-14,21,-9.6]],0.4);      // EPS
cable([[-4,-13.8,5],[2,-6,6],[-1,-1.1,6.5]],0.45);                     // GPU power

/* ---- selection, labels, raycast ---- */
const pickables=[];
Object.values(parts).forEach(g=>g.traverse(o=>{ if(o.isMesh){ o.userData.part=g.userData.id; if(!o.userData.glass) pickables.push(o); if(o.material && !o.material.userData?.cloned){ o.material=o.material.clone(); o.material.userData={cloned:true, emi:o.material.emissive?.clone(), ei:o.material.emissiveIntensity}; } } }));
const labelsEl=document.getElementById('labels');
const labelBtns={};
PARTS.forEach((p,i)=>{ const b=document.createElement('button'); b.type='button'; b.className='lbl'; b.dataset.id=p.id; b.innerHTML=`<i>${i+1}</i><span>${p.name}</span>`; b.onclick=()=>window.__select(p.id,true); labelsEl.appendChild(b); labelBtns[p.id]=b; });
labelBtns[window.__getCurrent()].classList.add('on');

const HL=new THREE.Color(0xE58C52);
function highlight(id){
  Object.values(parts).forEach(g=>g.traverse(o=>{ if(!o.isMesh||!o.material.emissive||o.userData.glass) return; const on=g.userData.id===id && id!=='case'; const u=o.material.userData;
    if(on){ o.material.emissive.copy(HL); o.material.emissiveIntensity=0.28; } else { o.material.emissive.copy(u.emi); o.material.emissiveIntensity=u.ei; } }));
}
const tmp=new THREE.Vector3(), targetGoal=new THREE.Vector3(); let focusing=false;
function focus(id){ highlight(id); const g=parts[id]; targetGoal.copy(g.userData.anchor).applyMatrix4(g.matrixWorld); if(id==='case') targetGoal.set(0,0,0); targetGoal.multiplyScalar(0.55); focusing=true; }
window.__pc={focus};

const ray=new THREE.Raycaster(), ptr=new THREE.Vector2(); let down=null;
renderer.domElement.addEventListener('pointerdown',e=>{down=[e.clientX,e.clientY]});
renderer.domElement.addEventListener('pointerup',e=>{
  if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>5) return;
  const r=renderer.domElement.getBoundingClientRect(); ptr.set(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1);
  ray.setFromCamera(ptr,camera); const hits=ray.intersectObjects(pickables.filter(m=>m.visible&&isVisible(m)),false);
  // prefer inner parts over case shell
  const hit=hits.find(h=>h.object.userData.part!=='case')||hits[0];
  if(hit) window.__select(hit.object.userData.part,false);
});
function isVisible(o){ while(o){ if(!o.visible) return false; o=o.parent; } return true; }

/* ---- controls ---- */
const explodeEl=document.getElementById('explode'), caseEl=document.getElementById('showCase'), namesEl=document.getElementById('showNames'), spinEl=document.getElementById('spin');
let explodeT=0, explodeGoal=0, distGoal=0, dollying=false;
explodeEl.oninput=()=>{explodeGoal=+explodeEl.value; distGoal=HOME.length()*(1+0.45*explodeGoal); dollying=true;};
caseEl.onchange=()=>{ caseG.visible=caseEl.checked; };
namesEl.onchange=()=>labelsEl.classList.toggle('hide-names',!namesEl.checked);
spinEl.onchange=()=>{controls.autoRotate=spinEl.checked};
controls.autoRotateSpeed=1.2;
document.getElementById('resetView').onclick=()=>{ camera.position.copy(HOME); targetGoal.set(0,0,0); focusing=true; };
if(innerWidth<520){ namesEl.checked=false; labelsEl.classList.add('hide-names'); }

function resize(){ const w=stage.clientWidth,h=stage.clientHeight; renderer.setSize(w,h,false); camera.aspect=w/h; camera.updateProjectionMatrix(); if(w<600){ HOME.set(-44,34,160);} }
new ResizeObserver(resize).observe(stage); resize();
if(stage.clientWidth<600) camera.position.copy(HOME);

const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
const clock=new THREE.Clock();
function tick(){
  const dt=Math.min(clock.getDelta(),0.05);
  explodeT += (explodeGoal-explodeT)*Math.min(1,dt*(reduceMotion?60:7));
  const e=ease(explodeT);
  Object.values(parts).forEach(g=>{ g.position.copy(g.userData.base).addScaledVector(g.userData.offset,e); });
  // glass slides away
  const gl=caseG.userData.glass; gl.position.z=W/2+e*20; gl.material.opacity=.16*(1-e); gl.visible=e<.97;
  // rear fan stays with case rear when fans explode front
  fansG.userData.rear.position.x=-D+3.6-e*24;
  cableMat.opacity=1-Math.min(1,e*2.2); cables.visible=cableMat.opacity>0.02;
  if(!reduceMotion) spinners.forEach((r,i)=>r.rotation.z+=dt*(i%2?9:11));
  if(dollying){ const d=camera.position.clone().sub(controls.target); const L=d.length(); const nl=L+(distGoal-L)*Math.min(1,dt*4); camera.position.copy(controls.target).add(d.setLength(nl)); if(Math.abs(distGoal-nl)<0.5) dollying=false; }
  if(focusing){ controls.target.lerp(targetGoal,Math.min(1,dt*5)); if(controls.target.distanceTo(targetGoal)<0.05) focusing=false; }
  controls.update();
  renderer.render(scene,camera);
  // labels
  const r=stage.getBoundingClientRect();
  Object.entries(labelBtns).forEach(([id,b])=>{
    const g=parts[id]; if(id==='case' && !caseG.visible){ b.style.display='none'; return; }
    tmp.copy(g.userData.anchor).applyMatrix4(g.matrixWorld).project(camera);
    if(tmp.z>1){ b.style.display='none'; return; }
    b.style.display=''; b.style.left=((tmp.x+1)/2*r.width)+'px'; b.style.top=((1-tmp.y)/2*r.height)+'px';
  });
  requestAnimationFrame(tick);
}
scene.updateMatrixWorld(true);
highlight(window.__getCurrent()); focus(window.__getCurrent());
document.getElementById('loading').remove();
tick();
