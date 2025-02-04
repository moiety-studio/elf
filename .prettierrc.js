/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */

const config = {
    trailingComma: "none",
    semi: false,
    plugins: ["prettier-plugin-jinja-template"],
    overrides: [
        {
            files: "*.njk",
            options: {
                parser: "jinja-template"
            }
        }
    ]
}

export default config
