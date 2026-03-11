# 📦 Chub.ai Character Link Mass Scraper

A lightweight, bulletproof mobile bookmarklet that lets you bulk-scrape character links from Chub.ai and instantly import them into SillyTavern by simply copying and pasting. Built from the ground up to survive strict mobile browser security and hidden character limits!

### ✨ Features
* **📱 Mobile First:** Works flawlessly on Android Firefox, Android Chrome, Android Edge, and iOS Safari!
* **🖥️ Windows Second:** Also works on Microsoft Edge and Firefox Nightly on Windows (and probably any other JS-compatible browsers).
* **🕹️ Draggable "Invisible Joystick" UI:** Press and drag the top header to move the panel anywhere on your screen so it never blocks the character cards.
* **🛡️ Smart Whitelisting:** Add specific creators to your "Approved" list. The scraper will only grab links belonging to them, ignoring unrelated search results or feed algorithms.
* **🧹 Duplicate Catcher:** Mash the scrape button as much as you want. The script automatically filters out duplicates so your master list is perfectly clean.
* **💾 Persistent Memory:** The script remembers your scraped links even if you refresh the page or navigate to Page 2, 3, etc.
* **⚡ 1-Click Export:** Generates a clean text box of URLs with a native "Copy" button, ready to be pasted directly into SillyTavern.

---

### ⚙️ Installation (One-Time Setup)
Because mobile browsers don't support traditional extensions easily, this tool runs as a *Bookmarklet* (JavaScript disguised as a bookmark).

1. *Open* the `scraper.js` file in this repository and *Copy* the entire block of code (starting with `javascript:`).
2. *Open* your browser of choice and *bookmark* any random webpage.
3. *Edit* the bookmark you just created:
   * **Name:** *Change* it to something short and memorable, like "CCLS" or "Chub Link Scraper".
   * **URL / Address:** *Delete* the website link and *Paste* the code you copied in Step 1.
4. *Save* the edited bookmark.
5. ???
6. ~~PROFIT~~ — You're done!

---

### 🚀 How to Use
Depending on your device, you launch the script slightly differently:

**📱 Option A: The "Address Bar" Method (Best for Android Chrome/Edge)**

On Android, tapping scripts from a bookmarks menu can sometimes be blocked. The most reliable way to launch it is using the "Omnibox Trick":
1. Navigate to Chub.ai.
2. Tap directly into the URL Address Bar.
3. Type the name of your bookmark (e.g., `CCLS`).
4. Look at the autocomplete dropdown. You will see a suggestion with your bookmark icon.
5. Tap the suggestion to instantly launch the panel!

**💻 Option B: The "Bookmarks Menu" Method (Best for Desktop & iOS Safari)**

1. Navigate to Chub.ai.
2. **Desktop:** Simply click the Scraper Bookmark on your Toolbar (or from your Bookmark Menu).
3. **iOS / Firefox Android:** Open your Bookmarks Menu and tap on your created bookmark.

---

### 🛠️ The Scraping Workflow
1. **Authorize the Creator(s):** Once the panel is open on a creator's profile page, tap `+ Add Current Creator`.
2. **Scrape:** Tap `+ Scrape This Page`. The script will harvest all valid character links on your screen.
3. **Turn the Page:** Use Chub's site navigation to go to Page 2, 3, etc. *(If the panel disappears when the new page loads, just launch the bookmarklet again—it remembers your saved links as long as the tab hasn't been completely closed!)*
4. **Expand the Hunt (Optional):** Repeat steps 1-3 for any creators you like. As long as a creator is whitelisted, you can scrape their bots from the Trending Page, the Search, or anywhere else on Chub!
5. **Export:** When you are done hoarding, tap `Show Links`.
6. **Copy & Close:** Tap the `Copy` button on the popup (it will light up green if successful). Afterward, you can shut down the script completely by pressing the red `Exit` button, or press `Back` to close the popup and keep scraping.

---

### 📥 Importing into SillyTavern
1. Open SillyTavern (or your URL-import compatible client) and switch to the Character Management tab.
2. Click on the **External Import** button (a cloud with a downward arrow).
3. Paste your massive list of links into the bottom box and let ST download your new character army!
   * **Pro-Tip:** Make sure "Import Card Tags" in the ST "User Settings" tab is **NOT** set to "Ask." If it is, you will have to manually confirm the tags for *each* new import, slowing the whole process down majorly!

---

### 📝 Notes & Disclaimer
* 🥸 Check out `development_history.md` to read the epic 40-version saga of how I built this and beat mobile browser limitations!
* ℹ️ **Disclaimer:** This is a client-side tool for personal use. It simply automates the process of copying visible links. Please use responsibly and respect Chub.ai's servers.
