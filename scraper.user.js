// ==UserScript==
// @name         Chub Character Link Scraper
// @namespace    https://github.com/GentleBurr/chub-charlink-scraper
// @version      1.2.0
// @description  Mass-scrape Chub character links automatically
// @author       GentleBurr
// @match        *://*.chub.ai/*
// @icon         data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20rx%3D%2220%22%20fill%3D%22%232d004d%22%2F%3E%3Ctext%20x%3D%2250%22%20y%3D%2250%22%20font-size%3D%2250%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%3E%F0%9F%A7%B2%3C%2Ftext%3E%3C%2Fsvg%3E
// @updateURL    https://raw.githubusercontent.com/GentleBurr/chub-charlink-scraper/main/scraper.user.js
// @downloadURL  https://raw.githubusercontent.com/GentleBurr/chub-charlink-scraper/main/scraper.user.js
// @grant        none
// ==/UserScript==

(function(){
    // Setup core variables and shortcuts
    var d = document, 
        S = sessionStorage, 
        J = JSON,
        g = function(i){ return d.getElementById(i); },
        c = function(t){ return d.createElement(t); },
        o = function(k){ return J.parse(S.getItem(k) || '[]'); },
        w = function(k,v){ S.setItem(k, J.stringify(v)); };
    
    // Prevent multiple instances from injecting
    if(g('c-scr')) return;
    
    // Create the main floating UI container
    var b = c('div');
    b.id = 'c-scr';
    
    // CSS Styling with Flexbox armor to prevent overflow and text highlighting
    var css = `
        #c-scr { position:fixed; right:20px; width:auto; box-sizing:border-box; background:#012; color:#eee; padding:12px; border-radius:8px; z-index:99999; box-shadow:0 4px 6px #000; font-family:sans-serif; text-align:center; border:2px solid #70f; touch-action:none; display:flex; flex-direction:column; }
        .b { padding:8px; border-radius:4px; margin-bottom:8px; font-weight:700; color:#eee; cursor:pointer; transition:all 0.6s ease; -webkit-user-select:none; user-select:none; }
        .b1 { background:#222; border:1px solid #888; }
        .b2 { background:#70f; border:none; }
        .b3 { background:#b22; border:none; }
        .t { color:#888; font-size:10px; }
        #c-m { pointer-events:none; -webkit-user-select:none; user-select:none; }
        .w { position:fixed; top:10%; left:10%; width:80%; height:80%; z-index:99999; background:#012; border:2px solid #70f; padding:10px; border-radius:8px; display:flex; flex-direction:column; box-sizing:border-box; }
        .ta { flex:1; background:#222; color:#eee; border:1px solid #888; padding:10px; border-radius:4px; font-size:10px; margin-bottom:10px; }
        .bx { display:flex; gap:5px; }
        .cr { color:#555; font-size:9px; display:block; margin:-2px 0 -5px; cursor:pointer; text-align:left; }
    `;

    var sty = c('style');
    sty.innerHTML = css;
    d.head.appendChild(sty);
    
    // Inject HTML structure (Header, Scrollable Body, Symmetrical Controls, Stacked Footer)
    b.innerHTML = `
        <div id="c-hd" style="cursor:move; padding-bottom:5px; border-bottom:1px solid #70f; text-align:left; display:flex; justify-content:space-between; align-items:center; white-space:nowrap; flex-shrink:0;">
            <b id="c-m" style="margin-right:15px;">Scraper Ready!</b>
            <span id="c-tog" style="cursor:pointer; padding:0 5px; font-size:14px; -webkit-user-select:none; user-select:none;">➕</span>
        </div>
        <div id="c-wrap" style="display:none; flex-direction:column; flex-shrink:1; min-height:0; margin-top:8px;">
            <div id="c-bod" style="overflow-y:auto; overflow-x:hidden; padding-right:4px; flex-shrink:1; min-height:0;">
                <span class="t">Saved: <span id="c-t">0</span></span><br>
                <div class="t" style="margin-bottom:8px; width:100%; word-wrap:break-word;">Creators: <span id="c-l"></span></div>
                
                <div style="display:flex; gap:4px; margin-bottom:8px;">
                    <div id="c-a" class="b" style="flex:1; margin-bottom:0; white-space:nowrap; padding:8px 2px;">+ Scrape Page</div>
                    <div id="c-sing" class="b" style="width:34px; flex-shrink:0; margin-bottom:0; padding:0; display:flex; align-items:center; justify-content:center; background:#444; border:1px solid #777; font-size:14px;" title="Target a single card">🎯</div>
                </div>
                
                <div style="display:flex; gap:4px; margin-bottom:8px;">
                    <div id="c-filt" class="b" style="width:34px; flex-shrink:0; margin-bottom:0; padding:0; display:flex; align-items:center; justify-content:center; background:#444; border:1px solid #777; font-size:14px;" title="Tag Filters">⚙️</div>
                    <div id="c-n" class="b b1" style="flex:1; margin-bottom:0; white-space:nowrap; padding:8px 2px;">+ Add Creator</div>
                </div>
                
                <div id="c-s" class="b b2" style="margin-bottom:0;">Show Links</div>
            </div>
            <div class="cr" style="flex-shrink:0; margin-top:4px; padding-top:4px; border-top:1px solid #333; margin-bottom:-8px; display:flex; justify-content:space-between; align-items:flex-end; line-height:1.2;" ondblclick="window.open('https://github.com/GentleBurr/chub-charlink-scraper')">
                <div>CharLinkScraper<br>© 2026 GentleBurr</div>
                <span>v1.2.0</span>
            </div>
        </div>
    `;
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
    var adjH = function(){ b.style.maxHeight = (window.innerHeight - (window.innerWidth > window.innerHeight ? 20 : 80)) + 'px'; };
    adjH();
    b.style.bottom = getB();
    
    // Drag and Drop State Variables
    var hd = g('c-hd'), act = false, iX = 0, iY = 0, sX = 0, sY = 0, isD = false, mL = null, mT = null, E = function(e){ return e.touches ? e.touches[0] : e; };
    
    // Drag Start (Records initial tap position)
    var st = function(e){
        if(e.target.id === 'c-tog') return;
        e.preventDefault();
        var v = E(e), R = b.getBoundingClientRect();
        iX = v.clientX - R.left; 
        iY = v.clientY - R.top; 
        sX = v.clientX; 
        sY = v.clientY; 
        isD = false; 
        act = true;
    };
    var end = function(){ act = false; };
    
    // Drag Move (Includes 5px deadzone to prevent accidental anchor stripping)
    var mv = function(e){
        if(!act) return;
        var v = E(e);
        if(!isD){
            if(Math.abs(v.clientX - sX) > 5 || Math.abs(v.clientY - sY) > 5){ isD = true; mL = null; mT = null; } else return;
        }
        if(e.cancelable) e.preventDefault();
        var nx = v.clientX - iX, ny = v.clientY - iY, iw = window.innerWidth, ih = window.innerHeight, bw = b.offsetWidth, bh = b.offsetHeight;
        
        // Window boundaries forcefield
        if(nx < 4) nx = 4; 
        if(ny < 4) ny = 4; 
        if(nx + bw > iw - 4) nx = iw - bw - 4; 
        if(ny + bh > ih - 4) ny = ih - bh - 4;
        
        b.style.left = nx + 'px'; 
        b.style.top = ny + 'px'; 
        b.style.right = 'auto'; 
        b.style.bottom = 'auto';
    };
    
    // Attach Event Listeners
    hd.addEventListener('touchstart', st, {passive:false}); 
    hd.addEventListener('mousedown', st);
    d.addEventListener('touchend', end); 
    d.addEventListener('mouseup', end);
    d.addEventListener('touchmove', mv, {passive:false}); 
    d.addEventListener('mousemove', mv);
    
    // Window Resize Handler (Catches mobile virtual keyboard)
    window.addEventListener('resize', function(){
        adjH();
        if(!b.style.left || b.style.left === 'auto') return;
        var iw = window.innerWidth, ih = window.innerHeight, R = b.getBoundingClientRect();
        if(R.right > iw - 4) b.style.left = Math.max(4, iw - R.width - 4) + 'px';
        if(R.bottom > ih - 4) b.style.top = Math.max(4, ih - R.height - 4) + 'px';
        if(R.left < 4) b.style.left = '4px'; 
        if(R.top < 4) b.style.top = '4px';
        b.style.right = 'auto'; 
        b.style.bottom = 'auto'; 
        mL = null; 
        mT = null;
    });
    
    // Device Rotation Handler (Snaps UI to correct orientation settings)
    window.addEventListener('orientationchange', function(){
        setTimeout(function(){
            adjH();
            b.style.left = 'auto'; 
            b.style.top = 'auto'; 
            b.style.bottom = getB(); 
            b.style.right = '20px'; 
            mL = null; 
            mT = null;
            var R = b.getBoundingClientRect();
            if(R.top < 10){ b.style.bottom = 'auto'; b.style.top = '10px'; }
            
            // Auto-scroll peek pattern
            setTimeout(function(){
                var x = g('c-bod'), s = g('c-s');
                if(x && s) x.scrollTop = Math.max(0, x.scrollHeight - x.clientHeight - s.offsetHeight - 8);
            }, 50);
        }, 300);
    });
    
    // Expand/Collapse Toggle Logic
    var tog = g('c-tog'), wrap = g('c-wrap');
    tog.onclick = function(){
        var isE = (wrap.style.display === 'none'), oR = b.getBoundingClientRect();
        if(isE){
            if(b.style.left && b.style.left !== 'auto'){ mL = b.style.left; mT = b.style.top; }
            wrap.style.display = 'flex'; 
            tog.innerText = '➖'; 
            b.style.width = '222px';
            setTimeout(function(){
                var x = g('c-bod'), s = g('c-s');
                if(x && s) x.scrollTop = Math.max(0, x.scrollHeight - x.clientHeight - s.offsetHeight - 8);
            }, 50);
        } else {
            wrap.style.display = 'none'; 
            tog.innerText = '➕'; 
            b.style.width = 'auto';
        }
        var nR = b.getBoundingClientRect(), iw = window.innerWidth, ih = window.innerHeight;
        
        // Complex anchor recovery system
        if(b.style.left && b.style.left !== 'auto'){
            if(isE){
                b.style.left = (parseFloat(b.style.left) + (oR.width - nR.width)) + 'px';
                var fR = b.getBoundingClientRect();
                if(fR.left < 4) b.style.left = '4px'; 
                else if(fR.right > iw - 4) b.style.left = (iw - fR.width - 4) + 'px';
                if(fR.top < 4) b.style.top = '4px'; 
                else if(fR.bottom > ih - 4) b.style.top = (ih - fR.height - 4) + 'px';
            } else {
                if(mL !== null && mT !== null){ 
                    b.style.left = mL; 
                    b.style.top = mT; 
                } else { 
                    b.style.left = (parseFloat(b.style.left) + (oR.width - nR.width)) + 'px'; 
                }
            }
            b.style.right = 'auto'; 
            b.style.bottom = 'auto';
        } else {
            if(isE){
                if(nR.top < 4){ b.style.bottom = 'auto'; b.style.top = '4px'; }
            } else {
                b.style.bottom = getB(); 
                b.style.top = 'auto'; 
                b.style.left = 'auto'; 
                b.style.right = '20px';
            }
        }
    };
    
    // UI Updater (Fires whenever a creator is added/scraped)
    var A = g('c-a'), u = function(){
        var L = o('c_l'), K = o('c_c');
        g('c-t').innerText = L.length; 
        
        // Dynamically render interactive creator tags
        var cl = g('c-l'); 
        cl.innerHTML = '';
        if(K.length){
            for(var i=0; i<K.length; i++){
                (function(cr){
                    var s = c('span');
                    s.style.cssText = 'display:inline-block; background:#222; border:1px solid #444; padding:2px 5px; border-radius:4px; margin:2px 2px;';
                    s.innerHTML = cr + ' <span style="color:#f44;cursor:pointer;font-weight:bold;margin-left:3px;" title="Remove">×</span>';
                    s.lastChild.onclick = function(){
                        if(confirm("Remove '" + cr + "' from the active creator list?")){
                            var nK = o('c_c'), idx = nK.indexOf(cr);
                            if(idx > -1){
                                nK.splice(idx, 1);
                                w('c_c', nK);
                                u(); 
                            }
                        }
                    };
                    cl.appendChild(s);
                })(K[i]);
            }
        } else {
            cl.innerText = 'None';
        }
        
        A.style.background = K.length ? '#222' : '#555'; 
        A.style.border = K.length ? '1px solid #70f' : '1px solid #777'; 
        A.style.opacity = K.length ? '1' : '0.6';
        
        if(b.style.bottom === 'auto'){
            var R = b.getBoundingClientRect(), ih = window.innerHeight;
            if(R.bottom > ih - 4) b.style.top = Math.max(4, ih - R.height - 4) + 'px';
        }
        setTimeout(function(){
            var x = g('c-bod'), s = g('c-s');
            if(x && s) x.scrollTop = Math.max(0, x.scrollHeight - x.clientHeight - s.offsetHeight - 8);
        }, 50);
    }; 
    u();

    // Manual 'Add Creator' Button Logic
    g('c-n').onclick = function(){
        var cr = P(); 
        if(!cr) return g('c-m').innerText = "Not a profile!";
        var K = o('c_c');
        if(K.indexOf(cr) < 0){
            K.push(cr);
            w('c_c', K);
            g('c-m').innerText = "Added!";
            u();
        } else {
            g('c-m').innerText = "Already added!";
        }
    };

    // Extract creator name from current URL
    var P = function(){
        var m = location.pathname.match(/\/(users|characters)\/([^\/]+)/i);
        return m ? m[2].toLowerCase() : null;
    };
    
    // Mass-Scrape Button Logic (With built-in Tag Engine)
    A.onclick = function(){
        var K = o('c_c'); 
        if(!K.length) return g('c-m').innerText = "Add a creator!";
        
        // Retrieve tag filters from sessionStorage
        var incStr = (S.getItem('c_ft_inc')||'').toLowerCase().split(',').map(function(s){return s.trim()}).filter(function(s){return s});
        var excStr = (S.getItem('c_ft_exc')||'').toLowerCase().split(',').map(function(s){return s.trim()}).filter(function(s){return s});
        
        var L = o('c_l'), a = 0, lk = d.getElementsByTagName('a');
        
        // Scraping execution function
        var D = function(f, node){
            var x = f.toLowerCase(), matchesCreator = false;
            for(var j=0; j<K.length; j++){
                if(x.indexOf('/characters/' + K[j] + '/') != -1){ matchesCreator = true; break; }
            }
            if(!matchesCreator) return;
            
            // --- TAG FILTERING LOGIC ---
            if(node && (incStr.length > 0 || excStr.length > 0)){
                // Rip raw HTML tags from the DOM node
                var tags = Array.from(node.querySelectorAll('.ant-tag')).map(function(t){ return t.innerText.trim().toLowerCase(); });
                
                // OR Logic: Fails if NONE of the 'Should Include' tags match
                if(incStr.length > 0){
                    var hasAny = false; 
                    for(var k=0; k<incStr.length; k++){
                        if(tags.some(function(t){ return t === incStr[k]; })) { hasAny = true; break; }
                    }
                    if(!hasAny) return; 
                }
                
                // AND/Absolute Logic: Fails if ANY of the 'Must Exclude' tags match
                if(excStr.length > 0){
                    var hasExc = false;
                    for(var k=0; k<excStr.length; k++){
                        if(tags.some(function(t){ return t === excStr[k]; })) { hasExc = true; break; }
                    }
                    if(hasExc) return; 
                }
            }
            // ---------------------------

            if(L.indexOf(f) < 0){ L.push(f); a++; }
        };
        
        // Distinguish between viewing a single character vs a list
        if(location.pathname.indexOf('/characters/') != -1) {
            D(location.href, d.body);
        } else {
            for(var i=0; i<lk.length; i++){
                var h = lk[i].getAttribute('href');
                if(h && h.indexOf('/characters/') != -1) D(h[0] == '/' ? "https://chub.ai" + h : h, lk[i]);
            }
        }
        
        w('c_l', L); 
        g('c-m').innerText = "Found " + a + "!"; 
        u();
    };
    
    // Target Mode Logic: Single card sniper
    var sMode = false, singBtn = g('c-sing');
    singBtn.onclick = function(){
        sMode = !sMode;
        if(sMode){
            singBtn.style.background = "#70f"; 
            singBtn.style.borderColor = "#a4f"; 
            g('c-m').innerText = "Select a card...";
        } else {
            singBtn.style.background = "#444"; 
            singBtn.style.borderColor = "#777"; 
            g('c-m').innerText = "Targeting cancelled.";
        }
    };
    
    // Global interceptor for Target Mode (using capture phase to beat React routers)
    d.addEventListener('click', function(e){
        if(!sMode) return;
        if(e.target.closest('#c-scr')) return; // Ignore clicks inside the scraper UI
        
        e.preventDefault(); 
        e.stopPropagation(); // Halt standard navigation
        
        var a = e.target.closest('a');
        if(a && a.href && a.href.indexOf('/characters/') != -1){
            var h = a.href, L = o('c_l');
            if(h[0] == '/') h = "https://chub.ai" + h;
            
            if(L.indexOf(h) < 0){
                L.push(h); 
                w('c_l', L); 
                g('c-m').innerText = "Card added!"; 
                u();
            } else {
                g('c-m').innerText = "Already saved!";
            }
        } else {
            g('c-m').innerText = "Targeting cancelled.";
        }
        
        // Disengage target mode
        sMode = false; 
        singBtn.style.background = "#444"; 
        singBtn.style.borderColor = "#777";
    }, true);

    // Tag Filters Modal Menu Logic
    g('c-filt').onclick = function(){
        var oldW = d.querySelector('.w'); if(oldW) oldW.remove(); // Prevent modal stacking
        var W = c("div"); W.className = "w";
        
        // Center modal dynamically
        W.style.top = '50%';
        W.style.left = '50%';
        W.style.transform = 'translate(-50%, -50%)';
        W.style.height = 'auto';
        W.style.maxHeight = '85vh';
        W.style.overflowY = 'auto';

        W.innerHTML = '<div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:15px;"><div style="font-weight:bold; color:#eee; font-size:14px; white-space:nowrap;">⚙️ Tag Filters</div><div style="font-size:9px; color:#aaa; text-align:right; margin-left:10px;">Only applies to "Scrape Page".</div></div>';

        // Helper to draw and redraw interactive filter tags
        var renderTags = function(container, key) {
            container.innerHTML = '';
            var tags = (S.getItem(key)||'').split(',').map(function(s){return s.trim()}).filter(function(s){return s});
            if(tags.length === 0) {
                container.innerHTML = '<span class="t">None</span>';
                return;
            }
            for(var i=0; i<tags.length; i++){
                (function(tag){
                    var s = c('span');
                    s.style.cssText = 'display:inline-block; background:#222; border:1px solid #444; padding:2px 5px; border-radius:4px; margin:2px 2px; font-size:11px; color:#eee;';
                    s.innerHTML = tag + ' <span style="color:#f44;cursor:pointer;font-weight:bold;margin-left:3px;" title="Remove">×</span>';
                    s.lastChild.onclick = function(){
                        var curTags = (S.getItem(key)||'').split(',').map(function(x){return x.trim()}).filter(function(x){return x});
                        var idx = curTags.indexOf(tag);
                        if(idx > -1) {
                            curTags.splice(idx, 1);
                            S.setItem(key, curTags.join(','));
                            renderTags(container, key); 
                        }
                    };
                    container.appendChild(s);
                })(tags[i]);
            }
        };

        // Helper to construct a complete filter section
        var buildSection = function(lbl, key) {
            var sec = c('div'); sec.style.marginBottom = '15px';
            var l = c('div'); l.style.cssText = "font-size:11px; text-align:left; margin-bottom:4px; color:#ccc;"; l.innerText = lbl;
            
            var row = c('div'); row.style.cssText = "display:flex; gap:5px; margin-bottom:5px;";
            var i = c('input'); i.type = "text"; i.style.cssText = "flex:1; background:#222; color:#eee; border:1px solid #888; padding:5px; border-radius:4px; font-size:12px;";
            var addBtn = c('button'); addBtn.innerText = "➕"; addBtn.className = "b"; addBtn.style.cssText = "margin:0; padding:0 12px; flex-shrink:0; display:flex; align-items:center; justify-content:center; background:#222; border:1px solid #777;";
            
            row.appendChild(i); row.appendChild(addBtn);
            
            var tagBox = c('div'); tagBox.style.cssText = "text-align:left; min-height:20px;";
            
            addBtn.onclick = function() {
                var newTags = i.value.split(',').map(function(x){return x.trim()}).filter(function(x){return x});
                if(newTags.length > 0) {
                    var curTags = (S.getItem(key)||'').split(',').map(function(x){return x.trim()}).filter(function(x){return x});
                    for(var j=0; j<newTags.length; j++){
                        if(curTags.indexOf(newTags[j]) === -1) curTags.push(newTags[j]); // Prevent duplicates
                    }
                    S.setItem(key, curTags.join(','));
                    i.value = ''; 
                    renderTags(tagBox, key);
                }
            };            
            
            sec.appendChild(l); sec.appendChild(row); sec.appendChild(tagBox);
            renderTags(tagBox, key);
            W.appendChild(sec);
            return sec; 
        };

        var incSec = buildSection("Should Include:", 'c_ft_inc');
        incSec.style.paddingBottom = "12px";
        incSec.style.borderBottom = "1px solid #444";
        incSec.style.marginBottom = "12px";
        
        var excSec = buildSection("Must Exclude:", 'c_ft_exc');
        excSec.style.marginBottom = "20px";
        
        var B = c("div"); B.className = "bx";
        var btn = function(t, k, f){ var x = c('button'); x.innerText = t; x.className = "b " + k; x.style.flex = "1"; x.onclick = f; B.appendChild(x); return x; };
        
        btn("Close", "b1", function(){ W.remove(); });
        W.appendChild(B); d.body.appendChild(W);
    };

    // 'Show Links' Export Modal Menu Logic
    g('c-s').onclick = function(){
        var oldW = d.querySelector('.w'); if(oldW) oldW.remove(); 
        var ls = o('c_l').join('\n'), W = c("div");
        W.className = "w";
        
        var T = c("textarea"); 
        T.value = ls; 
        T.className = "ta"; 
        W.appendChild(T);
        
        var tl = c("div"); 
        tl.style.cssText = "display:flex; justify-content:space-between; align-items:center; font-size:12px; margin-bottom:10px; color:#ccc;";
        tl.innerHTML = '<label style="cursor:pointer; display:flex; align-items:center; gap:5px;"><input type="checkbox" id="c-ac" style="margin:0;"> Auto-clear on export</label>';
      
        // Inline Clear Links functionality
        var cb = c("button"); 
        cb.innerText = "🗑️ Clear Links"; 
        cb.style.cssText = "background:none; border:none; color:#f44; cursor:pointer; font-size:12px; padding:0;";
        cb.onclick = function(){
            if(confirm("Clear all scraped links?")){
                T.value = ""; 
                w('c_l', []); 
                g('c-t').innerText = "0"; 
                g('c-m').innerText = "Links cleared!";
            }
        };
        tl.appendChild(cb); 
        W.appendChild(tl);
        
        var B = c("div"); 
        B.className = "bx";
        
        var btn = function(t, k, f){
            var x = c('button');
            x.innerText = t;
            x.className = "b " + k;
            x.style.flex = "1";
            x.onclick = f;
            B.appendChild(x);
            return x;
        };
        
        var ac = function(){
            if(g('c-ac').checked){
                T.value = ""; 
                w('c_l', []); 
                g('c-t').innerText = "0";
            }
        };
        
        // Export logic: Clipboard
        btn("Copy", "b2", function(e){
            var doCopy = function() {
                e.target.innerText = "Copied!"; 
                e.target.style.background = "#4caf50"; 
                ac();
                setTimeout(function(){ 
                    e.target.innerText = "Copy"; 
                    e.target.style.background = ""; 
                }, 3000);
            };
            navigator.clipboard.writeText(T.value || "").then(doCopy).catch(doCopy);
        });
    
        // Export logic: .txt blob download
        btn(".txt", "b2", function(e){
            var a = c("a");
            a.href = URL.createObjectURL(new Blob([T.value || ""], {type:"text/plain"}));
            a.download = "chub_links.txt";
            a.click();
            e.target.innerText = "Saved!"; 
            e.target.style.background = "#4caf50"; 
            ac();
            setTimeout(function(){ 
                e.target.innerText = ".txt"; 
                e.target.style.background = ""; 
            }, 3000);
        });
        
        btn("Back", "b1", function(){ W.remove(); });
        
        // Compact Exit Button
        var extBtn = btn("❌", "b3", function(){
            W.remove();
            S.removeItem('c_l');
            S.removeItem('c_c');
            b.remove();
        });
        
        extBtn.style.flex = "0 0 40px";
        extBtn.style.padding = "0";
        extBtn.style.display = "flex";
        extBtn.style.alignItems = "center";
        extBtn.style.justifyContent = "center";
        extBtn.title = "Exit Scraper entirely";
        
        W.appendChild(B); 
        d.body.appendChild(W);
    };
})();
