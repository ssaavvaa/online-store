
const path = require('path')

const CategoryComponent = path.resolve(`./src/components/products/subCategories.js`)
const SubCategoryComponent = path.resolve(`./src/components/products/subCategoryAllProducts.js`)

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

exports.createPages = async ({ page, actions }) => {
    const { createPage } = actions
    // Only update the `/app` page.
    createPage({ path: "/products/", matchPath: "/products/:category/:subcategory", component: CategoryComponent })
    createPage({ path: "/products/", matchPath: "/products/:category", component: CategoryComponent })
}