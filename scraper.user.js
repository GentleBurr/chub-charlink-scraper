// ==UserScript==
// @name         Chub Character Link Scraper
// @namespace    https://github.com/GentleBurr/chub-charlink-scraper
// @version      1.1.0
// @description  Mass-scrape Chub character links automatically
// @author       GentleBurr
// @match        *://*.chub.ai/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chub.ai
// @updateURL    https://raw.githubusercontent.com/GentleBurr/chub-charlink-scraper/main/scraper.user.js
// @downloadURL  https://raw.githubusercontent.com/GentleBurr/chub-charlink-scraper/main/scraper.user.js
// @grant        none
// ==/UserScript==

(function(){
    // Setup core variables and shortcuts
    var d=document,S=sessionStorage,J=JSON,
    g=function(i){return d.getElementById(i)},
    c=function(t){return d.createElement(t)},
    o=function(k){return J.parse(S.getItem(k)||'[]')},
    w=function(k,v){S.setItem(k,J.stringify(v))};
    
    // Prevent multiple instances from injecting
    if(g('c-scr'))return;
    
    // Extract creator name from current URL
    var P=function(){
        var m=location.pathname.match(/\/(users|characters)\/([^\/]+)/i);
        return m?m[2].toLowerCase():null;
    };
    
    // Create the main floating UI container
    var b=c('div');
    b.id='c-scr';
    
    // CSS Styling with Flexbox armor to prevent overflow
    var css='#c-scr{position:fixed;right:20px;width:auto;box-sizing:border-box;background:#012;color:#eee;padding:12px;border-radius:8px;z-index:99999;box-shadow:0 4px 6px #000;font-family:sans-serif;text-align:center;border:2px solid #70f;touch-action:none;display:flex;flex-direction:column}.b{padding:8px;border-radius:4px;margin-bottom:8px;font-weight:700;color:#eee;cursor:pointer}.b1{background:#222;border:1px solid #888}.b2{background:#70f;border:none}.b3{background:#b22;border:none}.t{color:#888;font-size:10px}#c-m{pointer-events:none;-webkit-user-select:none;user-select:none}.w{position:fixed;top:10%;left:10%;width:80%;height:80%;z-index:99999;background:#012;border:2px solid #70f;padding:10px;border-radius:8px;display:flex;flex-direction:column;box-sizing:border-box}.ta{flex:1;background:#222;color:#eee;border:1px solid #888;padding:10px;border-radius:4px;font-size:10px;margin-bottom:10px}.bx{display:flex;gap:10px}.cr{color:#555;font-size:9px;display:block;margin:-2px 0 -5px;cursor:pointer;text-align:left;}';
    
    var sty=c('style');
    sty.innerHTML=css;
    d.head.appendChild(sty);
    
    // Inject HTML structure (Header, Scrollable Body, Sticky Footer)
    b.innerHTML='<div id="c-hd" style="cursor:move;padding-bottom:5px;border-bottom:1px solid #70f;text-align:left;display:flex;justify-content:space-between;align-items:center;white-space:nowrap;flex-shrink:0;"><b id="c-m" style="margin-right:15px;">Scraper Ready!</b><span id="c-tog" style="cursor:pointer;padding:0 5px;font-size:14px;-webkit-user-select:none;user-select:none;">➕</span></div><div id="c-wrap" style="display:none;flex-direction:column;flex-shrink:1;min-height:0;margin-top:8px;"><div id="c-bod" style="overflow-y:auto;overflow-x:hidden;padding-right:4px;flex-shrink:1;min-height:0;"><span class="t">Saved: <span id="c-t">0</span></span><br><div class="t" style="margin-bottom:8px;width:100%;word-wrap:break-word">Creators: <span id="c-l"></span></div><div id="c-a" class="b">+ Scrape This Page</div><div id="c-n" class="b b1">+ Add Current Creator</div><div id="c-s" class="b b2" style="margin-bottom:0;">Show Links</div></div><div class="cr" style="flex-shrink:0;margin-top:4px;padding-top:4px;border-top:1px solid #333;margin-bottom:-2px;" ondblclick="window.open(\'https://github.com/GentleBurr/chub-charlink-scraper\')">© 2026 GentleBurr <span style="float:right">v1.1.0</span></div></div>';
    d.body.appendChild(b);

    // Guest Detector: Checks if user is logged out to adjust bottom padding dynamically
    var getB = function() {
        if (window.innerWidth > window.innerHeight) return '10px';
        var links = d.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
            var txt = links[i].innerText.trim().toLowerCase();
            if (txt === 'login' || txt === 'sign in') return '20px';
        }
        return '70px'; // Logged-in user nav bar height
    };
    
    // Dynamic Height calculation to prevent breaking through mobile UI bars
    var adjH=function(){b.style.maxHeight=(window.innerHeight-(window.innerWidth>window.innerHeight?20:80))+'px'};
    adjH();
    b.style.bottom = getB();
    
    // Drag and Drop State Variables
    var hd=g('c-hd'),act=false,iX=0,iY=0,sX=0,sY=0,isD=false,mL=null,mT=null,E=function(e){return e.touches?e.touches[0]:e};
    
    // Drag Start (Records initial tap position)
    var st=function(e){
        if(e.target.id==='c-tog')return;
        e.preventDefault();
        var v=E(e),R=b.getBoundingClientRect();
        iX=v.clientX-R.left; iY=v.clientY-R.top; sX=v.clientX; sY=v.clientY; isD=false; act=true;
    };
    var end=function(){act=false};
    
    // Drag Move (Includes 5px deadzone to prevent accidental anchor stripping)
    var mv=function(e){
        if(!act)return;
        var v=E(e);
        if(!isD){
            if(Math.abs(v.clientX-sX)>5||Math.abs(v.clientY-sY)>5){isD=true;mL=null;mT=null;}else return;
        }
        if(e.cancelable)e.preventDefault();
        var nx=v.clientX-iX,ny=v.clientY-iY,iw=window.innerWidth,ih=window.innerHeight,bw=b.offsetWidth,bh=b.offsetHeight;
        
        // Window boundaries forcefield
        if(nx<4)nx=4; if(ny<4)ny=4; if(nx+bw>iw-4)nx=iw-bw-4; if(ny+bh>ih-4)ny=ih-bh-4;
        b.style.left=nx+'px'; b.style.top=ny+'px'; b.style.right='auto'; b.style.bottom='auto';
    };
    
    // Attach Event Listeners
    hd.addEventListener('touchstart',st,{passive:false}); hd.addEventListener('mousedown',st);
    d.addEventListener('touchend',end); d.addEventListener('mouseup',end);
    d.addEventListener('touchmove',mv,{passive:false}); d.addEventListener('mousemove',mv);
    
    // Window Resize Handler (Catches mobile virtual keyboard)
    window.addEventListener('resize',function(){
        adjH();
        if(!b.style.left||b.style.left==='auto')return;
        var iw=window.innerWidth,ih=window.innerHeight,R=b.getBoundingClientRect();
        if(R.right>iw-4)b.style.left=Math.max(4,iw-R.width-4)+'px';
        if(R.bottom>ih-4)b.style.top=Math.max(4,ih-R.height-4)+'px';
        if(R.left<4)b.style.left='4px'; if(R.top<4)b.style.top='4px';
        b.style.right='auto'; b.style.bottom='auto'; mL=null; mT=null;
    });
    
    // Device Rotation Handler (Snaps UI to correct orientation settings)
    window.addEventListener('orientationchange',function(){
        setTimeout(function(){
            adjH();
            b.style.left='auto'; b.style.top='auto'; b.style.bottom=getB(); b.style.right='20px'; mL=null; mT=null;
            var R=b.getBoundingClientRect();
            if(R.top<10){b.style.bottom='auto';b.style.top='10px'}
            
            // Auto-scroll peek pattern
            setTimeout(function(){var x=g('c-bod'),s=g('c-s');if(x&&s)x.scrollTop=Math.max(0,x.scrollHeight-x.clientHeight-s.offsetHeight-8)},50)
        },300);
    });
    
    // Expand/Collapse Toggle Logic
    var tog=g('c-tog'),wrap=g('c-wrap');
    tog.onclick=function(){
        var isE=(wrap.style.display==='none'),oR=b.getBoundingClientRect();
        if(isE){
            if(b.style.left&&b.style.left!=='auto'){mL=b.style.left;mT=b.style.top}
            wrap.style.display='flex'; tog.innerText='➖'; b.style.width='222px';
            setTimeout(function(){var x=g('c-bod'),s=g('c-s');if(x&&s)x.scrollTop=Math.max(0,x.scrollHeight-x.clientHeight-s.offsetHeight-8)},50)
        }else{
            wrap.style.display='none'; tog.innerText='➕'; b.style.width='auto';
        }
        var nR=b.getBoundingClientRect(),iw=window.innerWidth,ih=window.innerHeight;
        
        // Complex anchor recovery system
        if(b.style.left&&b.style.left!=='auto'){
            if(isE){
                b.style.left=(parseFloat(b.style.left)+(oR.width-nR.width))+'px';
                var fR=b.getBoundingClientRect();
                if(fR.left<4)b.style.left='4px'; else if(fR.right>iw-4)b.style.left=(iw-fR.width-4)+'px';
                if(fR.top<4)b.style.top='4px'; else if(fR.bottom>ih-4)b.style.top=(ih-fR.height-4)+'px';
            }else{
                if(mL!==null&&mT!==null){b.style.left=mL;b.style.top=mT}else{b.style.left=(parseFloat(b.style.left)+(oR.width-nR.width))+'px'}
            }
            b.style.right='auto'; b.style.bottom='auto';
        }else{
            if(isE){
                if(nR.top<4){b.style.bottom='auto';b.style.top='4px'}
            }else{
                b.style.bottom=getB(); b.style.top='auto'; b.style.left='auto'; b.style.right='20px';
            }
        }
    };
    
    // UI Updater (Fires whenever a creator is added/scraped)
    var A=g('c-a'),u=function(){
        var L=o('c_l'),K=o('c_c');
        g('c-t').innerText=L.length; g('c-l').innerText=K.length?K.join(', '):'None';
        A.style.background=K.length?'#222':'#555'; A.style.border=K.length?'1px solid #70f':'1px solid #777'; A.style.opacity=K.length?'1':'0.6';
        if(b.style.bottom==='auto'){var R=b.getBoundingClientRect(),ih=window.innerHeight;if(R.bottom>ih-4)b.style.top=Math.max(4,ih-R.height-4)+'px'}
        setTimeout(function(){var x=g('c-bod'),s=g('c-s');if(x&&s)x.scrollTop=Math.max(0,x.scrollHeight-x.clientHeight-s.offsetHeight-8)},50)
    };
    u();
    
    // Manual 'Add Creator' Button Logic
    g('c-n').onclick=function(){
        var cr=P(); if(!cr)return g('c-m').innerText="Not a profile!";
        var K=o('c_c');
        if(K.indexOf(cr)<0){K.push(cr);w('c_c',K);g('c-m').innerText="Added!";u()}else g('c-m').innerText="Already added!";
    };
    
    // Mass-Scrape Button Logic
    A.onclick=function(){
        var K=o('c_c'); if(!K.length)return g('c-m').innerText="Add a creator!";
        var L=o('c_l'),a=0,lk=d.getElementsByTagName('a'),D=function(f){
            var x=f.toLowerCase();
            for(var j=0;j<K.length;j++)if(x.indexOf('/characters/'+K[j]+'/')!=-1){if(L.indexOf(f)<0){L.push(f);a++}}
        };
        if(location.pathname.indexOf('/characters/')!=-1)D(location.href);
        else for(var i=0;i<lk.length;i++){var h=lk[i].getAttribute('href');if(h&&h.indexOf('/characters/')!=-1)D(h[0]=='/'?"https://chub.ai"+h:h)}
        w('c_l',L); g('c-m').innerText="Found "+a+"!"; u()
    };
    
    // 'Show Links' Modal Menu Logic
    g('c-s').onclick=function(){
        var ls=o('c_l').join('\n'),W=c("div"); W.className="w";
        var T=c("textarea"); T.value=ls; T.className="ta"; W.appendChild(T);
        var B=c("div"); B.className="bx";
        var btn=function(t,k,f){var x=c('button');x.innerText=t;x.className="b "+k;x.style.flex="1";x.onclick=f;B.appendChild(x)};
        btn("Copy","b2",function(e){navigator.clipboard.writeText(ls).then(function(){e.target.innerText="Copied!";e.target.style.background="#4caf50"})});
        btn("Back","b1",function(){W.remove()});
        btn("Exit","b3",function(){W.remove();S.removeItem('c_l');S.removeItem('c_c');b.remove()});
        W.appendChild(B); d.body.appendChild(W);
    };
})()
