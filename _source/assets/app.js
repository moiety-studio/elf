/**
 * Written for Elf by Moiety Studio
 */

// Theme switcher
class ThemeSwitcher {
    container;
    target;
    themes;
    defaultTheme;
    buttons;
    
    constructor(target, themes, defaultTheme) {
        this.target = this.setTarget(target)
        this.themes = themes
        this.defaultTheme = defaultTheme
        this.container = this.createContainer()
        this.buttons = this.createButtons()

        this.appendButtons()
        this.appendContainer()
        this.setInitialTheme()
        this.bindListeners()
    }
    
    bindListeners() {
        window.matchMedia("(prefers-color-scheme: dark)")
            .addEventListener('change', () => {
                this.setInitialTheme()
            })
    }
    
    setTarget(target) {
        return document.querySelector(target)
    }
    
    createContainer() {
        const container = document.createElement("section")
        container.className = "theme-switcher"
        container.setAttribute("aria-label", "Pick a theme")
        return container
    }
    
    createButtons() {
        const buttons = []
        for (let theme in this.themes) {
            buttons.push(this.createButton(this.themes[theme]))
        }
        const resetButton = this.createButton("reset")
        buttons.push(resetButton)
        return buttons
    }
    
    createButton(theme) {
        const circles = this.createCircles(theme)
        const button = document.createElement("button")
        button.setAttribute("data-theme", theme)
        button.innerText = theme
        button.append(circles)
        button.addEventListener("click", this.buttonClickHandler.bind(this))
        return button
    }
    
    createCircles(theme) {
        const span = document.createElement("span")
        const container = span.cloneNode()
        container.setAttribute("data-user-theme", theme)
        container.append(span.cloneNode(), span.cloneNode())
        return container
    }
    
    buttonClickHandler(event) {
        const theme = event.target.getAttribute("data-theme")
        if (theme === "reset") {
            this.resetTheme()
            return
        }
        this.setTheme(theme, true)
    }
    
    appendButtons() {
        for (let button in this.buttons) {
            this.container.append(this.buttons[button])
        }
    }
    
    appendContainer() {
        this.target.append(this.container)
    }
    
    setTheme(theme, save) {
        const html = document.querySelector("html")
        html.setAttribute("data-selected-theme", theme)
        if (save) {
            localStorage.setItem('selected-theme', theme);
        }
    }
    
    resetTheme() {
        localStorage.removeItem('selected-theme')
        this.setInitialTheme()
    }
    
    setInitialTheme() {
        const saved = localStorage.getItem('selected-theme')
        const prefersDarkColorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        const prefersLightColorScheme = window.matchMedia("(prefers-color-scheme: light)").matches

        if (saved) {
            this.setTheme(saved)
            return
        }

        if (prefersDarkColorScheme) {
            this.setTheme("dark")
        }
        
        if (prefersLightColorScheme) {
            this.setTheme("light")
        }
    }
}

// Fetch the CSS, find the themes, and initiate ThemeSwitcher
fetch('/assets/core.min.css')
    .then(response => response.text())
    .then((data) => {
      const matches = data.match(/(?<=\[data-selected-theme=")(\w+)/gmi)
      const standard = data.match(/(?:root,\s*\[data-selected-theme=")(\w+)/mi)[1]
      
      new ThemeSwitcher("footer.core", matches, standard)
    })
