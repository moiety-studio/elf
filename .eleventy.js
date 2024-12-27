import { EleventyI18nPlugin } from "@11ty/eleventy"
import postcss from "postcss"
import postcssImport from "postcss-import"
import postcssMinify from "postcss-minify"

export default function(eleventyConfig) {
    // Filters --------------------------
    eleventyConfig.addFilter("sortCollectionByFilename", (c) => {
        return c.sort((a, b) => {
            const aNum = parseInt(a.fileSlug.split('-')[0])
            const bNum = parseInt(b.fileSlug.split('-')[0])
            return aNum - bNum
        })
    })
    
    eleventyConfig.addFilter("externalLink", (url) => {
        return url.match(/\/*/)[0] != '/'
    })

    // CSS processing -------------------
    eleventyConfig.addTemplateFormats("css")
    eleventyConfig.addExtension("css", {
        outputFileExtension: "css",
        compile: async (content, path) => {
            if (path !== './_source/assets/core.css') {
                return
            }

            return async () => {
                let output = await postcss([
          postcssImport,
          postcssMinify
        ]).process(content, {
                    from: path,
                })

                return output.css
            }
        }
    })

    // Short codes ----------------------
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`)

    // Passthrough ----------------------
    eleventyConfig.addPassthroughCopy("_source/assets/icons/")
    eleventyConfig.addPassthroughCopy("_source/assets/images/")
    eleventyConfig.addPassthroughCopy("_source/assets/fonts/")
    eleventyConfig.addPassthroughCopy("_source/assets/app.js")
    eleventyConfig.addPassthroughCopy("_source/assets/core.css")

    // 11ty Settings --------------------
    return {
        dir: {
            input: "_source"
        },
        dataTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk'
    }
}
