
const path = require('path')

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === "build-html") {
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /bad-module/,
                        use: loaders.null(),
                    },
                ],
            },
        })
    }
}

exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    // Only update the `/app` page.
    if (page.path.match(/^\/profile/)) {
        // page.matchPath is a special key that's used for matching pages
        // with corresponding routes only on the client.
        page.matchPath = "/profile/*"
        // Update the page.
        createPage(page)
    }

    if (page.path.match(/^\/products/)) {
        // page.matchPath is a special key that's used for matching pages
        // with corresponding routes only on the client.
        page.matchPath = "/products/*"
        // Update the page.
        createPage(page)
    }
}

// exports.createPages = async ({ actions }) => {
//     const { createPage } = actions
//     // Only update the `/app` page.

//     createPage({
//         path: "/products/",
//         matchPath: "/products/:category/:subcategory",
//         component: path.resolve(`./src/components/products/subCategoryAllProducts.js`)
//     })
//     createPage({
//         path: "/products/",
//         matchPath: "/products/:category",
//         component: path.resolve(`./src/components/products/subCategories.js`)
//     })
//     createPage({
//         path: "/products/",
//         matchPath: "/products/:category/:subcategory/:_id",
//         component: path.resolve(`./src/components/products/productPage.js`)
//     })
//     createPage({
//         path: "/profile/",
//         matchPath: "/profile/products/:_id",
//         component: path.resolve('./src/components/profile/editProduct.js')
//     })
//     createPage({
//         path: "/profile/",
//         matchPath: "/profile/info",
//         component: path.resolve('./src/components/profile/info.js')
//     })
// }