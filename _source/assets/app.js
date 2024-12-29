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
