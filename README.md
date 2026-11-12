# AgentDesk – SaaS Landing Page

Front-end internship assignment for Sankar Group.
AgentDesk is an invented product: an AI assistant team for small businesses (support, scheduling, email, insights).
**This is a front-end demo. There is no backend, no real AI and no real integrations.** All activity, prices and numbers are sample data.

## Live demo
https://agentdesk-madhulika.netlify.app

## Run it with VS Code Live Server
1. Install [VS Code](https://code.visualstudio.com/) and the **Live Server** extension (by Ritwick Dey).
2. Choose **File → Open Folder** and open the `agentdesk` folder.
3. Right-click `index.html` and choose **Open with Live Server** (or click **Go Live** at the bottom right).
4. The site opens at `http://127.0.0.1:5500` and reloads when you save a file.

No installation or build step is needed. Double-clicking `index.html` also works.

## Technologies
HTML5, CSS3 (custom properties, Grid, Flexbox, media queries), vanilla JavaScript. No frameworks or libraries. Fonts: Bricolage Grotesque and Instrument Sans (Google Fonts, with system fallbacks).

## Features that work
- Light and dark theme toggle, saved in `localStorage`
- Sticky navigation, smooth scrolling, active section highlight, mobile hamburger menu
- Four agent cards that open an accessible modal (native `<dialog>`: close button, Esc, click outside)
- Monthly / yearly pricing toggle with yearly savings explained
- FAQ accordion (one open at a time)
- Demo form with validation, inline errors and an accessible success message
- Back-to-top button, keyboard focus styles, reduced-motion support

## Simulated because there is no backend
- The hero dashboard and its activity feed are a product preview with sample data
- The demo form only validates and shows a message; nothing is sent, saved or booked
- "Request this agent" in the modal only fills in the form's agent field

## Files
- `index.html` structure and content
- `style.css` theme tokens first, then one commented block per section
- `script.js` one function per feature

## Design notes
I designed AgentDesk as a calm, trustworthy SaaS product for small businesses, using an indigo and mint palette on a soft off-white background. All colours are CSS variables, so the light and dark themes share one stylesheet and the chosen theme is saved in localStorage. The hero shows a dashboard preview, clearly labelled as sample data, to explain the product at a glance. Agent details open in the native HTML dialog element, which gives keyboard support and Esc-to-close without extra code. The "How it works" timeline switches from horizontal to vertical on mobile, which took the most layout work. Because there is no backend, the demo form validates in the browser and says plainly that nothing is sent. I built it with plain HTML, CSS and JavaScript so every part is easy to explain.

## Screenshots
## Screenshots
![Desktop light](desktop-light.png)
![Desktop dark](desktop-dark.png)
![Mobile](mobile.png)
