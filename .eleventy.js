import eleventyNavigationPlugin from "@11ty/eleventy-navigation"
import { feedPlugin } from "@11ty/eleventy-plugin-rss"
import postcss from "postcss"
import postcssImport from "postcss-import"
import postcssMinify from "postcss-minify"
import { minify } from "terser"

export default function (eleventyConfig) {
    // Filters --------------------------
    eleventyConfig.addFilter("sortCollectionByFilename", (c) => {
        return c.sort((a, b) => {
            const aNum = parseInt(a.fileSlug.split("-")[0])
            const bNum = parseInt(b.fileSlug.split("-")[0])
            return aNum - bNum
        })
    })

    eleventyConfig.addFilter("externalLink", (url) => {
        return url.match(/\/*/)[0] != "/"
    })

    // Plugins --------------------------
    eleventyConfig.addPlugin(eleventyNavigationPlugin)
    eleventyConfig.addPlugin(feedPlugin, {
        type: "rss", // one of: "atom", "rss", "json"
        outputPath: "/feed.xml",
        collection: {
            name: "posts", // iterate over `collections.posts`
            limit: 10,     // 0 means no limit
        },
        metadata: {
            language: "en",
            title: "Elf",
            subtitle: "Elf is an 11ty project template to help you start your next 11ty project with ease.",
            base: "https://elf.moiety.studio/",
            author: {
                name: "Moiety Studio"
            }
        }
    })
    
    // JS processing --------------------
    eleventyConfig.addTemplateFormats("js")
    eleventyConfig.addExtension("js", {
        compile: async (content, path) => {
            return async () => {
                let output = await minify(content, {})

                return output.code
            }
        },
        compileOptions: {
            permalink: function (contents, inputPath) {
                // NOTE: is there a better way to change the extension?
                inputPath = inputPath.replace("_source/theme/js/", "/assets/")
                inputPath = inputPath.replace(".js", ".min.js")

                return inputPath
            }
        }
    })

    // CSS processing -------------------
    eleventyConfig.addTemplateFormats("css")
    eleventyConfig.addExtension("css", {
        outputFileExtension: "min.css",
        compile: async (content, path) => {
            if (path !== "./_source/theme/css/_core.css") {
                return
            }

            return async () => {
                let output = await postcss([
                    postcssImport,
                    postcssMinify
                ]).process(content, {
                    from: path
                })

                return output.css
            }
        }
    })

    // Short codes ----------------------
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`)

    // Passthrough ----------------------
    eleventyConfig.addPassthroughCopy({ "./_source/theme/assets": "/assets" })

    // 11ty Settings --------------------
    return {
        dir: {
            input: "_source",
            data: "_data",
            includes: "/theme/_includes",
            layouts: "/theme/_layouts"
        },
        dataTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    }
}
