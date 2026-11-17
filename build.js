#!/usr/bin/env node
/* CyberLearn builder: lessons/*.md  ->  docs/*.html (plain static pages, ready for GitHub Pages).
   Lesson format is described in README.md. Run:  node build.js */
const fs=require('fs'),path=require('path');
const ROOT=__dirname,OUT=path.join(ROOT,'docs'),CFG=JSON.parse(fs.readFileSync(path.join(ROOT,'site.config.json'),'utf8'));
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const slug=s=>s.toLowerCase().replace(/<[^>]+>/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const errors=[],warn=[];

/* ---------- inline markdown ---------- */
function inline(s){
  const codes=[];
  s=s.replace(/`([^`]+)`/g,(m,c)=>{codes.push(c);return '\u0000'+(codes.length-1)+'\u0000'});
  s=esc(s);
  s=s.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|#[^)\s]*|[a-z0-9._\/-]+\.html(?:#[^)\s]*)?)\)/gi,(m,t,u)=>`<a href="${u}"${/^https?:/.test(u)?' target="_blank" rel="noopener"':''}>${t}</a>`);
  s=s.replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>').replace(/(^|[\s(])\*([^*\s][^*]*)\*/g,'$1<i>$2</i>');
  s=s.replace(/\^([^^\s]+)\^/g,'<sup>$1</sup>');
  return s.replace(/\u0000(\d+)\u0000/g,(m,i)=>'<code>'+esc(codes[+i])+'</code>');
}

/* ---------- block markdown ---------- */
function parse(md,ctx){
  const L=md.replace(/\r/g,'').split('\n'),out=[],toc=[];let i=0;
  const para=[];const flush=()=>{if(para.length){out.push('<p>'+inline(para.join(' '))+'</p>');para.length=0}};
  while(i<L.length){
    const ln=L[i];
    if(/^```/.test(ln)){
      flush();const lang=ln.slice(3).trim(),buf=[];i++;
      while(i<L.length&&!/^```/.test(L[i]))buf.push(L[i++]);i++;
      if(lang==='quiz')ctx.quiz=parseQuiz(buf,ctx);
      else if(lang==='glossary')ctx.gloss=buf.filter(x=>x.includes('::')).map(x=>{const [t,...d]=x.split('::');return [t.trim(),d.join('::').trim()]});
      else if(lang==='further')ctx.further=buf.filter(x=>x.includes('|')).map(x=>{const p=x.split('|').map(y=>y.trim());return {t:p[0],u:p[1],n:p[2]||''}});
      else out.push(`<pre${lang==='diagram'?' class="diagram"':''}><code>${esc(buf.join('\n'))}</code></pre>`);
      continue;
    }
    let m;
    if((m=ln.match(/^(#{2,3})\s+(.*)$/))){
      flush();const lv=m[1].length;let id=slug(m[2]);ctx.seen=ctx.seen||{};if(ctx.seen[id]){id+='-'+(++ctx.seen[id])}else ctx.seen[id]=1;
      if(lv===2)toc.push({id,t:m[2]});
      out.push(`<h${lv} id="${id}">${inline(m[2])}</h${lv}>`);i++;continue;
    }
    if(/^>/.test(ln)){
      flush();const buf=[];while(i<L.length&&/^>/.test(L[i]))buf.push(L[i++].replace(/^>\s?/,''));
      const first=buf[0].match(/^\*\*([^*:]+):\*\*\s*(.*)$/);let cls='',label='';
      if(first){label=first[1];cls=slug(label);buf[0]=first[2]}
      const paras=buf.join('\n').split(/\n\s*\n/).map(p=>'<p>'+inline(p.replace(/\n/g,' '))+'</p>').join('');
      out.push(`<blockquote${cls?` class="${cls}"`:''}>${label?`<div class="lab">${esc(label)}</div>`:''}${paras}</blockquote>`);continue;
    }
    if(/^\|/.test(ln)&&/^\|?\s*:?-{2,}/.test(L[i+1]||'')){
      flush();const rows=[];while(i<L.length&&/^\|/.test(L[i]))rows.push(L[i++]);
      const cells=r=>r.replace(/^\||\|$/g,'').split('|').map(c=>c.trim());
      const head=cells(rows[0]),body=rows.slice(2).map(cells);
      out.push('<table><thead><tr>'+head.map(h=>'<th>'+inline(h)+'</th>').join('')+'</tr></thead><tbody>'+body.map(r=>'<tr>'+r.map(c=>'<td>'+inline(c)+'</td>').join('')+'</tr>').join('')+'</tbody></table>');continue;
    }
    if(/^(\s*)[-*]\s+/.test(ln)||/^\d+\.\s+/.test(ln)){
      flush();const ord=/^\d+\./.test(ln),items=[];
      while(i<L.length&&(ord?/^\d+\.\s+/.test(L[i]):/^[-*]\s+/.test(L[i]))){let t=L[i++].replace(ord?/^\d+\.\s+/:/^[-*]\s+/,'');while(i<L.length&&/^\s{2,}\S/.test(L[i]))t+=' '+L[i++].trim();items.push(t)}
      out.push((ord?'<ol>':'<ul>')+items.map(t=>'<li>'+inline(t)+'</li>').join('')+(ord?'</ol>':'</ul>'));continue;
    }
    if(!ln.trim()){flush();i++;continue}
    para.push(ln.trim());i++;
  }
  flush();return {html:out.join('\n'),toc};
}

function parseQuiz(buf,ctx){
  const qs=[];let cur=null;
  for(const raw of buf){const l=raw.trim();if(!l)continue;
    if(l.startsWith('Q:')){cur={q:l.slice(2).trim(),opts:[],why:''};qs.push(cur)}
    else if(cur&&(l[0]==='+'||l[0]==='-')&&l[1]===' ')cur.opts.push({t:l.slice(2).trim(),ok:l[0]==='+'});
    else if(cur&&l[0]==='?')cur.why=l.slice(1).trim();
    else errors.push(`${ctx.id}: unrecognised quiz line "${l}"`)}
  qs.forEach((q,n)=>{if(q.opts.filter(o=>o.ok).length!==1)errors.push(`${ctx.id}: quiz question ${n+1} must have exactly one + answer`);if(q.opts.length<3)errors.push(`${ctx.id}: quiz question ${n+1} needs at least 3 options`);if(!q.why)errors.push(`${ctx.id}: quiz question ${n+1} needs a ? explanation`)});
  return qs;
}

/* a stable, mild shuffle so the right answer is not always first (the order is the same on every build) */
function seeded(id){let h=0;for(const c of id)h=(h*31+c.charCodeAt(0))>>>0;return ()=>{h=(h*1664525+1013904223)>>>0;return h/4294967296}}
function shuffle(a,r){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

/* ---------- load lessons ---------- */
const lessons=fs.readdirSync(path.join(ROOT,'lessons')).filter(f=>f.endsWith('.md')).sort().map(f=>{
  const src=fs.readFileSync(path.join(ROOT,'lessons',f),'utf8');
  const m=src.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if(!m){errors.push(f+': missing front matter');return null}
  const fm={};m[1].split('\n').forEach(l=>{const k=l.indexOf(':');if(k>0)fm[l.slice(0,k).trim()]=l.slice(k+1).trim()});
  for(const k of ['id','title','order','icon','accent','summary','level'])if(!fm[k])errors.push(`${f}: front matter needs "${k}"`);
  const ctx={id:fm.id,quiz:null,gloss:[],further:[]};
  const {html,toc}=parse(m[2],ctx);
  const words=m[2].replace(/```[\s\S]*?```/g,' ').split(/\s+/).filter(Boolean).length;
  return {...fm,order:+fm.order,html,toc,words,quiz:ctx.quiz||[],gloss:ctx.gloss,further:ctx.further,minutes:Math.max(5,Math.round(words/190)+Math.ceil(((ctx.quiz||[]).length)/3))};
}).filter(Boolean).sort((a,b)=>a.order-b.order);

const ids=new Set();
for(const l of lessons){
  if(ids.has(l.id))errors.push('duplicate id '+l.id);ids.add(l.id);
  if(l.quiz.length<8)errors.push(`${l.id}: needs at least 8 quiz questions (has ${l.quiz.length})`);
  if(l.gloss.length<8)errors.push(`${l.id}: needs at least 8 glossary terms (has ${l.gloss.length})`);
  if(!l.further.length)errors.push(`${l.id}: needs at least one "further" link`);
  if(l.minutes<14||l.minutes>24)warn.push(`${l.id}: estimated ${l.minutes} min (${l.words} words); target is 15 to 20`);
  for(const f of l.further)if(!/^https:\/\//.test(f.u||''))errors.push(`${l.id}: further link "${f.t}" needs an https URL`);
}
if(errors.length){console.error('BUILD FAILED:\n  '+errors.join('\n  '));process.exit(1)}

/* ---------- page shell ---------- */
const questUrl=q=>CFG.questBase+(q==='original'?'CyberQuest.html':'cyberquest-'+q+'.html');
const QUESTS={crypto:'Cipher Vault',osint:'OSINT Investigator',pentest:'Red Team Lab',forensics:'Digital Detectives',web:'Web Warriors',social:'Human Firewall',network:'Network Navigator',blueteam:'SOC Analyst',linux:'Terminal Trainer'};
const shell=({title,body,lesson,cur,desc})=>`<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(desc||CFG.tagline)}">
<link rel="stylesheet" href="assets/style.css"></head>
<body${lesson?` data-lesson="${lesson}"`:''}>
<header class="top"><div class="wrap topin"><a class="logo" href="index.html">CYBER<span>LEARN</span></a>
<nav><a href="index.html"${cur==='home'?' class="on"':''}>Lessons</a><a href="glossary.html"${cur==='gloss'?' class="on"':''}>Glossary</a><a href="${CFG.questBase}" target="_blank" rel="noopener">${esc(CFG.questName)} ↗</a></nav></div><div class="rbar"><i></i></div></header>
${body}
<footer><div class="wrap">${esc(CFG.footer)}</div></footer>
<script src="assets/app.js"></script></body></html>`;

fs.rmSync(OUT,{recursive:true,force:true});fs.mkdirSync(path.join(OUT,'assets'),{recursive:true});
fs.copyFileSync(path.join(ROOT,'site/style.css'),path.join(OUT,'assets/style.css'));fs.copyFileSync(path.join(ROOT,'site/app.js'),path.join(OUT,'assets/app.js'));
fs.writeFileSync(path.join(OUT,'.nojekyll'),'');

lessons.forEach((l,n)=>{
  const prev=lessons[n-1],next=lessons[n+1],r=seeded(l.id);
  const quiz=l.quiz.map((q,qi)=>`<div class="q"><p class="qt">${qi+1}. ${inline(q.q)}</p>${shuffle(q.opts,r).map(o=>`<label><input type="radio" name="q${qi}" data-ok="${o.ok?1:0}">${inline(o.t)}</label>`).join('')}<p class="why"><b>Why:</b> ${inline(q.why)}</p></div>`).join('');
  const body=`<div class="wrap"><section class="hero" style="--accent:${l.accent}">
<div class="chip" style="display:inline-block">Lesson ${l.order}</div><h1>${esc(l.icon)} ${esc(l.title)}</h1><p class="lead">${esc(l.summary)}</p>
<div class="chips"><span class="chip">⏱ <b>~${l.minutes} min</b></span><span class="chip">Level: <b>${esc(l.level)}</b></span><span class="chip"><b>${l.quiz.length}</b> quiz questions</span>${l.quest?`<span class="chip">Practise in: <b>${esc(QUESTS[l.quest]||l.quest)}</b></span>`:''}</div>
<p class="noprint"><button class="btn sec" onclick="window.print()">🖨 Print or save as PDF</button> <span id="saved" class="chip" style="border:0;background:none"></span></p></section>
<div class="layout" style="--accent:${l.accent}"><aside class="toc"><b>In this lesson</b>${l.toc.map(t=>`<a href="#${t.id}">${inline(t.t)}</a>`).join('')}<a href="#quiz">Check yourself</a><a href="#terms">Key terms</a><a href="#keep-learning">Keep learning</a></aside>
<main><article>${l.html}
<div class="end"><h2 id="quiz">Check your understanding</h2><p>Pick one answer for each question. You need ${Math.ceil(l.quiz.length*0.7)} out of ${l.quiz.length} to complete the lesson. Your answers stay on this device only.</p>
<div class="quiz">${quiz}<p><button class="btn" id="quizGo">Check my answers</button> <button class="btn sec" id="quizReset" type="button">Start again</button></p><div class="score" role="status"></div></div>
<h2 id="terms">Key terms</h2><dl class="gloss">${l.gloss.map(([t,d])=>`<dt>${esc(t)}</dt><dd>${inline(d)}</dd>`).join('')}</dl>
<h2 id="keep-learning">Keep learning</h2><ul class="further">${l.further.map(f=>`<li><a href="${esc(f.u)}" target="_blank" rel="noopener">${esc(f.t)}</a>${f.n?`<small>${esc(f.n)}</small>`:''}</li>`).join('')}</ul>
${l.quest?`<div class="practice noprint"><h3>🎯 Now put it into practice</h3><p>The <b>${esc(QUESTS[l.quest]||l.quest)}</b> challenge set turns this lesson into hands-on puzzles you can solve in your browser. Everything in it is simulated and safe.</p><a class="btn" href="${questUrl(l.quest)}" target="_blank" rel="noopener">Open ${esc(QUESTS[l.quest]||l.quest)} ↗</a></div>`:`<div class="practice noprint"><h3>🎯 Ready for a challenge?</h3><p>Try the full set of simulated, safe challenges in <b>${esc(CFG.questName)}</b>.</p><a class="btn" href="${CFG.questBase}" target="_blank" rel="noopener">Open ${esc(CFG.questName)} ↗</a></div>`}
</div></article>
<nav class="pn noprint">${prev?`<a href="${prev.id}.html"><small>← Previous</small>${esc(prev.icon)} ${esc(prev.title)}</a>`:'<span></span>'}${next?`<a class="r" href="${next.id}.html"><small>Next →</small>${esc(next.icon)} ${esc(next.title)}</a>`:'<span></span>'}</nav></main></div></div>`;
  fs.writeFileSync(path.join(OUT,l.id+'.html'),shell({title:`${l.title} · CyberLearn`,body,lesson:l.id,desc:l.summary}));
});

/* index */
const total=lessons.reduce((a,l)=>a+l.minutes,0);
fs.writeFileSync(path.join(OUT,'index.html'),shell({cur:'home',title:'CyberLearn · cyber security basics, explained clearly',body:`<div class="wrap"><section class="hero"><h1>CYBER<span style="color:var(--dim);font-weight:400">LEARN</span></h1>
<p class="lead">${esc(CFG.tagline)}. Each lesson takes about 15 to 20 minutes, explains one area of cyber security from the ground up, and ends with a quiz. Then take the matching <b>${esc(CFG.questName)}</b> challenge to try it for yourself, in a safe simulated environment.</p>
<div class="chips"><span class="chip"><b>${lessons.length}</b> lessons</span><span class="chip">about <b>${Math.round(total/60)} hours</b> in total</span><span class="chip">No sign-up. Nothing leaves your device.</span></div>
<p><a class="btn" href="${lessons[0].id}.html">Start with lesson 1</a> <a class="btn sec" href="${CFG.questBase}" target="_blank" rel="noopener">Open ${esc(CFG.questName)} ↗</a></p><p id="overall" class="chip" data-total="${lessons.length}" style="border:0;background:none"></p></section>
<h2 style="margin:0">Choose a lesson</h2><div class="grid">${lessons.map(l=>`<a class="lcard" data-card="${l.id}" href="${l.id}.html" style="--accent:${l.accent}"><span class="badge"></span><span class="num">LESSON ${l.order} · ~${l.minutes} MIN · ${esc(l.level.toUpperCase())}</span><h3>${esc(l.icon)} ${esc(l.title)}</h3><p>${esc(l.summary)}</p></a>`).join('')}</div>
<h2>How to use CyberLearn</h2><ul><li><b>On your own:</b> read a lesson, take the quiz, then try the matching challenge set.</li><li><b>In a group or class:</b> lessons print cleanly as handouts (use the print button on any lesson).</li><li><b>Not sure where to begin?</b> Lessons 1 to 3 need no technical background. Read <b>Law and ethics</b> before you try Pen Testing: it explains where the legal line is.</li></ul>
<p class="noprint"><button class="btn sec" id="resetProgress">Clear my saved progress</button></p></div>`}));

/* glossary */
const terms=[];lessons.forEach(l=>l.gloss.forEach(([t,d])=>terms.push({t,d,l})));terms.sort((a,b)=>a.t.localeCompare(b.t,'en',{sensitivity:'base'}));
fs.writeFileSync(path.join(OUT,'glossary.html'),shell({cur:'gloss',title:'Glossary · CyberLearn',body:`<div class="wrap"><section class="hero"><h1>Glossary</h1><p class="lead">${terms.length} key terms from every lesson. Search, or follow a link to the lesson where the term is explained.</p><input id="gsearch" class="search" type="search" placeholder="Search terms…" aria-label="Search the glossary"></section>
<article style="max-width:820px"><dl class="gloss">${terms.map(x=>`<dt>${esc(x.t)}</dt><dd>${inline(x.d)} <a href="${x.l.id}.html#terms">(${esc(x.l.title)})</a></dd>`).join('')}</dl></article></div>`}));

fs.writeFileSync(path.join(OUT,'manifest.json'),JSON.stringify(lessons.map(l=>({id:l.id,title:l.title,order:l.order,minutes:l.minutes,words:l.words,quiz:l.quiz.length,terms:l.gloss.length,quest:l.quest||null})),null,2));
for(const w of warn)console.warn('warning: '+w);
console.log(`built ${lessons.length} lessons, ${terms.length} glossary terms, ~${total} min of reading -> docs/`);
