# 📦 Chub.ai Character Link Mass Scraper (v1.1.0)

A lightweight, bulletproof tool to bulk-scrape character links from Chub.ai and instantly import them into SillyTavern by simply copying and pasting. Built from the ground up to survive strict mobile browser security, and now fully universal—run it as a sleek mobile Bookmarklet or a native desktop Userscript!

### ✨ Features
* **📱 Universal Support:** Works flawlessly via Bookmarklet on Android (Firefox, Chrome, Edge), iOS Safari and Windows OR natively via Tampermonkey/Violentmonkey on Desktop or Mobile Extension!
* **🔄 Auto-Updating:** The mobile Injector Bookmarklet and Monkey-Script fetch the live upgrades directly from GitHub. You never have to manually update your mobile bookmark again.
* **🛡️ Flexbox Armor:** The floating UI panel perfectly adapts to device rotations and virtual keyboards without clipping off-screen.
* **🕵️‍♂️ Guest Detection:** The UI automatically adjusts its position to avoid overlapping site elements, regardless of whether you are logged in or browsing as a guest.
* **📜 Smart Auto-Scroll:** As your list of scraped creators grows, the panel intelligently auto-scrolls with a subtle "peek" effect so your important action buttons are always in view.
* **🕹️ Draggable UI:** Press and drag the top header to move the panel anywhere on your screen. Expand (`➕`) or collapse (`➖`) the panel to save screen space.
* **🎯 Smart Whitelisting & Duplicate Catcher:** Add specific creators to your "Approved" list. The scraper only grabs their links and automatically filters out duplicates.
* **💾 Persistent Memory:** The script remembers your scraped links even if you refresh the page or navigate to Page 2, 3, etc.
* **⚡ 1-Click Export:** Generates a clean text box of URLs with a native "Copy" button, ready to be pasted directly into SillyTavern.

---

### ⚙️ Installation (One-Time Setup)

You can install the scraper in two different ways depending on your device:

#### 🔖 Option 1: The Bookmarklet Way
Because mobile browsers don't support traditional extensions easily, this tool runs as an "Injector Bookmarklet" (a tiny piece of JavaScript disguised as a bookmark that fetches the main code).
1. Open the [`bookmarklet.js`](https://github.com/GentleBurr/chub-charlink-scraper/blob/main/bookmarklet.js) file in this repository and copy the entire block of code.
2. Open your mobile browser and bookmark any random webpage.
3. Edit the bookmark you just created:
   * **Name:** Change it to something short, like "CCLS" or "Chub Link Scraper".
   * **URL / Address:** Delete the website link and paste the code you copied in Step 1.
4. Save it. You're done!

#### 🐒 Option 2: The Monkey Way (Best for Desktop)
If you use a PC browser with an extension manager like **Tampermonkey** or **Violentmonkey**, installation takes one click.
1. Click this link: **[Install scraper.user.js](https://raw.githubusercontent.com/GentleBurr/chub-charlink-scraper/main/scraper.user.js)**
2. Your extension manager will pop up and ask if you want to install it. Click "Install" or "Confirm".
3. The script will now run automatically whenever you visit Chub.ai!

---

### 🚀 How to Use (Mobile Launching)
If you installed the Bookmarklet, you need to launch it when you visit Chub.ai. Depending on your browser, use one of these methods:

**📱 The "Address Bar" Method (Best for Android Chrome)**
On Android, tapping scripts from a bookmarks menu can sometimes be blocked. The most reliable way to launch it is using the "Omnibox Trick":
1. Navigate to Chub.ai.
2. Tap directly into the URL Address Bar.
3. Type the name of your bookmark (e.g., `CCLS`).
4. Look at the autocomplete dropdown. You will see a suggestion with your bookmark icon.
5. Tap the suggestion to instantly launch the panel!

**🍎 The "Bookmarks Menu" Method (Best for iOS Safari & Android Edge)**
1. Navigate to Chub.ai.
2. Open your Bookmarks Menu and simply tap on your created bookmark.

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
   * **Pro-Tip:** Make sure "Import Card Tags" in the ST "User Settings" tab is **NOT** set to "Ask". If it is, you will have to manually confirm the tags for *each* new import, slowing the whole process down majorly!

---

### 🗺️ Roadmap & Upcoming Features
I am actively working to expand the capabilities of this tool. Planned updates include:
* **Multi-Site Support:** Expanding the scraper's reach to seamlessly pull links from other popular character hubs.
* **Advanced Tag Filtering:** Giving you the ability to filter out specific tags before scraping.
* **Date Filtering:** Only scrape characters added within a specific timeframe.
* **List Management & Auto-Clear:** Streamlining consecutive scraping sessions by adding a dedicated "Clear Links" button, or an option to automatically flush your saved list upon a successful copy.
* **Dynamic Whitelist Editing:** Giving you the power to remove specific creators from your active whitelist on the fly, complete with a smart prompt asking whether to keep or purge their already-scraped links.
* **Direct .txt File Export:** Bypassing mobile clipboard size limits entirely by adding a button to download your massive link lists directly as a clean text file.
* **Granular Scrape Stats:** Adding visual counters next to the creators' names in the UI so you can see exactly how many links were harvested from each specific author.

*(Want to test the newest features before anyone else? Check out the **[CHANGELOG.md](https://github.com/GentleBurr/chub-charlink-scraper/blob/main/CHANGELOG.md)** for instructions on how to install the Bleeding Edge Dev Build! **Caution**: very unstable and might not work from time to time!)*

---

### 📝 Notes & Disclaimer
* 🥸 Check out the `CHANGELOG.md` to read the epic, 40+ version saga of how I engineered this tool to beat mobile browser limitations!
* ℹ️ **Disclaimer:** This is a client-side tool for personal use. It simply automates the process of copying visible links. Please use responsibly and respect the servers of the sites you are scraping.
