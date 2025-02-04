/**
 * Written for Elf by Moiety Studio
 */

export default class ThemeSwitcher {
    settings
    container
    target
    themes
    #buttons

    constructor(settings) {
        this.settings = settings
        this.target = this.setTarget(this.settings.target)
        this.themes = this.settings.themes
        this.container = this.createContainer()
        this.#buttons = this.createButtons()

        this.appendButtons()
        this.appendContainer()
        this.setInitialTheme()
        this.bindListeners()
    }

    bindListeners() {
        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", () => {
                this.setInitialTheme()
            })
    }

    setTarget(target) {
        return document.querySelector(target)
    }

    createContainer() {
        const container = document.createElement("section")
        container.className = this.settings.class
        container.setAttribute("aria-label", this.settings.label)
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
        button.setAttribute("type", "button")
        button.setAttribute("data-theme", theme)
        button.innerText = theme
        button.append(circles)
        button.addEventListener("click", (event) => {
            this.buttonClickHandler(event, button)
        })
        return button
    }

    createCircles(theme) {
        const span = document.createElement("span")
        const container = span.cloneNode()
        container.setAttribute("data-selected-theme", theme)
        container.append(span.cloneNode(), span.cloneNode())
        return container
    }

    buttonClickHandler(event, button) {
        const theme = button.getAttribute("data-theme")
        this.#resetButtonStates()
        if (theme === "reset") {
            this.resetTheme()
            return
        }
        this.setTheme(theme, true)
        this.#setButtonState(button, "true")
    }

    appendButtons() {
        for (let button in this.#buttons) {
            this.container.append(this.#buttons[button])
        }
    }

    appendContainer() {
        this.target.append(this.container)
    }

    setTheme(theme, save) {
        const html = document.querySelector("html")
        html.setAttribute("data-selected-theme", theme)
        if (save) {
            localStorage.setItem("selected-theme", theme)
        }
        this.#initButtonState(theme)
    }

    resetTheme() {
        localStorage.removeItem("selected-theme")
        this.setInitialTheme()
    }

    #initButtonState(theme) {
        this.#resetButtonStates()

        for (let button of this.#buttons) {
            if (button?.dataset.theme === theme) {
                this.#setButtonState(button, "true")
                return
            }
        }
    }

    #setButtonState(button, state) {
        button.setAttribute("aria-pressed", state)
    }

    #resetButtonStates() {
        for (let button of this.#buttons) {
            this.#setButtonState(button, "false")
        }
    }

    setInitialTheme() {
        const saved = localStorage.getItem("selected-theme")
        const prefersDarkColorScheme = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
        const prefersLightColorScheme = window.matchMedia(
            "(prefers-color-scheme: light)"
        ).matches

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
