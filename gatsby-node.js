
const path = require('path')

const CategoryComponent = path.resolve(`./src/components/products/subCategories.js`)
const SubCategoryComponent = path.resolve(`./src/components/products/subCategoryAllProducts.js`)
const ProductComponent = path.resolve(`./src/components/products/productPage.js`)

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

exports.createPages = async ({ actions }) => {
    const { createPage } = actions
    // Only update the `/app` page.

    createPage({
        path: "/products/",
        matchPath: "/products/:category/:subcategory",
        component: SubCategoryComponent
    })
    createPage({
        path: "/products/",
        matchPath: "/products/:category",
        component: CategoryComponent
    })
    createPage({
        path: "/products/",
        matchPath: "/products/:category/:subcategory/:_id",
        component: ProductComponent
    })
}