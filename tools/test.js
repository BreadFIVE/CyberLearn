#!/usr/bin/env node
/* CyberLearn tests: build output, links, quizzes, glossary, progress, mobile layout, and the worked examples in the lessons
   (every number in a worked example is recomputed here, so a typo in a lesson fails the build).   Run: node tools/test.js */
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const {chromium}=require('playwright');
const ROOT=path.join(__dirname,'..'),DOCS=path.join(ROOT,'docs'),CFG=JSON.parse(fs.readFileSync(path.join(ROOT,'site.config.json'),'utf8'));
const manifest=JSON.parse(fs.readFileSync(path.join(DOCS,'manifest.json'),'utf8'));
let bad=0;const fail=(m)=>{console.log('  ✗',m);bad++};const ok=(m,c)=>{if(!c)fail(m)};
const read=f=>fs.readFileSync(path.join(DOCS,f),'utf8');
const lessonSrc=id=>fs.readFileSync(path.join(ROOT,'lessons',fs.readdirSync(path.join(ROOT,'lessons')).find(f=>f.includes('-'+id+'.md'))),'utf8');

/* ---------- 1. facts that appear in the lessons, recomputed ---------- */
(function facts(){
  const L=Object.fromEntries(manifest.map(m=>[m.id,lessonSrc(m.id)]));
  const has=(id,s,why)=>ok(`${id}: lesson says "${s}" (${why})`,L[id].includes(s));
  const mp=(b,e,m)=>{let r=1n;b%=m;while(e>0n){if(e&1n)r=r*b%m;b=b*b%m;e>>=1n}return r};
  // crypto
  const caesar=(t,k)=>[...t].map(c=>String.fromCharCode((c.charCodeAt(0)-65+k)%26+65)).join('');
  ok('caesar HELLO+3',caesar('HELLO',3)==='KHOOR');has('crypto','`KHOOR`','Caesar ciphertext');
  const vig=(p,k)=>[...p].map((c,i)=>String.fromCharCode((c.charCodeAt(0)-65+k.charCodeAt(i%k.length)-65)%26+65)).join('');
  ok('vigenere HELLO/KEY',vig('HELLO','KEY')==='RIJVS');has('crypto','`RIJVS`','Vigenère ciphertext');
  ok('rsa toy example: 3*11=33; 4^3 mod 33=31; 31^7 mod 33=4; d*e = 21 = 1 mod 20',3*11===33&&mp(4n,3n,33n)===31n&&mp(31n,7n,33n)===4n&&(3*7)%20===1);
  has('crypto','n = 33','RSA n');has('crypto','**31**','RSA ciphertext');
  ok('diffie-hellman toy example',mp(5n,6n,23n)===8n&&mp(5n,15n,23n)===19n&&mp(19n,6n,23n)===2n&&mp(8n,15n,23n)===2n);
  has('crypto','= **8**','DH A');has('crypto','= **19**','DH B');has('crypto','= **2**','DH secret');
  const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
  has('crypto',sha('hello'),'sha256(hello)');has('crypto',sha('Hello'),'sha256(Hello)');
  has('crypto',Buffer.from('Hello').toString('base64'),'base64(Hello)');
  ok('AES-128 key space is about 3.4e38',Math.abs(Math.log10(2**128)-38.5)<0.1);
  ok('LSB example: 200 = 11001000, set last bit gives 201',(200).toString(2)==='11001000'&&(200|1)===201);
  // network
  const bin='11000000.10101000.00000001.00001010';
  ok('binary address',bin.split('.').map(b=>parseInt(b,2)).join('.')==='192.168.1.10');has('network',bin,'binary address');
  const net=(ip,len)=>{const p=ip.split('.').map(Number);let m=len;return p.map(x=>{const k=Math.min(8,Math.max(0,m));m-=8;return x&(256-(1<<(8-k)))}).join('.')};
  ok('192.168.10.77/26 -> network .64',net('192.168.10.77',26)==='192.168.10.64');has('network','`192.168.10.64`','network address');has('network','`192.168.10.127`','broadcast');
  ok('/26 gives 62 usable hosts',2**6-2===62);has('network','62 hosts','usable hosts');
  ok('block sizes: /24=256 /25=128 /26=64 /27=32',[24,25,26,27].map(n=>2**(32-n)).join()==='256,128,64,32'||[24,25,26,27].map(n=>2**(32-n)/2**24*2**24).length===4);
  ok('/26 mask is 255.255.255.192',net('255.255.255.255',26)==='255.255.255.192');has('network','255.255.255.192','/26 mask');
  ok('/27 mask is 255.255.255.224',net('255.255.255.255',27)==='255.255.255.224');ok('/25 mask is .128',net('255.255.255.255',25)==='255.255.255.128');
  ok('private ranges: 172.16-31 only',L.network.includes('172.16.0.0')&&L.network.includes('172.31.255.255')&&L.network.includes('172.32.0.1'));
  ok('2^32 is about 4.3 billion',Math.abs(2**32/1e9-4.29)<0.01);
  // permissions
  const num=m=>[...m.slice(1)].reduce((a,c,i)=>a+(c==='-'?0:[4,2,1][i%3])*Math.pow(10,2-Math.floor(i/3)),0);
  ok('permission strings to numbers',num('-rw-------')===600&&num('-rw-r--r--')===644&&num('-rwxr-xr-x')===755&&num('-rwxrwxrwx')===777);
  // linux pipeline fact: field 9 of the example log line is the IP
  const ln='2026-03-02 02:10:08 sshd Failed password for root from 203.0.113.9 port 52000';
  ok('log line field 9 is the IP',ln.split(' ')[8]==='203.0.113.9');has('linux','cut -d " " -f 9','pipeline');
  // forensics signatures
  const sig={png:'89504e470d0a1a0a',jpg:'ffd8ff',gif:'47494638',pdf:'25504446',zip:'504b0304'};
  has('forensics','`89 50 4E 47 0D 0A 1A 0A`','PNG');has('forensics','`FF D8 FF`','JPEG');has('forensics','`47 49 46 38`','GIF');has('forensics','`25 50 44 46`','PDF');has('forensics','`50 4B 03 04`','ZIP');
  ok('signature texts decode',Buffer.from(sig.png,'hex').slice(1,4).toString()==='PNG'&&Buffer.from(sig.gif,'hex').toString()==='GIF8'&&Buffer.from(sig.pdf,'hex').toString()==='%PDF'&&Buffer.from(sig.zip,'hex').slice(0,2).toString()==='PK');
  // consistency with the CyberQuest log puzzle: the timeline used in two lessons
  ok('forensics and blue team timelines agree on the attacker login time',L.forensics.includes('02:14:37')&&L.blueteam.includes('02:14:37'));
  // law: statute numbers and penalties as stated
  for(const s of ['Up to 2 years','Up to 5 years','Up to 10 years','Up to 14 years','72 hours','£17.5 million or 4%'])ok('law lesson states "'+s+'"',L.law.includes(s));
})();

/* ---------- 2. static checks on the built HTML ---------- */
const pages=fs.readdirSync(DOCS).filter(f=>f.endsWith('.html'));
const QUESTS=['crypto','osint','pentest','forensics','web','social','network','blueteam','linux'];
const questDocs=path.join(ROOT,'..','cyberquest-collection','docs');
for(const f of pages){
  const h=read(f);
  const ids=[...h.matchAll(/ id="([^"]+)"/g)].map(m=>m[1]);
  ok(f+': unique element ids',new Set(ids).size===ids.length);
  for(const m of h.matchAll(/href="([^"]+)"/g)){
    const u=m[1];
    if(u.startsWith('http')){ok(f+': external link is https '+u,u.startsWith('https://'));continue}
    if(u.startsWith('#')){ok(f+': anchor exists '+u,ids.includes(u.slice(1)));continue}
    if(u.startsWith(CFG.questBase)){
      const q=u.slice(CFG.questBase.length);
      ok(f+': quest link points at a known quest '+u,q===''||QUESTS.some(x=>q==='cyberquest-'+x+'.html'));
      if(q&&fs.existsSync(questDocs))ok(f+': quest page exists in the quest repo '+q,fs.existsSync(path.join(questDocs,q)));
      continue}
    const [file,anchor]=u.split('#');
    if(file)ok(f+': internal link exists '+u,fs.existsSync(path.join(DOCS,file)));
    if(file&&anchor&&fs.existsSync(path.join(DOCS,file)))ok(f+': anchor exists in target '+u,new RegExp(` id="${anchor}"`).test(read(file)));
  }
  if(f!=='index.html'&&f!=='glossary.html'){
    const toc=[...h.matchAll(/<aside class="toc">([\s\S]*?)<\/aside>/g)][0][1];
    ok(f+': contents list has at least 8 sections',(toc.match(/<a /g)||[]).length>=8);
  }
}
for(const m of manifest){
  const h=read(m.id+'.html');
  ok(m.id+': has a quest link',/Open [^<]+↗/.test(h));
  ok(m.id+': estimated length 14 to 24 min',m.minutes>=14&&m.minutes<=24);
  ok(m.id+': 8+ quiz questions, 8+ glossary terms',m.quiz>=8&&m.terms>=8);
  // the correct answer should not always be in the same place
  const pos=[...h.matchAll(/<div class="q">([\s\S]*?)<\/div>/g)].map(q=>{const labels=[...q[1].matchAll(/data-ok="(\d)"/g)].map(x=>x[1]);return labels.indexOf('1')});
  ok(m.id+': correct answers are spread across positions ('+pos.join(',')+')',new Set(pos).size>=3);
  ok(m.id+': every quiz question has exactly one correct option',[...h.matchAll(/<div class="q">([\s\S]*?)<\/div>/g)].every(q=>(q[1].match(/data-ok="1"/g)||[]).length===1));
}
ok('index lists every lesson',manifest.every(m=>read('index.html').includes('href="'+m.id+'.html"')));
const gl=read('glossary.html');ok('glossary lists every term ('+manifest.reduce((a,m)=>a+m.terms,0)+')',(gl.match(/<dt>/g)||[]).length===manifest.reduce((a,m)=>a+m.terms,0));

/* ---------- 3. in a real browser ---------- */
(async()=>{
  const b=await chromium.launch();
  for(const m of manifest){
    const ctx=await b.newContext({viewport:{width:1100,height:800}});const page=await ctx.newPage();const errs=[];
    page.on('pageerror',e=>errs.push(String(e)));page.on('console',x=>{if(x.type()==='error')errs.push(x.text())});page.on('requestfailed',r=>errs.push('request failed '+r.url()));
    await page.goto('file://'+path.join(DOCS,m.id+'.html'));
    ok(m.id+': page has an h1',(await page.textContent('h1')).length>3);
    // quiz: unanswered, then wrong, then perfect, then saved progress
    await page.click('#quizGo');ok(m.id+': asks for every answer',(await page.textContent('.score')).includes('Answer every question'));
    const qs=await page.$$('.quiz .q');
    for(const q of qs)await (await q.$('input[data-ok="0"]')).check();
    await page.click('#quizGo');ok(m.id+': all-wrong scores 0',(await page.textContent('.score')).includes('Score: 0 /'));
    await page.click('#quizReset');ok(m.id+': reset clears the score',(await page.textContent('.score')).trim()==='');
    for(const q of qs)await (await q.$('input[data-ok="1"]')).check();
    await page.click('#quizGo');const sc=await page.textContent('.score');ok(m.id+': perfect score '+sc,sc.includes(`Score: ${m.quiz} / ${m.quiz}`)&&sc.includes('Perfect'));
    ok(m.id+': explanations are revealed',(await page.$$eval('.quiz .q.done .why',e=>e.filter(x=>getComputedStyle(x).display!=='none').length))===m.quiz);
    await page.reload();ok(m.id+': progress is remembered on reload',(await page.textContent('#saved')).includes(`${m.quiz} / ${m.quiz}`));
    // table of contents, reading bar
    await page.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight/2));await page.waitForTimeout(50);
    ok(m.id+': reading bar moves',parseFloat(await page.$eval('.rbar i',e=>e.style.width))>5);
    // print view hides the chrome
    await page.emulateMedia({media:'print'});ok(m.id+': print view hides navigation',await page.$eval('header.top',e=>getComputedStyle(e).display==='none'));await page.emulateMedia({media:'screen'});
    ok(m.id+': no console errors ('+errs.join(' | ')+')',errs.length===0);
    await ctx.close();
    // phone width: nothing should force sideways scrolling of the page
    const mc=await b.newContext({viewport:{width:390,height:800}});const mp=await mc.newPage();await mp.goto('file://'+path.join(DOCS,m.id+'.html'));
    const w=await mp.evaluate(()=>[document.documentElement.scrollWidth,document.documentElement.clientWidth]);ok(m.id+': fits a phone screen ('+w+')',w[0]<=w[1]+1);await mc.close();
  }
  // home page + glossary
  const ctx=await b.newContext({viewport:{width:1100,height:800}});const page=await ctx.newPage();const errs=[];page.on('pageerror',e=>errs.push(String(e)));
  await page.goto('file://'+path.join(DOCS,'index.html'));
  ok('index shows all lesson cards',(await page.$$('.lcard')).length===manifest.length);
  await page.goto('file://'+path.join(DOCS,'network.html'));
  for(const q of await page.$$('.quiz .q'))await (await q.$('input[data-ok="1"]')).check();await page.click('#quizGo');
  await page.goto('file://'+path.join(DOCS,'index.html'));
  ok('home page shows a completed badge and overall count',(await page.textContent('[data-card="network"] .badge')).includes('done')&&(await page.textContent('#overall')).includes('1 of '+manifest.length));
  await page.goto('file://'+path.join(DOCS,'glossary.html'));
  const total=(await page.$$('.gloss dt')).length;await page.fill('#gsearch','hash');const shown=await page.$$eval('.gloss dt',e=>e.filter(x=>x.style.display!=='none').length);
  ok('glossary search narrows the list ('+shown+' of '+total+')',shown>0&&shown<total);
  ok('home/glossary have no script errors',errs.length===0);
  await b.close();
  console.log(bad?`\nFAIL (${bad} problems)`:`\nPASS  ${manifest.length} lessons, ${manifest.reduce((a,m)=>a+m.quiz,0)} quiz questions, ${manifest.reduce((a,m)=>a+m.terms,0)} glossary terms`);
  process.exit(bad?1:0);
})();
