---
title: Documentation
permalink: documentation/
layout: "layouts/main.njk"
---
# Documentation

The goal with Elf is to make 11ty projects that your customers can run themselves. This documentation is here to help both customers and developers.

## Install & run the project

Note: You’ll need [node](https://nodejs.org/en/download/package-manager) version 18 or higher. You can check if you have node by running `node --version`.

1. clone the repository
2. navigate into the folder (ex: `cd elf`)
3. install the required materials: `npm install`
4. run the project: `npm start`

## Used technologies

- [11ty](https://www.11ty.dev/) as base
- [ECMAScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) (ESM) are used to configure 11ty
- [Nunjucks](https://mozilla.github.io/nunjucks/templating.html) for templates
- [PostCSS](https://www.npmjs.com/package/postcss) is used to compile and minify the CSS

## Folder structure

The folder structure is:

- `_site`; where the generated site ends up
- `_source`; all the files used to build the website are here
    - `_data`; used for global data files
    - `_includes`; mainly templates for the pages and some building blocks
    - `assets`; things that’ll be included in the pages: css, fonts, images, icons, js, etc.
    - `root`;  where the main pages live

## Included filters

There are two [filters](https://www.11ty.dev/docs/filters/) included:

- `sortCollectionByFilename`; sorts a collection by filename in ascending order
- `externalLink`; checks if a link is external, helpful for adding information such as labels or icons

## Front matter

Useful [front matter](https://www.11ty.dev/docs/data-frontmatter/) attributes:

- `title` sets the `<title>`-element value and is used to provide a page title
- `layout` choose one of layouts from `_includes/layouts`
- `permalink` can be used to override what people see in the address bar; for example `permalink: "documentation/"` will result in `https://elf.moiety.studio/documentation`

## Site settings

<!-- TODO: move to it’s own page? -->

There are a few settings you change to personalise the project:

- `_source/_data/globals.json` contains some variables you can set
    - `title.short` provides (part of) the `<title>`-element
    - `title.long` provides the `<title>`-element if no page title (ie. from the markdown file) is provided
    - `description` is used to set the value for `<meta name="description">`
