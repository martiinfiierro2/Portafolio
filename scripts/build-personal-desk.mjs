import fs from 'node:fs';
import path from 'node:path';
import {homedir} from 'node:os';
import {fileURLToPath,pathToFileURL} from 'node:url';
const HERE=process.env.DESK_OUTPUT_DIR ? path.resolve(process.env.DESK_OUTPUT_DIR) : path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public/illustrations");
fs.mkdirSync(HERE,{recursive:true});
const KIT=path.resolve(process.env.ANATOMY_ASSET_HOME||path.join(homedir(),'.agents/skills/anatomy-asset'));
const k=await import(pathToFileURL(path.join(KIT,'kit/iso-kit.mjs'))),a=await import(pathToFileURL(path.join(KIT,'kit/asset.mjs'))),G=await import(pathToFileURL(path.join(KIT,'kit/lathe.mjs'))),A=await import(pathToFileURL(path.join(KIT,'kit/audit.mjs')));
const T=await import(pathToFileURL(path.join(KIT,'kit/tube.mjs')));
const W=1536,H=1024;
const P=a.fitInto(k.boxCorners({x:-190,y:-85,w:380,d:310,r:0},0,247),{x:38,y:30,w:1460,h:950},{pad:32,azimuth:55,elevation:30});
const R=A.recorder(P),at=p=>k.iso(p,P),details=[];let count=0;
const material=(svg,name)=>name?`<g class="ac-${name}">${svg}</g>`:svg;
const line=(d,tone='faint',free=false)=>k.lineSvg(d,{tone,free});
const groove=(plan,z,tone='faint')=>line(k.planOutline(plan,z,P,4),tone);
const hollow=svg=>svg.replaceAll('class="iso-fill"','class="iso-fill" style="fill-rule:evenodd"').replaceAll('class="iso-top"','class="iso-top" style="fill-rule:evenodd"');
const motionRules=[],KEY_PERIOD=8,keyHits={};
const typingKeys=[[1,2],[1,3],[2,1],[2,2],[1,4],[2,3],[2,4],[1,8],[2,7],[2,8],[3,3],[0,0]];
for(let i=0;i<36;i++){const [row,col]=typingKeys[i%typingKeys.length],name=`keyboard.key-${row}-${col}`;(keyHits[name]??=[]).push(.45+i*.155)}
keyHits['keyboard.bottom-2']=[1.35,2.25,3.15,4.05,5.15,6.05];keyHits['keyboard.key-2-11']=[6.25];
const pct=s=>(100*s/KEY_PERIOD).toFixed(4)+'%';
function keyWrap(name,svg){
 const hits=keyHits[name];if(!hits)return svg;
 const id=name.replaceAll('.','-'),a0=at([0,0,0]),a1=at([0,0,-.85]),down=`translate(${(a1[0]-a0[0]).toFixed(3)}px,${(a1[1]-a0[1]).toFixed(3)}px)`;
 let move='0%{transform:translate(0,0)}',glow='0%{opacity:0}';
 for(const t of hits){move+=`${pct(t)}{transform:translate(0,0);animation-timing-function:cubic-bezier(.23,1,.32,1)}${pct(t+.045)},${pct(t+.1)}{transform:${down}}${pct(t+.15)}{transform:translate(0,0)}`;glow+=`${pct(t)}{opacity:0}${pct(t+.045)},${pct(t+.1)}{opacity:.58}${pct(t+.15)}{opacity:0}`}
 motionRules.push(`@keyframes hit-${id}{${move}100%{transform:translate(0,0)}}@keyframes keyglow-${id}{${glow}100%{opacity:0}}#desk-personal .key-${id}{animation:hit-${id} 8s linear infinite}#desk-personal .key-${id} .key-light{animation:keyglow-${id} 8s linear infinite}`);
 return `<g class="key-press key-${id}" data-typing-key="${name}">${svg}</g>`;
}
function roundedContour(poly,radius=2,steps=4){
 const points=[];for(let i=0;i<poly.length;i++){const prev=poly[(i+poly.length-1)%poly.length],v=poly[i],next=poly[(i+1)%poly.length],a=Math.hypot(prev[0]-v[0],prev[1]-v[1]),b=Math.hypot(next[0]-v[0],next[1]-v[1]),r=Math.min(radius,a/3,b/3),from=v.map((n,j)=>n+(prev[j]-n)*r/a),to=v.map((n,j)=>n+(next[j]-n)*r/b);for(let j=0;j<=steps;j++){const t=j/steps;points.push(from.map((n,k)=>(1-t)**2*n+2*(1-t)*t*v[k]+t*t*to[k]))}}return points;
}
// The affine matrices come from projecting the real backrest plane at hinge poses.
// Each thin pad uses its own mid-depth, preserving the fixed lower hinge and the volume.
function rockWrap(name,svg,F,depth){
 const origin=at(G.add3(F.o,G.mul3(F.a,depth))),u0=at(G.add3(G.add3(F.o,G.mul3(F.a,depth)),F.u)).map((n,i)=>n-origin[i]),v0=at(G.add3(G.add3(F.o,G.mul3(F.a,depth)),F.v)).map((n,i)=>n-origin[i]),det=u0[0]*v0[1]-v0[0]*u0[1];
 const matrix=degrees=>{const t=degrees*Math.PI/180,c=Math.cos(t),s=Math.sin(t),rot=([x,y,z])=>[x,c*y-s*z,s*y+c*z],a=rot(F.a),v=rot(F.v),o=at(G.add3(F.o,G.mul3(a,depth))),u=at(G.add3(G.add3(F.o,G.mul3(a,depth)),F.u)).map((n,i)=>n-o[i]),vv=at(G.add3(G.add3(F.o,G.mul3(a,depth)),v)).map((n,i)=>n-o[i]),m=[(u[0]*v0[1]-vv[0]*u0[1])/det,(u[1]*v0[1]-vv[1]*u0[1])/det,(-u[0]*v0[0]+vv[0]*u0[0])/det,(-u[1]*v0[0]+vv[1]*u0[0])/det];return `matrix(${[...m,o[0]-m[0]*origin[0]-m[2]*origin[1],o[1]-m[1]*origin[0]-m[3]*origin[1]].map(n=>n.toFixed(7)).join(',')})`};
 const id=name.replaceAll('.','-');motionRules.push(`@keyframes rock-${id}{0%,100%{transform:${matrix(0)}}28%{transform:${matrix(2.6)}}72%{transform:${matrix(-1.2)}}}#desk-personal .rock-${id}{animation:rock-${id} 6.4s cubic-bezier(.77,0,.175,1) infinite}`);
 return `<g class="chair-rock rock-${id}" data-hinge="backrest">${svg}</g>`;
}
function put(name,paths,shape,centre,{color='',tone='mid',inner='',owner,ground=false,press=false,effect,part=name.split('.')[0]}={}){
 count++;let svg=material(k.solidSvg(paths,{tone,inner}),color);if(press)svg=a.amPress(svg,[0,0,-.35],P,{period:6400,delay:300});
 if(effect)svg=effect(svg);
 R.put({name,piece:part,at:centre,svg,shapes:[R.solid({...shape,name,...(owner?{owner}:{}),ground})]});
}
function slab(name,p,z,h,opts={}){put(name,k.slabOf(p,z,h,P,5,opts.bevel??.65),A.slab(p,z,h,{},5),[p.x+p.w/2,p.y+p.d/2,z+h/2],opts)}
function cylinder(name,x,y,r,z,h,opts={}){put(name,k.cylinder(x,y,r,z,h,P,40,opts.bevel??.35),A.cylinder(x,y,r,z,h),[x,y,z+h/2],opts)}
function prism(name,F,polygon,s0,s1,opts={}){const points=polygon.map(([u,v])=>G.add3(F.o,G.add3(G.mul3(F.u,u),G.mul3(F.v,v)))),centre=points.reduce((sum,p)=>G.add3(sum,p),[0,0,0]).map(v=>v/points.length),shape=A.prism(F,polygon,s0,s1);if(opts.rock){shape.rocking=true;opts={...opts,effect:svg=>rockWrap(name,svg,F,(s0+s1)/2)}}put(name,G.prismOf(F,polygon,s0,s1,P),shape,G.add3(centre,G.mul3(F.a,(s0+s1)/2)),opts)}
function rod(name,start,end,r,opts={}){const F=G.frameAlong(start,G.sub3(end,start)),length=G.len3(G.sub3(end,start));const paths=G.disc(0,length,r,F,P,{steps:32,bevel:.25});if(name.startsWith('coffee.handle')){paths.outline='';paths.crease='';paths.bevel=''}put(name,paths,A.disc(F,0,length,r),G.lerp3(start,end,.5),opts)}
function frontFace(y,x,z,w,h,r=2,project=at){return k.pathOf(k.roundedPlan({x,y:z,w,d:h,r},5).map(([u,v])=>project([u,y,v])),true)}
function display(name,p,z,h,mode,pointTransform=(p)=>p,vectorTransform=(v)=>v){
 const face=(...args)=>frontFace(...args,(p)=>at(pointTransform(p)));
 const y=p.y+p.d+.08,x=p.x+4,z0=z+6,sw=p.w-8,sh=h-12,id='clip-'+name.replaceAll('.','-');
 const rect=(rx,rz,rw,rh,fill,rr=1.5)=>`<path d="${face(y,rx,rz,rw,rh,rr)}" fill="var(--${fill})"/>`;
 const glass=face(y,x,z0,sw,sh,3),out=[`<defs><clipPath id="${id}"><path d="${glass}"/></clipPath></defs><g clip-path="url(#${id})"><path d="${glass}" fill="var(--screen)"/>`,rect(x,z0+sh-8,sw,8,'screen-bar',0)];
 for(let i=0;i<3;i++)out.push(rect(x+4+i*4,z0+sh-5,1.8,1.8,i===0?'coral':'dim',.5));
 if(mode==='code'){
  const code=['const desk = {','  coffee: true,','  focus: "on",','};','build(desk);','// listo para crear'];
  const plane=a.planeMatrix(pointTransform([x+7,y,z0+sh-16]),vectorTransform([1,0,0]),vectorTransform([0,0,-1]),P);
  const esc=t=>t.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  const typed=[];
  for(const [row,text]of code.entries()){
   const start=.45+row*.93,end=start+.83,width=text.length*3.3,clip=`type-mask-${row}`;
   motionRules.push(`@keyframes type-${row}{0%,${pct(start)}{transform:scaleX(0)}${pct(end)},100%{transform:scaleX(1)}}@keyframes cursor-${row}{0%,${pct(start-.01)}{opacity:0;transform:translateX(0)}${pct(start)}{opacity:1;transform:translateX(0)}${pct(end)}{opacity:1;transform:translateX(${width}px)}${pct(end+.05)},100%{opacity:0;transform:translateX(${width}px)}}#desk-personal .type-mask-${row}{animation:type-${row} 8s steps(${text.length},end) infinite}#desk-personal .type-cursor-${row}{animation:cursor-${row} 8s steps(${text.length},end) infinite}`);
   typed.push(`<defs><clipPath id="${clip}"><rect class="code-mask type-mask-${row}" x="0" y="${row*7-6}" width="${width+.5}" height="8"/></clipPath></defs><g clip-path="url(#${clip})"><text class="demo-code" x="0" y="${row*7}" font-family="ui-monospace,Consolas,monospace" font-size="5.5" textLength="${width}" lengthAdjust="spacingAndGlyphs" fill="var(--${row===5?'teal':'code'})" xml:space="preserve">${esc(text)}</text></g><rect class="type-cursor type-cursor-${row}" x="0" y="${row*7-5}" width="1" height="6" fill="var(--teal)"/>`);
  }
  out.push(`<g transform="${plane}"><g class="typing-cycle" aria-hidden="true">${typed.join('')}</g></g>`);
 }else if(mode==='app'){
  // Calendar: a real product from the portfolio, shown as a weekly meal planner.
  const plane=a.planeMatrix(pointTransform([x,y,z0+sh-8]),vectorTransform([1,0,0]),vectorTransform([0,0,-1]),P);
  const ui=[];
  const box=(x,y,w,h,fill,r=1,stroke='none')=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+r+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width=".35"/>';
  const text=(x,y,value,size=3,fill='#3c4d50',weight=500)=>'<text x="'+x+'" y="'+y+'" fill="'+fill+'" font-family="Arial,sans-serif" font-size="'+size+'" font-weight="'+weight+'">'+value+'</text>';
  ui.push(box(0,0,sw,sh-8,'#f3f7f5',0),text(5,8,'Calendar',5,'#254e49',700));
  ui.push(box(sw-29,3,23,7,'#e0eeea',3),text(sw-25,7.7,'Semana',3,'#345f58',600));
  const cw=(sw-14)/5,days=['LUN','MAR','MIÉ','JUE','VIE'];
  for(let i=0;i<5;i++){
   const dx=4+i*(cw+1.5);
   ui.push(box(dx,13,cw,36,'#ffffff',2,'#d6e2dd'));
   if(i===3)ui.push(box(dx+cw/2-3.4,15,6.8,6.8,'#61b96a',3.4));
   ui.push(text(dx+2.1,19.6,days[i],2.55,i===3?'#ffffff':'#536c66',600));
   ui.push(box(dx+1.5,24,cw-3,9,'#fff0c9',1.2),text(dx+2.8,27.5,'08:00',2.15,'#9e792a'),text(dx+2.8,30.8,i%2?'Yogur':'Tostadas',2.3,'#8a6821'));
   ui.push(box(dx+1.5,35,cw-3,10,'#e1efff',1.2),text(dx+2.8,38.8,'14:00',2.15,'#497aa7'),text(dx+2.8,42.3,i%2?'Arroz':'Pasta',2.3,'#39658c'));
  }
  ui.push(text(10,55,'Plan',2.6,'#327469',600),text(42,55,'Compra',2.6,'#667b74'),text(78,55,'Nevera',2.6,'#667b74'));
  out.push('<g class="calendar-preview" aria-label="Vista semanal de Calendar" transform="'+plane+'">'+ui.join('')+'</g>');
 }else{for(let i=0;i<5;i++){out.push(rect(x+5,z0+sh-20-i*14,sw-10,10,'panel',2));out.push(rect(x+8,z0+sh-16-i*14,4,3,i===0?'coral':'teal',1))}}
 out.push(`</g><path d="${glass}" fill="none" stroke="var(--screen-edge)" stroke-width=".55" vector-effect="non-scaling-stroke"/>`);
 return out.join('');
}
// Desk: rectangular wooden legs and rails match the desktop material.
for(const [i,[x,y]]of [[-164,-65],[152,-65],[-164,78],[152,78]].entries()){
 slab(`desk.pad${i}`,{x:x-1,y:y-1,w:18,d:12,r:.5},0,2,{color:'rubber',ground:true});
 slab(`desk.leg${i}`,{x,y,w:16,d:10,r:0},2,112,{color:'wood',bevel:.25,inner:line(k.sideSeam({x,y,w:16,d:10,r:0},108,P,5))});
}
for(const [i,x]of [-164,152].entries())slab(`desk.rail${i}`,{x,y:-55,w:16,d:133,r:0},32,7,{color:'wood',owner:`desk.leg${i}`});
const TOP={x:-180,y:-80,w:360,d:180,r:8};
slab('desk.top',TOP,114,8,{color:'wood',bevel:1.3,inner:line(k.sideSeam(TOP,117,P,5))});
// The two screens form a shallow V around the viewing position at the keyboard.
const monitorPoses=[],monitorMounts={};
for(const m of [{id:'left',x:-112,w:110,y:-56,z:150,h:78,mode:'code',bx:-81,by:-57,bw:48,bd:38,px:-64,py:-52,pw:14,pd:11},{id:'main',x:6,w:110,y:-56,z:150,h:78,mode:'app',bx:37,by:-57,bw:48,bd:38,px:54,py:-52,pw:14,pd:11}]){
 slab('monitor.'+m.id+'.base',{x:m.bx,y:m.by,w:m.bw,d:m.bd,r:4},122,3,{color:'hardware'});
 slab('monitor.'+m.id+'.post',{x:m.px,y:m.py,w:m.pw,d:m.pd,r:2},125,m.z-125,{color:'hardware'});
 const cx=m.x+m.w/2,cy=m.y+4;
 const yaw=Math.atan2(cx,166-cy),c=Math.cos(yaw),s=Math.sin(yaw);
 const rotate=([x,y,z])=>[c*x-s*y,s*x+c*y,z];
 const transform=([x,y,z])=>[cx+c*(x-cx)-s*(y-cy),cy+s*(x-cx)+c*(y-cy),z];
 const frame=G.frameOf([cx,cy,m.z],[0,0,1],[c,s,0],[-s,c,0]);
 const p={x:m.x,y:m.y,w:m.w,d:8,r:4};
 prism('monitor.'+m.id+'.case',frame,k.roundedPlan({x:-m.w/2,y:-4,w:m.w,d:8,r:4},5),0,m.h,{color:'hardware',inner:display('display.'+m.id,p,m.z,m.h,m.mode,transform,rotate)});
 // Connector shells sit on the physical rear face of each rotated monitor.
 const outward=[s,-c,0];
 const mounts=[];
 for(const [port,offset]of [['video',0],['power',9]]){
  const origin=transform([cx+offset,m.y,158]);
  const F=G.frameOf(origin,outward,[c,s,0],[0,0,1]);
  prism('monitor.'+m.id+'.'+port+'-plug',F,k.roundedPlan({x:-2,y:-1.3,w:4,d:2.6,r:.3},3),0,4.2,{color:'rubber',owner:'monitor.'+m.id+'.case'});
  mounts.push({port,tip:G.add3(origin,G.mul3(outward,4.2)),outward});
 }
 monitorMounts[m.id]=Object.fromEntries(mounts.map((mount)=>[mount.port,mount]));
 monitorPoses.push({id:m.id,yawDegrees:yaw*180/Math.PI,centre:[cx,cy],viewingPosition:[0,166]});
}
fs.writeFileSync(path.join(HERE,'monitor-poses.json'),JSON.stringify(monitorPoses,null,2));
// PC tower: chassis and actual cooling assemblies, with restrained ambient movement.
for(const [i,[x,y]]of [[130,-59],[162,-59],[130,-11],[162,-11]].entries())slab(`tower.foot${i}`,{x,y,w:8,d:8,r:1},122,3,{color:'rubber'});
const TOWER={x:126,y:-64,w:48,d:68,r:3};
let towerDetails='';
for(let i=0;i<6;i++)towerDetails+=line(k.planOutline({x:134+i*5,y:-52,w:2,d:23,r:.7},225,P,4),'lo');
// Side panel seams are closed outlines on the actual x-side face.
const sideOutline=k.pathOf(k.roundedPlan({x:-57,y:134,w:54,d:80,r:2},5).map(([yy,zz])=>at([174.03,yy,zz])),true);
towerDetails+=line(sideOutline,'faint');
const lightRoute=frontFace(4.07,130,133,40,84,3);
towerDetails+=`<path class="tower-light-track" d="${lightRoute}" fill="none" stroke="#3b7478" stroke-width=".6"/><path class="tower-light-trail" d="${lightRoute}" pathLength="1" fill="none" stroke="#8ce7dd" stroke-width="1.5" stroke-linecap="round" stroke-dasharray=".18 .82"/>`;
slab('tower.chassis',TOWER,125,100,{color:'hardware',bevel:.75,inner:towerDetails});
for(const [i,z]of [151,187].entries()){
 const F=G.frameOf([150,4,z],[0,1,0],[1,0,0],[0,0,1]);
 const rotor=a.amRotor([150,4.82,z],[1,0,0],[0,0,1],P,{count:5,r0:3,r1:10,chord:2.6,tip:1,sweep:.18,period:1800+i*240,delay:i*350,blur:false,disc:false,thickness:.18,clip:11});
 put(`tower.fan${i}.back`,G.disc(0,.8,13.2,F,P,{steps:48,bevel:.1}),A.disc(F,0,.8,13.2),[150,4.4,z],{color:'rubber',inner:rotor});
 const ring=[[.8,11.8],[.8,13.2],[1.25,13.2],[1.25,11.8]];
 put(`tower.fan${i}.rim`,G.lathe(ring,F,P,{steps:48,hole:[1.25,11.8]}),A.lathe(F,ring),[150,5.025,z],{color:'teal',effect:hollow});
 put(`tower.fan${i}.hub`,G.disc(.8,1.5,3,F,P,{steps:28,bevel:.12}),A.disc(F,.8,1.5,3),[150,5.15,z],{color:'metal'});
}
slab('tower.power',{x:165,y:4,w:3,d:1,r:.8},211,3,{color:'teal',bevel:.1,effect:svg=>a.amPulse(svg,{period:6200,min:.72,delay:1400})});
for(const [i,x]of [134,141].entries())slab(`tower.port${i}`,{x,y:4,w:4,d:.5,r:.3},214,1.7,{color:'rubber',bevel:0});

// Compact keyboard: each cap is a distinct solid with a real inset dish.
const KB={x:-78,y:8,w:156,d:50,r:4};slab('keyboard.frame',KB,122,4,{color:'hardware',bevel:.7});slab('keyboard.bed',k.insetPlan(KB,2),126,.5,{color:'rubber',bevel:0});
const keyW=12.3,keyD=8.2;
for(let row=0;row<4;row++)for(let col=0;col<12;col++){
 const p={x:-75+col*keyW,y:11+row*keyD,w:keyW-1,d:keyD-1,r:1.3},height=2.3+(3-row)*.18,accent=row===2&&col===11||row===0&&col===0;
 const name=`keyboard.key-${row}-${col}`;
 cylinder(`keyboard.stem-${row}-${col}`,p.x+p.w/2,p.y+p.d/2,1.4,126.5,1.2,{color:'hardware',owner:name});
 slab(name,p,127.7,height,{tone:'hi',color:accent?'mustard':'paper',bevel:.35,inner:groove(k.insetPlan(p,.9),127.7+height)+`<path class="key-light" d="${k.planOutline(k.insetPlan(p,.4),127.7+height+.02,P,4)}" fill="#5ac5bb" opacity="0"/>`,effect:svg=>keyWrap(name,svg)});
}
for(const [i,[col,span]]of [[0,1.5],[1.5,1.5],[3,6],[9,1.5],[10.5,1.5]].entries()){const p={x:-75+col*keyW,y:43.8,w:span*keyW-1,d:8.2,r:1.2},name=`keyboard.bottom-${i}`;cylinder(`keyboard.bottom-stem${i}`,p.x+p.w/2,p.y+p.d/2,1.6,126.5,1.2,{color:'hardware',owner:name});slab(name,p,127.7,2.3,{color:'paper',tone:'hi',bevel:.35,inner:groove(k.insetPlan(p,.9),130)+`<path class="key-light" d="${k.planOutline(k.insetPlan(p,.4),130.02,P,4)}" fill="#5ac5bb" opacity="0"/>`,effect:svg=>keyWrap(name,svg)})}
// Mouse and notebook.
slab('mouse.mat',{x:89,y:13,w:47,d:36,r:4},122,.8,{color:'hardware',bevel:0});const MOUSE={x:103,y:19,w:19,d:25,r:8};slab('mouse.body',MOUSE,122.8,6,{color:'paper',tone:'hi',bevel:.5,inner:groove({x:111,y:22,w:2.2,d:5,r:1},128.8,'lo')});
slab('notebook.cover',{x:89,y:61,w:72,d:38,r:2},122,1.2,{color:'teal',bevel:.2});
const paper={x:92,y:63,w:66,d:34,r:1};let rules='';for(let i=0;i<4;i++)rules+=k.lineOnTop([96,68+i*6],[119,68+i*6],124.2,P)+k.lineOnTop([130,68+i*6],[153,68+i*6],124.2,P);
slab('notebook.paper',paper,123.2,1,{color:'paper',tone:'hi',bevel:.1,inner:line(rules,'lo',true)});slab('notebook.spine',{x:124,y:63,w:1,d:34,r:.3},124.2,.2,{color:'metal',bevel:0});
slab('pencil.body',{x:130,y:70,w:24,d:2,r:.2},124.3,1.8,{color:'mustard',bevel:.1});put('pencil.tip',k.extrude([[154,70],[158,71],[154,72]],124.3,1.8,P),A.extruded([[154,70],[158,71],[154,72]],124.3,1.8),[155.33,71,125.2],{color:'hardware'});
// Office chair: five spokes with casters, gas lift, arms and inclined upholstered back.
const CX=0,CY=152;
for(let i=0;i<5;i++){
 const t=i*Math.PI*2/5,rad=[Math.cos(t),Math.sin(t),0],perp=[-Math.sin(t),Math.cos(t),0],origin=[CX,CY,12.5],F=G.frameOf(origin,rad,perp,[0,0,1]);
 prism(`chair.spoke${i}`,F,k.roundedPlan({x:-3,y:-2.5,w:6,d:5,r:.8},3),10,35,{color:'hardware'});
 const hub=G.add3([CX,CY,0],G.mul3(rad,37)),fork=G.frameOf([hub[0],hub[1],0],[0,0,1],rad,perp);
 for(const side of [-1,1])prism(`chair.fork${i}.${side}`,fork,k.roundedPlan({x:-2,y:side===-1?-5:3,w:4,d:2,r:.4},3),5,10,{color:'hardware'});
 prism(`chair.casterbridge${i}`,fork,k.roundedPlan({x:-2,y:-5,w:4,d:10,r:.6},3),10,13,{color:'hardware'});
 const WF=G.frameOf([hub[0],hub[1],5],perp,rad,[0,0,1]);put(`chair.wheel${i}`,G.disc(-3,3,5,WF,P,{steps:36,bevel:.3}),A.disc(WF,-3,3,5),[hub[0],hub[1],5],{color:'rubber',ground:true});
}
cylinder('chair.hub',CX,CY,10,9,5,{color:'hardware'});cylinder('chair.lift-base',CX,CY,5.5,14,19,{color:'hardware'});cylinder('chair.lift-inner',CX,CY,3.7,33,12,{color:'metal'});
slab('chair.crossrail',{x:CX-47,y:CY-3,w:94,d:6,r:2},45,4,{color:'hardware'});slab('chair.seatplate',{x:CX-38,y:CY-25,w:76,d:50,r:6},49,6,{color:'hardware'});slab('chair.cushion',{x:CX-40,y:CY-33,w:80,d:66,r:10},55,8,{color:'hardware',bevel:1.1});
for(const [i,x]of [CX-39,CX+31].entries())slab(`chair.seat-bolster${i}`,{x,y:CY-23,w:8,d:42,r:3},63,3,{color:'blue',bevel:.4});
slab('chair.backbrace',{x:CX-7,y:CY+20,w:14,d:20,r:1.5},46,3,{color:'hardware'});slab('chair.backpost',{x:CX-6,y:CY+34,w:12,d:6,r:1.5},49,22,{color:'hardware'});
const angle=.18,cs=Math.sqrt(1-angle*angle),BF=G.frameOf([CX,CY+34,71],[0,-cs,angle],[1,0,0],[0,angle,cs]);
const back=roundedContour([[-29,0],[29,0],[35,31],[43,61],[38,78],[33,83],[-33,83],[-38,78],[-43,61],[-35,31]],2.5);
prism('chair.back',BF,back,0,8,{color:'hardware',rock:true});
// Three physical pillars leave two real openings under the crown.
for(const [id,x,w]of [['left',-32,8],['middle',-4,8],['right',24,8]])prism(`chair.shoulder-${id}`,BF,k.roundedPlan({x,y:83,w,d:12,r:.35},4),0,8,{color:'hardware',rock:true});
prism('chair.crown',BF,roundedContour([[-31,95],[31,95],[24,111],[-24,111]],2),0,8,{color:'hardware',rock:true});
const edge=roundedContour([[-29,5],[-24,5],[-28,32],[-36,61],[-31,76],[-35,79],[-40,62],[-33,31]],1.3);
prism('chair.bolster-left',BF,edge,-1.8,0,{color:'blue',rock:true});
prism('chair.bolster-right',BF,edge.map(([x,y])=>[-x,y]).reverse(),-1.8,0,{color:'blue',rock:true});
prism('chair.back-padding',BF,roundedContour([[-22,10],[22,10],[26,39],[29,60],[23,77],[-23,77],[-29,60],[-26,39]],3),-2.5,0,{color:'rubber',tone:'hi',rock:true});
prism('chair.headrest',BF,k.roundedPlan({x:-18,y:97,w:36,d:11,r:3},5),-3,0,{color:'rubber',tone:'hi',rock:true});
prism('chair.headrest-seam',BF,k.roundedPlan({x:-10,y:101,w:20,d:1,r:.4},4),-3.25,-3,{color:'blue',rock:true});
prism('chair.lumbar',BF,k.roundedPlan({x:-21,y:16,w:42,d:15,r:4},5),-4.2,-2.5,{color:'hardware',tone:'hi',rock:true});

for(const [i,x]of [CX-47,CX+43].entries()){slab(`chair.armpost${i}`,{x,y:CY-3,w:4,d:6,r:1},49,30,{color:'hardware'});slab(`chair.armrest${i}`,{x:x-3,y:CY-23,w:10,d:45,r:4},79,5,{color:'hardware',bevel:.5})}
// Desk lamp, built from real round shafts and a conical shade with diffuser.
cylinder('lamp.base',-157,-40,13,122,3,{color:'teal'});rod('lamp.upright',[-157,-40,125],[-157,-40,181],2.2,{color:'teal'});rod('lamp.arm',[-157,-40,181],[-146,-42,203],2,{color:'teal',owner:'lamp.upright'});
const LF=G.frameAlong([-146,-42,203],[0,.85,-Math.sqrt(1-.85**2)]),profile=[[0,0],[0,5],[14,17],[16,17],[16,0]];
put('lamp.shade',G.lathe(profile,LF,P,{steps:48,bevel:.3}),A.lathe(LF,profile),G.add3(LF.o,G.mul3(LF.a,8)),{color:'teal',owner:'lamp.arm'});put('lamp.diffuser',G.disc(16,16.3,15.5,LF,P,{steps:48}),A.disc(LF,16,16.3,15.5),G.add3(LF.o,G.mul3(LF.a,16.15)),{color:'ivory'});
// Coffee in place of the plant: coaster, hollow ceramic cup, coffee and a fitted handle.
cylinder('coffee.coaster',-153,15,13,122,.9,{color:'teal',bevel:.15});
cylinder('coffee.cup-base',-153,15,11,122.9,2,{color:'paper',tone:'hi',owner:'coffee.mug'});
// Split the hollow wall into radial solids so the liquid and handle have true painter order.
const wallSteps=32;
for(let i=0;i<wallSteps;i++){
 const a0=i*2*Math.PI/wallSteps,a1=(i+1)*2*Math.PI/wallSteps;
 const point=(r,t)=>[-153+r*Math.cos(t),15+r*Math.sin(t)];
 const poly=[point(9.5,a0),point(11,a0),point(11,a1),point(9.5,a1)];
 const paths=k.extrude(poly,124.9,15,P);paths.outline='';paths.crease='';
 put(`coffee.wall${i}`,paths,A.extruded(poly,124.9,15),[-153+10.25*Math.cos((a0+a1)/2),15+10.25*Math.sin((a0+a1)/2),132.4],{color:'paper',tone:'hi',owner:'coffee.mug'});
}
const RF=G.frameOf([-153,15,139.9],[0,0,1],[1,0,0],[0,1,0]),rimProfile=[[0,9.5],[0,11],[.15,11],[.15,9.5]];
put('coffee.rim',G.lathe(rimProfile,RF,P,{steps:64,hole:[.15,9.5]}),A.lathe(RF,rimProfile),[-153,15,139.975],{color:'paper',tone:'hi',effect:hollow});
cylinder('coffee.liquid',-153,15,9.45,124.9,14.9,{color:'coffee',bevel:0});
const handle=[];for(let i=0;i<=40;i++){const t=(-110+i*(213/40))*Math.PI/180;handle.push([-140.45+6*Math.cos(t),15,131.5+6*Math.sin(t)])}
for(let i=1;i<handle.length;i++)rod(`coffee.handle${i}`,handle[i-1],handle[i],1.25,{color:'paper',owner:'coffee.mug'});


// Real cable jackets are drawn in short depth-sorted 3D tube segments.
const cableRoutes=[];
function cable(name,controls,r=.55,bend=3.2){
 const route=G.fillet(controls,bend,8,{P,tube:r});
 R.route(name,route,r,{limp:true,piece:'cable'});
 T.tubePieces(route,r,P,{maxLength:12,spacing:1.2,stripes:true}).forEach((part,index)=>{
  R.put({name:name+':'+index,piece:'cable',at:part.mid,svg:material(T.tubeSvg(part,{tone:'lo'}),'cable'),route:name,chunk:index,shapes:[A.tube(part.points,part.radii)]});
 });
 cableRoutes.push({name,radius:r,points:route,from:controls[0],to:controls.at(-1)});
}
function rearPlug(name,x,z,w=4,h=2.6){
 slab(name,{x:x-w/2,y:-68,w,d:4,r:.3},z-h/2,h,{color:'rubber',owner:'tower.chassis',bevel:.15});
 return [x,-68,z];
}
slab('keyboard.usb-plug',{x:-2,y:3,w:4,d:5,r:.3},123.5,2.6,{color:'rubber',owner:'keyboard.frame',bevel:.15});
slab('mouse.usb-plug',{x:111,y:15,w:3,d:4,r:.35},124.7,2.6,{color:'rubber',owner:'mouse.body',bevel:.15});
const usbKeyboard=rearPlug('tower.usb-keyboard',140,140);
const usbMouse=rearPlug('tower.usb-mouse',147,146);
const videoLeft=rearPlug('tower.video-left',133,155);
const videoRight=rearPlug('tower.video-right',155,163);
const towerPower=rearPlug('tower.power-plug',165,181,5,4);
// Power strip fastened to the underside; its top touches the desk at z=114.
slab('powerstrip.body',{x:70,y:-75,w:60,d:14,r:2},106,8,{color:'hardware',owner:'desk.top',bevel:.5});
const stripPorts=[];
for(const [i,x]of [78,93,120].entries()){
 slab('powerstrip.plug'+i,{x:x-2,y:-78,w:4,d:3,r:.3},108.7,2.6,{color:'rubber',owner:'powerstrip.body',bevel:.15});
 stripPorts.push([x,-78,110]);
}
const lead=(mount,n)=>G.add3(mount.tip,G.mul3(mount.outward,n));
const L=monitorMounts.left,Rm=monitorMounts.main;
cable('cable.keyboard',[[0,3,124.8],[0,-5,124.8],[8,-12,123.1],[25,-12,123.1],[25,-70,123.1],[105,-70,125.9],[125,-73,125.9],[140,-73,131],[140,-73,140],usbKeyboard]);
cable('cable.mouse',[[112.5,15,126],[112.5,6,126],[105,-8,123.1],[105,-30,123.1],[112,-55,123.1],[112,-76,123.1],[147,-76,123.1],[147,-72,146],usbMouse]);
cable('cable.video-left',[L.video.tip,lead(L.video,10),[-62,-75,141],[-72,-75,123.1],[-72,-78,123.1],[106,-78,123.1],[133,-78,155],[133,-72,155],videoLeft]);
cable('cable.video-right',[Rm.video.tip,lead(Rm.video,9),[74,-73,145],[91,-73,130],[105,-73,129],[120,-73,129],[155,-78,150],[155,-72,163],videoRight]);
cable('cable.monitor-power-left',[L.power.tip,lead(L.power,10),[-45,-88,151],[-30,-89,132],[-10,-91,116],[22,-91,110],[78,-88,110],[78,-83,110],stripPorts[0]],.65);
cable('cable.monitor-power-right',[Rm.power.tip,lead(Rm.power,10),[88,-87,150],[105,-88,132],[112,-91,115],[93,-91,110],[93,-83,110],stripPorts[1]],.65);
cable('cable.tower-power',[towerPower,[165,-78,181],[171,-91,174],[172,-99,153],[165,-101,130],[149,-99,114],[132,-94,110],[120,-88,110],[120,-83,110],stripPorts[2]],.85,9);
fs.writeFileSync(path.join(HERE,'cable-routes.json'),JSON.stringify(cableRoutes,null,2));

console.log(`Geometry recorded: ${count} solids; resolving painter order…`);
const settled=A.settle(R,P);
const shadow=`<path class="iso-halo" d="${k.haloOf({x:-184,y:-82,w:368,d:184,r:8},0,5,P)}"/><path class="iso-halo" d="${k.haloOf({x:CX-48,y:CY-45,w:96,d:91,r:26},0,3,P)}"/>`;
// Two soft, staggered wisps rise along fixed paths; the bases do not slide off the cup.
const steamPath=(dx)=>{
 const p=[[-153+dx,15,141],[-157+dx,15,148],[-148+dx,15,155],[-152+dx,15,162],[-156+dx,15,169],[-150+dx,15,174],[-152+dx,15,180]].map(at);
 return 'M'+p[0].join(',')+'C'+p.slice(1,4).map(q=>q.join(',')).join(' ')+'C'+p.slice(4).map(q=>q.join(',')).join(' ');
};
const steamBottom=at([-153,15,141]),steamTop=at([-153,15,180]);
const steam='<g class="coffee-steam" aria-hidden="true"><defs><linearGradient id="steam-fade" gradientUnits="userSpaceOnUse" x1="'+steamBottom[0]+'" y1="'+steamBottom[1]+'" x2="'+steamTop[0]+'" y2="'+steamTop[1]+'"><stop offset="0" stop-color="var(--steam-color)" stop-opacity=".08"/><stop offset=".25" stop-color="var(--steam-color)" stop-opacity=".7"/><stop offset=".7" stop-color="var(--steam-color)" stop-opacity=".35"/><stop offset="1" stop-color="var(--steam-color)" stop-opacity="0"/></linearGradient></defs><path pathLength="1" d="'+steamPath(-2)+'"/><path pathLength="1" d="'+steamPath(3)+'" style="animation-duration:5.2s;animation-delay:-2.3s"/></g>';
const body=shadow+settled.items.slice().sort((p,q)=>p.key-q.key).map(item=>`<g data-piece="${item.name}">${item.svg}</g>`).join('')+steam;
const id='desk-personal',css=`#${id}{--screen:#202936;--screen-bar:#2c3848;--screen-edge:#435167;--code:#d5e4ed;--dim:#7e94a9;--teal:#80cec7;--coral:#e7a66b;--mustard:#e9bc55;--panel:#37465b;--steam-color:#748084}#${id} .preview-build{animation:none}#${id} .key-light{opacity:0;stroke:none}#${id} .code-mask{transform-origin:0 0}#${id} .tower-light-trail{animation:light-travel 3.8s linear infinite}#${id} .typing-cycle{animation:typing-reset 8s linear infinite}#${id} .coffee-steam path{fill:none;stroke:url(#steam-fade);stroke-width:1.4;stroke-linecap:round;filter:blur(.55px);stroke-dasharray:.48 .65;stroke-dashoffset:.48;opacity:0;animation:steam-drift 4.4s linear infinite}@keyframes light-travel{to{stroke-dashoffset:-1}}@keyframes typing-reset{0%,94%{opacity:1}98%,100%{opacity:0}}@keyframes steam-drift{0%{stroke-dashoffset:.48;opacity:0}18%,62%{opacity:.85}92%,100%{stroke-dashoffset:-1;opacity:0}}${motionRules.join('')}@media(prefers-reduced-motion:reduce){#${id} .chair-rock,#${id} .key-press{animation:none;transform:none}#${id} .key-press .key-light{animation:none;opacity:0}#${id} .code-mask{animation:none;transform:none}#${id} .type-cursor{animation:none;opacity:0}#${id} .tower-light-trail{animation:none;stroke-dashoffset:-.2}#${id} .typing-cycle{animation:none;opacity:1}#${id} .coffee-steam path{animation:none;opacity:.3;stroke-dasharray:none}}`;
const rawSvg=a.assetSvg({width:W,height:H,label:'Escritorio isométrico vectorial de Martín Fierro: dos monitores orientados en cuña con código y Calendar, patas rectangulares de madera, torre de ordenador, silla gamer azul centrada, café con vapor suave, libreta y cableado conectado',body,paper:'#ffffff',background:false,accents:{wood:'#ecd5b3',violet:'#77729e',cable:'#343b45',orange:'#db925e',blue:'#4e83c4',teal:'#458b87',mustard:'#e5b343',hardware:'#283240',rubber:'#222832',metal:'#a5afb9',paper:'#f4f1e9',ivory:'#e2d7b4',coffee:'#604537',green:'#769551'},weight:.65,css,id});
const projectedBounds=R.solids.flatMap(shape=>{const b=A.boundsOf(shape);return [b.min[0],b.max[0]].flatMap(x=>[b.min[1],b.max[1]].flatMap(y=>[b.min[2],b.max[2]].map(z=>at([x,y,z]))));});
const frameHeight=Math.max(775,Math.ceil(Math.max(...projectedBounds.map(p=>p[1]))+26-123));
const svg=rawSvg.replace('viewBox="0 0 1536 1024" width="1536" height="1024"', 'viewBox="284 123 995 '+frameHeight+'" width="995" height="'+frameHeight+'"');
fs.writeFileSync(path.join(HERE,'personal-desk.svg'),svg);fs.writeFileSync(path.join(HERE,'personal-desk-dark.svg'),svg.replace('</svg>','<style>#desk-personal{--steam-color:#c5cbcf}#desk-personal .iso-halo{fill:#000;opacity:.65}</style></svg>'));fs.writeFileSync(path.join(HERE,'escena.html'),a.previewHtml({title:'Escritorio personal · anatomy-asset',svg,paper:'#fff',width:1536}).replace('</head>','<link rel="icon" href="data:,"></head>'));
fs.writeFileSync(path.join(HERE,'personal-desk.svg.json'),JSON.stringify({source:'anatomy-asset kit geometry',width:995,height:775,viewBox:[284,123,995,775],solids:count,rasterImages:0,approved:false,projection:P,parts:R.solids.map(({name,kind,owner,ground})=>({name,kind,owner,ground}))},null,2)+'\n');
fs.copyFileSync(path.join(KIT,'LICENSE'),path.join(HERE,'LICENSE-anatomy-asset.txt'));console.log(`Scene canvas: 995 × ${frameHeight}; chair centre: ${CX}, ${CY}`);
console.log(`Wrote escritorio.svg (${Math.round(svg.length/1024)} KB).`);
A.auditOrExit(R,P);
const poseChecks=[];
for(const degrees of [-1.2,0,2.6]){
 const t=degrees*Math.PI/180,c=Math.cos(t),s=Math.sin(t),rot=([x,y,z])=>[x,c*y-s*z,s*y+c*z];
 const solids=R.solids.map(shape=>shape.rocking?{...shape,F:{...shape.F,a:rot(shape.F.a),u:rot(shape.F.u),v:rot(shape.F.v)},_b:undefined,_f:undefined}:shape);
 const held=A.supports(solids,[]);poseChecks.push({degrees,loose:held.loose.length,sunk:held.sunk.length});
 if(held.loose.length||held.sunk.length){console.error(JSON.stringify({degrees,held}));process.exitCode=1;throw Error('Chair pose failed support/clearance')}
}
fs.writeFileSync(path.join(HERE,'motion-geometry.json'),JSON.stringify({chair:poseChecks,typingPeriod:KEY_PERIOD,keyCount:Object.keys(keyHits).length,fanPeriods:[1.8,2.04],lightPeriod:3.8,steamPeriods:[4.4,5.2],chairPosition:[CX,CY],cableCount:cableRoutes.length},null,2));
console.log('Motion hinge poses passed.');
