# 📜 The Epic 40-Version Developer Log

This tool was engineered over 40 iterations, specifically built to overcome the unique restrictions, security protocols, and hidden limits of mobile web browsers. Here is the history of how I built (with the help of Gemini Pro <3) the ultimate mobile scraping tool.

### 🏗️ Phase 1: The Foundation & The Freeze
• **The Base Idea:** A way to mass-scrape character links from Chub.ai directly on a mobile phone for bulk-importing into SillyTavern without clicking hundreds of links manually. 
• **V1 – V4 (The Popup Era):** The earliest versions successfully scraped the links but relied on native browser popups like `alert()` and `confirm()` to warn the user or show the links. 
    — *The Bug:* Pressing cancel on these popups caused a severe bug in Android Firefox where the "Touch UI thread" completely froze, resulting in a half-rendered black screen where nothing was tappable. 

### 🧊 Phase 2: Overcoming the Freeze
• **V5 (The "No-Freeze" Accumulator):** I completely ditched popups. Instead, I built a custom floating panel that quietly accumulated links into the browser’s temporary memory (`sessionStorage`) as the user navigated from Page 1 to Page 2.
• **V6 – V11 (The Feature Creep):** I expanded the feature set massively. I added "Whitelist" logic so you could scrape multiple specific creators at once without grabbing unwanted bots from sidebars. I added a duplicate catcher and a dedicated UI panel.
• **V12 (The Rock-Solid Base):** The last perfectly stable version before I attempted more advanced UI features.

### 🐉 Phase 3: The "Curse of 13" & Mobile Browser Boss Fights
• **V13 & V14 (The Drag Crash):** I tried to add a "touch-and-drag" feature using Unicode symbols (`✥`) and complex touch math. 
    — *The Bug:* The script silently failed. The browser probably couldn't read the mangled Unicode from the clipboard and panicked.
• **V15 (React Wars):** I stripped the Unicode, but the touch-and-drag math possibly conflicted heavily with Chub's own React framework, causing the browser to silently kill the script again...
• **V16 & V17 (The Teleporter):** To avoid drag math, I added a "Move" button to snap the panel to the 4 corners of the screen. I used a fancy arrow symbol (`↹`), which might have crashed it once more. V17 used plain text but still failed!
    — *The Bug:* I discovered **Clipboard Character Limits**. The script had grown so large that Android was silently chopping off the last few brackets during paste, causing a syntax error.
• **V18 – V20 (The Magic Word):** I aggressively minified the code and reverted to the stable V12 architecture. I made the "Ready!" text an invisible teleporter button. Yeah, it worked!

### ⚔️ Phase 4: The Polish & The Syntax Wars
• **V21 – V24 (The Aesthetics):** I wanted the buttons uniformly sized and text perfectly centered. Making these tiny CSS tweaks kept breaking the script! 
    — *The Bug:* Mobile Firefox proved extremely hostile to modern JavaScript "template literals" (backticks) and dynamically injecting CSS properties (`cssText`) via bookmarklets.
• **V25 (The Old School Edition):** I rewrote the script to avoid backticks, but guess what? It failed again.
    — *The Bug:* Android Firefox's strict security was blocking modern array methods (`Array.from`, `map`, `filter`) when run directly from the URL bar.
• **V26 (The Survivor Edition):** The breakthrough! I replaced every modern function with 1999-era basic ES5 `for` loops. The browser finally surrendered and let the code run perfectly.

### 🎯 Phase 5: The Final Drag Integration
• **V27 (The Drag Returns):** I brought back free-dragging using the ancient ES5 syntax, and it worked smoothly.
• **V28 & V29 (The Clickjacking Block):** I tried attaching the drag sensor directly to the header text to make the UI look clean.
    — *The Bug:* Firefox viewed making raw text a draggable joystick as a malicious "clickjacking" attempt and blocked it.
• **V30 & V31 (The Final Hybrid):** I used a web-dev magic trick: placing an invisible, touchable `div` over the text using `pointer-events: none;`. It looked perfectly clean and dragged flawlessly!
• **V32 (The Masterpiece):** During final bug-testing, I fixed two edge cases: dragging sometimes highlighted the text (causing glitches), and adding multiple creators stretched the panel across the screen. 
    — *The Fix:* I hard-coded the panel width to exactly `222px` so text would cleanly wrap, and added `user-select: none;` to make highlighting impossible.

### 🏆 Phase 6: The Chrome Conquest
• **V33 (The Omnibox Edition):** Android Chrome apparently has a hidden 2,000-character limit when running scripts from the URL bar. V32 was ~4,300 characters... I performed "Hyper-Compression"—injecting CSS stylesheets and shrinking variables—to get the code down to exactly **1,988 characters**. V33 became the universally compatible scraper.

### 💎 Phase 7: Edge Cases & Desktop Polish
• **V34 (The Highlight Fix):** Dragging the panel on desktop browsers accidentally highlighted the background website's text. I added an event preventer to stop the browser's native drag-to-highlight behavior.
• **V35 (The UX Overhaul):** Rebuilt the export popup with 3 distinct options (Copy, Back, Exit) so users wouldn't lose their session by accident. Swapped clunky URL-reading code for highly efficient Regex to stay under the Chrome limit.
• **V36 (The Zero-Flicker Update):** Fixed a longstanding micro-glitch where the panel teleported to the top left of the screen for a split second on the very first drag due to a CSS anchor conflict.
• **V37 (Visual Cues):** Recolored the "Exit" button to a crimson red to clearly indicate a destructive action.
• **V38 (The Context-Aware Scraper):** *The Hub Link Fix.* Scraping individual character cards sometimes accidentally grabbed unrelated bots or rules hubs linked in the character's creator notes. The script was updated to recognize when it is on a specific character page, explicitly ignoring the body text and only grabbing the active URL.

### 🖋️ Phase 8: The Signature Release
• **V39 (The Watermark):** Squeezed in a subtle `© 2026 GentleBurr` watermark beneath the buttons. I had to perform extreme CSS code-golfing on the secondary popup to free up the character space for the hyperlink.
• **V40 (The Easter Egg):** Accidental taps on the watermark on mobile were a UX risk. I removed the standard hyperlink and replaced it with a custom `ondblclick` JavaScript listener. Now, it requires a deliberate double-tap to warp the user to the GitHub repo. Final script size: **1,960 characters**.