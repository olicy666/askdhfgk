'use strict';
const categories = [
 {key:'joint',name:'Joint motion',id:13,title:'A local edit changes the spatial context.',description:'Articulated motion changes opening and part geometry. Joint attachment and relations involving fixed objects can remain valid.'},
 {key:'surface',name:'Surface motion',id:23,title:'A new position. A different set of relations.',description:'Prescribed motion changes direction and proximity. Each support or contact relation still needs its own evidence.'},
 {key:'gravity',name:'Gravity / support',id:13,title:'An action can have consequences beyond its target.',description:'Gravity-driven motion changes object locations and surface relations. Once free motion begins, initial centers cannot establish the final pose.'},
 {key:'collision',name:'Collision',id:23,title:'Follow the secondary participants.',description:'A moving object can collide with another and set it in motion. Joint reasoning must account for changed relations and preserved ones involving these participants.'},
 {key:'carry',name:'Carrying',id:23,title:'Moving together does not imply staying supported.',description:'A carrier moves or rotates while another object may move with it, slip, or fall. The relation outcome must be established from the permitted evidence.'}
];
const wall=document.querySelector('#image-wall');
const sequence=[['surface',23],['carry',83],['collision',13],['joint',43],['gravity',13],['surface',83],['carry',23],['collision',83],['joint',23],['gravity',43],['surface',13],['carry',43],['collision',23],['joint',83],['gravity',83],['surface',43],['carry',13],['collision',43]];
for(let row=0;row<3;row++){
 const track=document.createElement('div');track.className='film-row';
 const group=document.createElement('div');group.className='film-group';
 sequence.slice(row*6,row*6+6).forEach(([cat,id],i)=>{
  const frame=document.createElement('div');frame.className='film-frame';
  const img=document.createElement('img');img.src=`assets/images/${cat}-${id}-${i%2}.webp`;img.alt='';img.width=330;img.height=220;img.decoding='async';frame.append(img);group.append(frame);
 });track.append(group,group.cloneNode(true));wall.append(track);
}
const toggle=document.querySelector('#motion-toggle');
let paused=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function motion(){document.querySelector('.hero').classList.toggle('paused',paused);toggle.setAttribute('aria-pressed',String(paused));toggle.innerHTML=paused?'Play motion <span aria-hidden="true">▷</span>':'Pause motion <span aria-hidden="true">Ⅱ</span>';if(!paused&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.querySelectorAll('.film-row').forEach(e=>e.style.animationPlayState='running');}else{document.querySelectorAll('.film-row').forEach(e=>e.style.animationPlayState='');}}
toggle.addEventListener('click',()=>{paused=!paused;motion()});motion();
const slider=document.querySelector('#comparison-slider');
function updateSlider(){document.querySelector('#before-layer').style.clipPath=`inset(0 ${100-slider.value}% 0 0)`;document.querySelector('#compare-line').style.left=slider.value+'%';slider.setAttribute('aria-valuetext',`${slider.value}% before, ${100-slider.value}% after`);}
slider.addEventListener('input',updateSlider);updateSlider();
const categoryTabs=document.querySelector('#category-tabs');
function selectCategory(cat,index){
 [...categoryTabs.children].forEach((b,i)=>{b.setAttribute('aria-selected',String(i===index));b.tabIndex=i===index?0:-1;});
 for(const [element,state,label] of [['before-img',0,'Before'],['after-img',1,'After']]){const im=document.getElementById(element);im.src=`assets/images/${cat.key}-${cat.id}-${state}.webp`;im.alt=`${cat.name}: ${label.toLowerCase()} the action, same recorded viewpoint`;}
 document.querySelector('#episode-number').textContent=`0${index+1} / ${cat.name}`;document.querySelector('#episode-title').textContent=cat.title;document.querySelector('#episode-description').textContent=cat.description;slider.value=50;updateSlider();
}
categories.forEach((cat,i)=>{const b=document.createElement('button');b.textContent=cat.name;b.id='category-'+cat.key;b.setAttribute('role','tab');b.setAttribute('aria-controls','episode-panel');b.addEventListener('click',()=>{selectCategory(cat,i);document.querySelector('.episode-panel').setAttribute('aria-labelledby',b.id)});categoryTabs.append(b);});
document.querySelector('.episode-panel').id='episode-panel';document.querySelector('.episode-panel').setAttribute('role','tabpanel');document.querySelector('.episode-panel').setAttribute('aria-labelledby','category-joint');selectCategory(categories[0],0);
function keyboardTabs(list){list.addEventListener('keydown',e=>{const buttons=[...list.querySelectorAll('[role=tab]')];let i=buttons.indexOf(document.activeElement);if(i<0)return;if(e.key==='ArrowRight')i=(i+1)%buttons.length;else if(e.key==='ArrowLeft')i=(i+buttons.length-1)%buttons.length;else if(e.key==='Home')i=0;else if(e.key==='End')i=buttons.length-1;else return;e.preventDefault();buttons[i].focus();buttons[i].click();});}keyboardTabs(categoryTabs);
// Paper Table 1; null entries retain the manuscript's unreported metrics.
// Per method: Whole, Items, T1-T5, Changed F1, joint Changed/Rechecked/Unrelated.
const cohortResults = [
 {backend:'Qwen3-VL-4B-Instruct',gain:'+19.80',direct:['3.60','44.66','14.38','2.25','0.00','1.83','0.00','18.85','5.18','16.94','38.50'],ravel:['23.40','78.92','67.75','10.50','12.60','23.17','5.63','62.40','50.36','62.68','87.98']},
 {backend:'Qwen3-VL-8B-Instruct',direct:null,ravel:null},
 {backend:'Qwen3-VL-32B-Instruct',direct:null,ravel:null},
 {backend:'Spatial-SSRL-Qwen3VL-4B',gain:'+17.10',direct:['1.78','37.59','8.00','0.13','0.00','1.00','0.00','12.14','2.04','7.96','39.52'],ravel:['18.88','75.74','62.00','6.75','7.30','17.67','3.25','56.06','43.28','57.56','87.39']},
 {backend:'Molmo2-ER',gain:'+13.35',direct:['8.75','47.45','39.50','2.75','0.00','2.00','0.00','38.03','0.49','39.84','0.00'],ravel:['22.10','74.67','65.50','11.13','9.20','22.50','5.50','53.13','35.33','62.34','78.84']},
 {backend:'MiniCPM-V4.5',direct:null,ravel:null},
 {backend:'DeepSeek-4.1-Flash',direct:null,ravel:null},
 {backend:'GPT-6-Luna',direct:null,ravel:null},
 {backend:'GPT-6.1-Sol',gain:'+16.95',direct:['62.05','92.76','88.13','55.38','55.20','64.00','49.75','88.13','81.63','93.08','94.84'],ravel:['79.00','96.64','96.00','69.00','77.80','80.83','72.13','95.49','93.43','96.81','97.64']},
 {backend:'GPT-6-Astra',gain:'+18.50',direct:['62.70','92.83','87.50','57.38','54.30','66.50','50.88','88.25','81.60','93.73','94.30'],ravel:['81.20','96.96','95.75','73.75','79.10','86.50','72.75','95.71','94.30','96.78','97.54']}
];
function methodMetrics(row, method){return row[method] || Array(11).fill('–');}
const tables={
 main:{
  kicker:'Full cohort · 4,000 questions · Paper Table 1',
  title:'Whole-question, item accuracy and change detection (%)',
  headers:['Backend','Direct · Whole','RAVEL · Whole','Δ Whole (pp)','Direct · Items','RAVEL · Items','Direct · Changed F1','RAVEL · Changed F1'],
  rows:cohortResults.map(row => {const d=methodMetrics(row,'direct'),r=methodMetrics(row,'ravel');return [row.backend,d[0],r[0],row.gain || '–',d[1],r[1],d[7],r[7]];}),
  proposed:[2,5,7],gains:[3],
  note:'Whole requires every semantic item in a question to be correct; Items micro-averages 77,303 answer items. Direct uses permitted images and the final schema in one call. RAVEL adds public initial geometry and state-wise calls (8,995 versus 4,000 per backend). Matched controls are shown separately. GPT-6.1-Sol and GPT-6-Astra use medium reasoning effort. A dash marks a metric not reported in Table 1. Figure 1 separately reports Qwen3-VL-8B Whole at 8.40% Direct and 24.28% RAVEL; its Table 1 row remains unreported.'
 },
 tasks:{
  kicker:'Full cohort · Whole-question accuracy by task · Paper Table 1',
  title:'From observed endpoints to sequential tracking (%)',
  headers:['Backend','Method','T1 · Single relation','T2 · Prediction','T3 · Joint updates','T4 · Edit choice','T5 · Tracking'],
  rows:cohortResults.flatMap(row => [['direct','Direct'],['ravel','RAVEL']].map(([key,label]) => [row.backend,label,...methodMetrics(row,key).slice(2,7)])),
  proposed:[],gains:[],highlightAlternating:true,
  note:'T1 establishes a single observed relation; T2 predicts hidden outcomes; T3 jointly updates multiple relations; T4 selects the exact admissible edit set; T5 tracks values and updates across four to six states. Dashes retain unreported entries in the current manuscript. The full RAVEL configuration includes additional initial declarations and state-wise inference.'
 },
 matched:{
  kicker:'Balanced500 · 100 questions per task · Paper Table 2',
  title:'Shared execution with optional P/L binding (%)',
  headers:['Configuration','P','L','Qwen-4B · Whole','Qwen-4B · Items','Qwen-4B · Changed F1','Astra · Whole','Astra · Items','Astra · Changed F1'],
  rows:[
   ['Matched Direct','–','–','6.20','52.64','23.65','78.00','96.14','94.57'],
   ['C00 · Binding off','0','0','21.60','78.56','62.15','80.00','96.73','95.53'],
   ['C10 · P only','1','0','23.20','79.21','63.82','78.40','96.53','94.66'],
   ['C01 · L only','0','1','21.40','78.86','62.64','79.40','96.59','95.03'],
   ['C11 · Full RAVEL','1','1','24.40','80.03','65.50','80.20','96.59','97.51'],
   ['Conservative geometry','1','1','20.40','78.09','57.45','79.20','96.49','94.71']
  ],
  highlightRow:4,proposed:[],gains:[],
  note:'All configurations share raw initial information, permitted images, call schedules, and per-call output limits. Every C row retains state updates, validity tracking, geometry propagation, relation evaluation, history, and answer composition. P binds computed findings; L binds eligible carried-over findings. With binding off, these findings remain advisory. Conservative geometry invalidates non-fixed centers after each action. Token usage and inference time are not matched. Values are transcribed from the current manuscript.'
 },
 joint:{
  kicker:'Full cohort · T3 / T5 joint relation scoring · Paper Table 1',
  title:'Both endpoints and the update must be correct (%)',
  headers:['Backend','Method','Changed','Rechecked preservation','Unrelated preservation'],
  rows:cohortResults.flatMap(row => [['direct','Direct'],['ravel','RAVEL']].map(([key,label]) => [row.backend,label,...methodMetrics(row,key).slice(8)])),
  proposed:[],gains:[],highlightAlternating:true,
  note:'Joint accuracy requires both endpoint values and the T3/T5 update label to be correct. Rechecked preservation involves an action participant; unrelated preservation lies outside that participation scope. Known false-to-false relations are also preservation. These results use the full-configuration protocol. Dashes retain unreported entries in Table 1.'
 }
};
function renderTable(key){const t=tables[key];document.querySelector('#table-kicker').textContent=t.kicker;document.querySelector('#table-title').textContent=t.title;document.querySelector('#table-note').textContent=t.note;const table=document.querySelector('#results-table');table.replaceChildren();const caption=document.createElement('caption');caption.className='sr-only';caption.textContent=t.title;table.append(caption);const head=table.createTHead().insertRow();t.headers.forEach((label,i)=>{const th=document.createElement('th');th.scope='col';th.textContent=label;if(t.proposed.includes(i))th.className='proposed';head.append(th)});const body=table.createTBody();t.rows.forEach((row,r)=>{const tr=body.insertRow();if(row.slice(2).every(value=>value==='–'))tr.classList.add('unreported');row.forEach((value,c)=>{const cell=tr.insertCell();cell.textContent=value;if(c===0)cell.classList.add('model');if(t.proposed.includes(c)||(t.highlightRow===r&&c>0)||(t.highlightAlternating&&r%2===1&&c>0))cell.classList.add('proposed');if(t.gains.includes(c))cell.classList.add('gain');});});document.querySelectorAll('[data-result]').forEach(b=>{b.setAttribute('aria-selected',String(b.dataset.result===key));b.tabIndex=b.dataset.result===key?0:-1});document.querySelector('#results-panel').setAttribute('aria-labelledby','tab-'+key);}
document.querySelectorAll('[data-result]').forEach(b=>b.addEventListener('click',()=>renderTable(b.dataset.result)));keyboardTabs(document.querySelector('#result-tabs'));renderTable('main');
