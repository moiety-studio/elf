const theme = localStorage?.getItem("selected-theme")
document.querySelector("html").setAttribute("data-selected-theme", theme)
