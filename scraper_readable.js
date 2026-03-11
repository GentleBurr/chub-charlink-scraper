/*
 | Chub-CharLink-Scraper
 | Version: V40 (Readable Source Code)
 | Author: GentleBurr (with a little help from Gemini Pro <3)
 | License: MIT
 | * Note: This file is for educational/review purposes. 
 | To actually use the scraper, please copy the compressed bookmarklet version from scraper.js!
 */

(function() {
    // 1. Helper Variables & Functions
    var d = document;
    var S = sessionStorage;
    var J = JSON;
    
    var getEl = function(id) { return d.getElementById(id); };
    var createEl = function(tag) { return d.createElement(tag); };
    var loadMem = function(key) { return J.parse(S.getItem(key) || '[]'); };
    var saveMem = function(key, val) { S.setItem(key, J.stringify(val)); };

    // Prevent multiple panels from spawning
    if (getEl('c-scr')) return;

    // Extract the creator-name from the current Chub URL using Regex
    var getCreatorFromUrl = function() {
        var match = location.pathname.match(/\/(users|characters)\/([^\/]+)/i);
        return match ? match[2].toLowerCase() : null;
    };

    // 2. Build the Main UI Panel
    var panel = createEl('div');
    panel.id = 'c-scr';

    // Inject all CSS styling via a single <style> block to save space
    var css = `
        #c-scr { position:fixed; bottom:20px; right:20px; width:222px; box-sizing:border-box; background:#012; color:#eee; padding:15px; border-radius:8px; z-index:99999; box-shadow:0 4px 6px #000; font-family:sans-serif; text-align:center; border:2px solid #70f; touch-action:none; }
        .b { padding:8px; border-radius:4px; margin-bottom:8px; font-weight:700; color:#eee; cursor:pointer; }
        .b1 { background:#222; border:1px solid #888; }
        .b2 { background:#70f; border:none; }
        .b3 { background:#b22; border:none; }
        .t { color:#888; font-size:10px; }
        #c-m { pointer-events:none; -webkit-user-select:none; user-select:none; }
        .w { position:fixed; top:10%; left:10%; width:80%; height:80%; z-index:99999; background:#012; border:2px solid #70f; padding:10px; border-radius:8px; display:flex; flex-direction:column; box-sizing:border-box; }
        .ta { flex:1; background:#222; color:#eee; border:1px solid #888; padding:10px; border-radius:4px; font-size:10px; margin-bottom:10px; }
        .bx { display:flex; gap:10px; }
        .cr { color:#555; font-size:9px; display:block; margin:-2px 0 -5px; cursor:pointer; }
    `;
    
    var styleTag = createEl('style');
    styleTag.innerHTML = css;
    d.head.appendChild(styleTag);

    // Populate the Panel HTML
    panel.innerHTML = 
        '<div id="c-hd" style="cursor:move;padding-bottom:5px;border-bottom:1px solid #70f;margin-bottom:8px"><b id="c-m">Ready!</b></div>' +
        '<span class="t">Saved: <span id="c-t">0</span></span><br>' +
        '<div class="t" style="margin-bottom:8px;width:100%;word-wrap:break-word">Creators: <span id="c-l"></span></div>' +
        '<div id="c-a" class="b">+ Scrape This Page</div>' +
        '<div id="c-n" class="b b1">+ Add Current Creator</div>' +
        '<div id="c-s" class="b b2">Show Links</div>' +
        '<div class="cr" ondblclick="window.open(\'https://github.com/GentleBurr/chub-charlink-scraper\')">© 2026 GentleBurr</div>';
    d.body.appendChild(panel);

    // 3. The "Drag-and-Drop" Engine
    var header = getEl('c-hd'), isDragging = false, startX = 0, startY = 0;
    
    var getEvent = function(e) { return e.touches ? e.touches[0] : e; };
    
    var dragStart = function(e) {
        e.preventDefault(); // Prevents desktop-browser text highlighting
        var touch = getEvent(e), rect = panel.getBoundingClientRect();
        
        // Zero-Flicker Math: Lock top/left coords before dropping bottom/right anchors
        panel.style.left = rect.left + 'px';
        panel.style.top = rect.top + 'px';
        panel.style.bottom = panel.style.right = 'auto';
        
        startX = touch.clientX - rect.left;
        startY = touch.clientY - rect.top;
        isDragging = true;
    };
    
    var dragEnd = function() { isDragging = false; };
    
    var dragMove = function(e) {
        if (!isDragging) return;
        if (e.cancelable) e.preventDefault();
        panel.style.left = (getEvent(e).clientX - startX) + 'px';
        panel.style.top = (getEvent(e).clientY - startY) + 'px';
    };

    // Attach Drag Listeners for Mobile and Desktop
    header.addEventListener('touchstart', dragStart, {passive: false});
    header.addEventListener('mousedown', dragStart);
    d.addEventListener('touchend', dragEnd);
    d.addEventListener('mouseup', dragEnd);
    d.addEventListener('touchmove', dragMove, {passive: false});
    d.addEventListener('mousemove', dragMove);

    // 4. Core Logic: Updates and UI Refresh
    var btnScrape = getEl('c-a');
    
    var updateUI = function() {
        var links = loadMem('c_l'), creators = loadMem('c_c');
        getEl('c-t').innerText = links.length;
        getEl('c-l').innerText = creators.length ? creators.join(', ') : 'None';
        
        // Disable/Enable scrape-button visually based on Whitelist
        btnScrape.style.background = creators.length ? '#222' : '#555';
        btnScrape.style.border = creators.length ? '1px solid #70f' : '1px solid #777';
        btnScrape.style.opacity = creators.length ? '1' : '0.6';
    };
    updateUI();

    // 5. Button: Add Creator to Whitelist
    getEl('c-n').onclick = function() {
        var currentCreator = getCreatorFromUrl();
        if (!currentCreator) return getEl('c-m').innerText = "Not profile!";
        
        var creators = loadMem('c_c');
        if (creators.indexOf(currentCreator) < 0) {
            creators.push(currentCreator);
            saveMem('c_c', creators);
            getEl('c-m').innerText = "Added!";
            updateUI();
        } else {
            getEl('c-m').innerText = "In list!";
        }
    };

    // 6. Button: Scrape Links
    btnScrape.onclick = function() {
        var creators = loadMem('c_c');
        if (!creators.length) return getEl('c-m').innerText = "Add creator!";
        
        var savedLinks = loadMem('c_l'), newFoundCount = 0;
        var pageLinks = d.getElementsByTagName('a');
        
        // Link Processor & Duplicate Catcher
        var processLink = function(rawLink) {
            var lowerLink = rawLink.toLowerCase();
            // Check if link matches ANY Creator in our Whitelist
            for (var j = 0; j < creators.length; j++) {
                if (lowerLink.indexOf('/characters/' + creators[j] + '/') !== -1) {
                    // Check for duplicates
                    if (savedLinks.indexOf(rawLink) < 0) {
                        savedLinks.push(rawLink);
                        newFoundCount++;
                    }
                }
            }
        };

        // Context-Aware Scanning: If on a specific character card, ONLY scan that card's URL (Ignores other links)
        if (location.pathname.indexOf('/characters/') !== -1) {
            processLink(location.href);
        } else {
            // If on a main page, scan every link on the screen
            for (var i = 0; i < pageLinks.length; i++) {
                var href = pageLinks[i].getAttribute('href');
                if (href && href.indexOf('/characters/') !== -1) {
                    var fullUrl = href[0] === '/' ? "https://chub.ai" + href : href;
                    processLink(fullUrl);
                }
            }
        }
        
        saveMem('c_l', savedLinks);
        getEl('c-m').innerText = "Found " + newFoundCount + "!";
        updateUI();
    };

    // 7. Button: Export and Show Links
    getEl('c-s').onclick = function() {
        var rawTextLinks = loadMem('c_l').join('\n');
        
        var popup = createEl("div");
        popup.className = "w"; // Uses pre-injected CSS class
        
        var textBox = createEl("textarea");
        textBox.value = rawTextLinks;
        textBox.className = "ta";
        popup.appendChild(textBox);
        
        var buttonBox = createEl("div");
        buttonBox.className = "bx";
        
        // Dynamic Button Builder for the Popup
        var createBtn = function(text, colorClass, clickAction) {
            var btn = createEl('button');
            btn.innerText = text;
            btn.className = "b " + colorClass;
            btn.style.flex = "1";
            btn.onclick = clickAction;
            buttonBox.appendChild(btn);
        };

        createBtn("Copy", "b2", function(e) {
            navigator.clipboard.writeText(rawTextLinks).then(function() {
                e.target.innerText = "Copied!";
                e.target.style.background = "#4caf50";
            });
        });
        
        createBtn("Back", "b1", function() { popup.remove(); });
        
        createBtn("Exit", "b3", function() {
            popup.remove();
            S.removeItem('c_l');
            S.removeItem('c_c');
            panel.remove();
        });
        
        popup.appendChild(buttonBox);
        d.body.appendChild(popup);
    };
})();