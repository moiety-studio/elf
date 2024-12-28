/**
 * Written for Elf by Moiety Studio
 */

import ThemeSwitcher from "./theme-switcher.min.js"

// Theme switcher
const themeSwitcherSettings = {
    themes: [
        'dark',
        'light',
        'aurora'
    ],
    target: "footer.core",
    class: "theme-switcher",
    label: "Pick a theme"
}

const switcher = new ThemeSwitcher(themeSwitcherSettings)

// // Fetch the CSS, find the themes, and initiate ThemeSwitcher
// fetch('/assets/core.min.css')
//     .then(response => response.text())
//     .then((data) => {
//       const matches = data.match(/(?<=\[data-selected-theme=")(\w+)/gmi)
//       const standard = data.match(/(?:root,\s*\[data-selected-theme=")(\w+)/mi)[1]
//       
//       new ThemeSwitcher("footer.core", matches, standard)
//     })
