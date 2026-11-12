# AgentDesk – SaaS Landing Page

Front-end internship assignment for Sankar Group.
AgentDesk is an invented product: an AI assistant team for small businesses (support, scheduling, email, insights).
**This is a front-end demo. There is no backend, no real AI and no real integrations.** All activity, prices and numbers are sample data.

## Live demo
<add your Netlify / Vercel / GitHub Pages link here>

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
<paste your 5–8 line explanation here>

## Screenshots
<add desktop and mobile screenshots to a /screenshots folder>
