# 📜 Epic Developer Log & Changelog

This tool was engineered over dozens of iterations, specifically built to overcome the unique restrictions, security protocols, and hidden limits of mobile web browsers. Here is the history of how the ultimate mobile scraping tool was built.

### 🧪 Development Builds (Bleeding Edge)
For those who want to test the latest unreleased features before they hit the main stable branch, you can use the Dev Branch hosted on GitHub Gists.

**The Bookmarklet Way:**
Create a new bookmark on your mobile browser and paste this exactly into the URL field:

```javascript
javascript:(function(){fetch('https://gist.githubusercontent.com/GentleBurr/17b2cd8f238169fa2048d50ba31aef7b/raw/scraper-dev.user.js').then(r=>r.text()).then(t=>{var s=document.createElement('script');s.text=t;document.body.appendChild(s)})})();
```

**The Monkey Way:**
Click the link below to automatically inject the development script into Tampermonkey or Violentmonkey:

* [Install Dev Build](https://gist.githubusercontent.com/GentleBurr/17b2cd8f238169fa2048d50ba31aef7b/raw/scraper-dev.user.js)

---

### 🏗️ Phase 1: The Foundation & The Freeze

• **The Base Idea:** A way to mass-scrape character links from Chub.ai directly on a mobile phone for bulk-importing into SillyTavern without clicking hundreds of links manually.

• **V1 – V4 (The Popup Era):** The earliest versions successfully scraped the links but relied on native browser popups like `alert()` and `confirm()` to warn the user or show the links.

> *The Bug:* Pressing cancel on these popups caused a severe bug in Android Firefox where the "Touch UI thread" completely froze, resulting in a half-rendered black screen where nothing was tappable.

### 🧊 Phase 2: Overcoming the Freeze

• **V5 (The "No-Freeze" Accumulator):** Completely ditched popups. Instead, built a custom floating panel that quietly accumulated links into the browser’s temporary memory (`sessionStorage`) as the user navigated from Page 1 to Page 2.

• **V6 – V11 (The Feature Creep):** Expanded the feature set massively. Added "Whitelist" logic so you could scrape multiple specific creators at once without grabbing unwanted bots from sidebars. Added a duplicate catcher and a dedicated UI panel.

• **V12 (The Rock-Solid Base):** The last perfectly stable version before attempting more advanced UI features.

### 🐉 Phase 3: The "Curse of 13" & Mobile Browser Boss Fights

• **V13 & V14 (The Drag Crash):** Tried to add a "touch-and-drag" feature using Unicode symbols (`✥`) and complex touch math.

> *The Bug:* The script silently failed. The browser probably couldn't read the mangled Unicode from the clipboard and panicked.

• **V15 (React Wars):** Stripped the Unicode, but the touch-and-drag math possibly conflicted heavily with Chub's own React framework, causing the browser to silently kill the script again.

• **V16 & V17 (The Teleporter):** To avoid drag math, added a "Move" button to snap the panel to the 4 corners of the screen. Used a fancy arrow symbol (`↹`), which might have crashed it once more. V17 used plain text but still failed!

> *The Bug:* Discovered **Clipboard Character Limits**. The script had grown so large that Android was silently chopping off the last few brackets during paste, causing a syntax error.

• **V18 – V20 (The Magic Word):** Aggressively minified the code and reverted to the stable V12 architecture. Made the "Ready!" text an invisible teleporter button.

### ⚔️ Phase 4: The Polish & The Syntax Wars

• **V21 – V24 (The Aesthetics):** Wanted the buttons uniformly sized and text perfectly centered. Making these tiny CSS tweaks kept breaking the script!

> *The Bug:* Mobile Firefox proved extremely hostile to modern JavaScript "template literals" (backticks) and dynamically injecting CSS properties (`cssText`) via bookmarklets.

• **V25 (The Old School Edition):** Rewrote the script to avoid backticks, but it failed again.

> *The Bug:* Android Firefox's strict security was blocking modern array methods (`Array.from`, `map`, `filter`) when run directly from the URL bar.
    
• **V26 (The Survivor Edition):** The breakthrough! Replaced every modern function with 1999-era basic ES5 `for` loops. The browser finally surrendered and let the code run perfectly.

### 🎯 Phase 5: The Final Drag Integration

• **V27 (The Drag Returns):** Brought back free-dragging using the ancient ES5 syntax, and it worked smoothly.

• **V28 & V29 (The Clickjacking Block):** Tried attaching the drag sensor directly to the header text to make the UI look clean.

> *The Bug:* Firefox viewed making raw text a draggable joystick as a malicious "clickjacking" attempt and blocked it.

• **V30 & V31 (The Final Hybrid):** Used a web-dev magic trick: placing an invisible, touchable `div` over the text using `pointer-events: none;`. It looked perfectly clean and dragged flawlessly!

• **V32 (The Masterpiece):** During final bug-testing, fixed two edge cases: dragging sometimes highlighted the text (causing glitches), and adding multiple creators stretched the panel across the screen.

> *The Fix:* Hard-coded the panel width to exactly `222px` so text would cleanly wrap, and added `user-select: none;` to make highlighting impossible.

### 🏆 Phase 6: The Chrome Conquest

• **V33 (The Omnibox Edition):** Android Chrome apparently has a hidden 2,000-character limit when running scripts from the URL bar. V32 was ~4,300 characters. Performed "Hyper-Compression"—injecting CSS stylesheets and shrinking variables—to get the code down to exactly **1,988 characters**. V33 became the universally compatible scraper.

### 💎 Phase 7: Edge Cases & Desktop Polish

• **V34 (The Highlight Fix):** Dragging the panel on desktop browsers accidentally highlighted the background website's text. Added an event preventer to stop the browser's native drag-to-highlight behavior.

• **V35 (The UX Overhaul):** Rebuilt the export popup with 3 distinct options (Copy, Back, Exit) so users wouldn't lose their session by accident. Swapped clunky URL-reading code for highly efficient Regex to stay under the Chrome limit.

• **V36 (The Zero-Flicker Update):** Fixed a longstanding micro-glitch where the panel teleported to the top left of the screen for a split second on the very first drag due to a CSS anchor conflict.

• **V37 (Visual Cues):** Recolored the "Exit" button to a crimson red to clearly indicate a destructive action.

• **V38 (The Context-Aware Scraper):** *The Hub Link Fix.* Scraping individual character cards sometimes accidentally grabbed unrelated bots or rules hubs linked in the character's creator notes. The script was updated to recognize when it is on a specific character page, explicitly ignoring the body text and only grabbing the active URL.

### 🖋️ Phase 8: The Signature Release

• **V39 (The Watermark):** Squeezed in a subtle `© 2026 GentleBurr` watermark beneath the buttons. Had to perform extreme CSS code-golfing on the secondary popup to free up the character space for the hyperlink.

• **V40 (The Easter Egg):** Accidental taps on the watermark on mobile were a UX risk. Removed the standard hyperlink and replaced it with a custom `ondblclick` JavaScript listener. Now, it requires a deliberate double-tap to warp the user to the GitHub repo. Final script size: **1,960 characters**.

### 🧩 Phase 9: The Flexbox & UI Engineering Era

• **v1.0.1 – v1.0.20 (The Flexbox Refactoring):** Transitioned the hardcoded dimensions into dynamic Flexbox layouts to prepare for complex overflow management. Encountered extensive issues with inner elements bleeding through the bottom of the container on smaller screens.

• **v1.0.21 (The Sticky Footer):** The Goal was to keep the copyright line permanently visible at the bottom while allowing a massive list of creators to scroll independently above it.

> *The Fix:* Separated the copyright line from the buttons. Wrapped the buttons and creator text in a scrollable `div`, locked the copyright line directly underneath it with `flex-shrink: 0`, and reclaimed pixels by reducing the outer padding from `15px` to `12px`.

• **v1.0.22 (The Compact Footer):** Lowered the overall height and padding of the sticky footer dividing line without changing the font size. This saved critical screen real estate, especially when operating in mobile landscape mode.

• **v1.0.23 (The Downward Growth Bug):**
Because the panel stripped its `bottom` anchor and relied on a `top` coordinate when dragged, adding new creators caused the panel to dynamically grow *downwards*, clipping directly into the Android bottom navigation bar.

> *The Fix:* Engineered a dynamic content nudge. The script now calculates boundaries immediately upon updating the text list and instantly shoves the panel upwards by the required pixel amount to accommodate its new size.

• **v1.0.24 (The Action-First Scroll):**
When the creator list grew too long, opening the panel confronted the user with a massive wall of text, forcing them to manually scroll down to find the action buttons.

> *The Fix:* Injected an auto-scroll command (`scrollTop = scrollHeight`) that triggers after a 50ms DOM calculation delay whenever the panel expands, rotates, or adds a creator. The action buttons are now always the first thing in view.

• **v1.0.25 (The "Peek" Pattern):** *The Refinement:* Scrolling to the absolute bottom hid the creator whitelist text entirely, removing visual context.

> *The Fix:* Updated the auto-scroll math to subtract the exact pixel height of the "Show Links" button. The panel now scrolls down just enough to leave the bottom button perfectly out of sight underneath the fold, providing an intuitive, frictionless hint that the container is scrollable.

### 🚀 Phase 10: The Universal Injector Evolution

• **v1.0.26 (The Chrome Wall & The Guest Detector):**
The advanced scroll math and Flexbox armor ballooned the code size to ~6,600 characters, hitting a hard 4,000-character wall in Android Chrome's URL bar. Hyper-minification managed to crush it to 3,968 characters, but crippled future scalability.

> *The Fix:* Officially abandoned raw Bookmarklet pasting. Shifted the architecture to an **Injector Bookmarklet** that dynamically bypasses character limits by fetching the fully readable, heavily commented `.js` file directly from GitHub.

Unlogged "guest" users lacked the Chub bottom navigation bar, making the default `70px` bottom anchor float awkwardly high on the screen.

> *The Fix:* Wrote a `getB()` function to scan the DOM for "Login" links. If detected, the panel dynamically drops to a snug `20px` anchor.

• **v1.0.27 (The Vocabulary Update):**
The guest detector failed on the initial welcome splash screen because the button read "Sign In", not "Login".

> *The Fix:* Expanded the DOM scanner's vocabulary to check for both strings, ensuring perfect bottom alignment across all pages regardless of authentication state.

• **v1.1.0 (The Universal Release):** *The Culmination:* Added `@updateURL` and `@downloadURL` tags, finalizing the transition into a true hybrid tool. It now runs flawlessly via Injector Bookmarklets on mobile browsers and seamlessly installs as a native, auto-updating script via Tampermonkey/Violentmonkey on desktop. Survived the final Gauntlet: virtual keyboard squishing, SPA phantom navigation, and extreme desktop window scaling.

### 🎯 Phase 11: Interactive UX & The Sniper Mode

• v1.1.1 & v1.1.2 (The Dynamic Whitelist): Replaced the static, plain-text creator list with interactive, styled UI tags. Users can now cleanly manage their active scrapers by tapping a red × button on individual creators.

• v1.1.3 – v1.1.7 (The Adware Dilemma): Attempted to implement a dual-action removal system that would delete a creator and purge their scraped links simultaneously via chained native browser popups.

> The Bug: The chained confirm() boxes felt incredibly clunky, mimicking early-2000s malicious adware. Additionally, a copy-paste error caused a severe "bracket avalanche" that temporarily broke the entire closure scope of the UI function.

>The Fix: Scrapped the double-popup entirely in favor of a fast, single-action removal prompt. Delegated link purging strictly to the Export Menu to keep the UX clean. Repaired the syntax structure.

• v1.1.8 (The Sniper Mode): Built "Target Mode" (🎯). A feature allowing users to snipe single character cards directly from the feed without navigating to their profile pages.

> The Bug: Chub's internal React/Next.js router was processing the clicks faster than the scraper could intercept them, causing the browser to load the character page anyway.

>The Fix: Weaponized the JavaScript event listener by forcing it into the "Capture Phase" (true). This intercepts the click at the absolute root of the DOM, allowing the script to violently halt the page navigation (stopPropagation) before the website even knows a click happened.

• v1.1.9 – v1.1.12 (The Pixel-Perfect Polish): The addition of the Target button squeezed the main UI, causing text to ugly-wrap.

> The Fix: Deployed white-space: nowrap and precision inline padding to force the layout into compliance. Completely de-minified the Dev codebase for readability. Upgraded the Export menu by transforming the massive "Exit" text into a compact ❌ flexbox square, tightening button gaps, and fixing native browser baseline "droop" on the Auto-clear checkbox.

### ⚙️ Phase 12: The Tag Engine & The Scunthorpe Bug

• v1.1.13 (The Probe): Investigated how Chub renders character tags on mobile. Built a temporary external DOM-ripper script to prove that fully formatted tags are secretly passed to the device HTML, even if CSS visually truncates them with an ellipsis.

• v1.1.14 (The Scunthorpe Problem): Engineered the Advanced Tag Filter (⚙️), injecting DOM-query logic into the scraping loop to conditionally accept or reject links based on their tags.

>The Bug: The initial engine used indexOf substring matching. If a user set the Exclude filter to "Male", the script saw the word "Female", triggered the exclusion rule, and threw the female character cards in the trash.

>The Fix: Upgraded the engine from raw string matching to strict array equality (===). Added -webkit-user-select: none across the entire UI to prevent the OS from annoyingly highlighting button text during long-presses.

• v1.1.15 (The Logic Flip & The Stacker):

>The Bug: Rapidly tapping UI menu buttons indiscriminately spawned infinite layers of modal windows on top of each other. Furthermore, the "Include" tag logic required a card to have every single tag the user typed (AND logic), which was too restrictive.

>The Fix: Programmed a DOM-clearing strike (d.querySelector('.w').remove()) that dynamically destroys any open modal before rendering a new one. Transitioned the Include filter to flexible OR logic ("Should Include").

### 👑 Phase 13: The v1.2.0 Masterpiece

• v1.1.16 – v1.1.19 (The Dynamic Filter UI): Discarded the ugly textareas in the filter modal. Rebuilt it into a real-time, interactive tag-generator that instantly writes to sessionStorage. Centered the modal dynamically using CSS transforms. Neutralized OS-level emoji color clashing by stripping purple classes, forced light-mode text on the tags, and implemented 1px horizontal dividers to establish clear visual hierarchy between the Include and Exclude lists. Consolidated the header text using align-items: baseline to save critical vertical space.

• v1.2.0 (The Stable Release): The Final Polish. Restructured the bottom-left footer to stack the "CharLinkScraper" branding and copyright text into two tight lines via flexbox, preventing the panel from physically growing. Fine-tuned the negative bottom margin (-8px) to perfectly counterbalance the master padding, achieving flawless 4px visual symmetry. Stripped out the dynamic version-fetching failsafe to optimize load times, hardcoding the version string, and officially locking in the v1.2.0 master release.
