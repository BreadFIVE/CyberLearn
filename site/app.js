/* CyberLearn front-end: reading progress, quizzes, saved progress and glossary search. Everything is optional: pages read fine without JS. */
(function(){
  var KEY='cyberlearn_progress_v1';
  function load(){try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return {}}}
  function save(p){try{localStorage.setItem(KEY,JSON.stringify(p))}catch(e){}}
  var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var prog=load(),page=document.body.dataset.lesson;

  /* reading progress bar + contents highlight */
  var bar=$('.rbar i');
  if(bar||$('aside.toc')){
    var heads=$$('article h2'),links=$$('aside.toc a');
    var onScroll=function(){
      var h=document.documentElement,max=h.scrollHeight-h.clientHeight;
      if(bar)bar.style.width=(max>0?Math.min(100,h.scrollTop/max*100):0)+'%';
      var cur=null;heads.forEach(function(x){if(x.getBoundingClientRect().top<120)cur=x.id});
      links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+cur)});
    };
    window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  }

  /* quiz */
  var quiz=$('.quiz');
  if(quiz){
    var qs=$$('.q',quiz),res=$('.score',quiz);
    $('#quizGo').onclick=function(){
      var ok=0,answered=0;
      qs.forEach(function(q){
        var sel=$('input:checked',q);q.classList.remove('good','bad','done');
        $$('label',q).forEach(function(l){l.classList.remove('right','wrong')});
        if(!sel)return;answered++;
        var good=sel.dataset.ok==='1';if(good)ok++;
        q.classList.add('done',good?'good':'bad');
        $$('label',q).forEach(function(l){var i=$('input',l);if(i.dataset.ok==='1')l.classList.add('right');else if(i===sel)l.classList.add('wrong')});
      });
      if(answered<qs.length){res.textContent='Answer every question first ('+answered+'/'+qs.length+' answered).';return}
      res.textContent='Score: '+ok+' / '+qs.length+(ok===qs.length?'  ✔ Perfect!':ok>=qs.length*0.7?'  Nice work. Read the explanations on any you missed.':'  Have another look at the lesson, then try again.');
      if(page){var p=load();var e=p[page]||{};e.best=Math.max(e.best||0,ok);e.total=qs.length;if(ok>=Math.ceil(qs.length*0.7))e.done=true;p[page]=e;save(p);prog=p;mark()}
    };
    $('#quizReset').onclick=function(){qs.forEach(function(q){q.classList.remove('good','bad','done');$$('input',q).forEach(function(i){i.checked=false});$$('label',q).forEach(function(l){l.classList.remove('right','wrong')})});res.textContent=''};
  }

  /* progress badges on the home page and on lesson pages */
  function mark(){
    $$('[data-card]').forEach(function(c){var e=prog[c.dataset.card];var b=$('.badge',c);if(b&&e){b.textContent=e.done?'✔ done':(e.best!=null?'quiz '+e.best+'/'+e.total:'')}});
    var s=$('#saved');if(s&&page&&prog[page]&&prog[page].best!=null)s.textContent='Your best quiz score on this device: '+prog[page].best+' / '+prog[page].total;
    var done=Object.keys(prog).filter(function(k){return prog[k].done}).length,t=$('#overall');
    if(t)t.textContent=done?(done+' of '+t.dataset.total+' lessons completed on this device'):'';
  }
  mark();
  var rs=$('#resetProgress');if(rs)rs.onclick=function(){if(confirm('Clear saved progress on this device?')){save({});prog={};location.reload()}};

  /* glossary search */
  var gs=$('#gsearch');
  if(gs)gs.oninput=function(){var q=gs.value.toLowerCase();$$('.gloss dt').forEach(function(dt){var dd=dt.nextElementSibling;var hit=!q||(dt.textContent+' '+dd.textContent).toLowerCase().indexOf(q)>=0;dt.style.display=hit?'':'none';dd.style.display=hit?'':'none'})};
})();
