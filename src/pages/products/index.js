import React, { useState } from "react"
import { Router } from "@reach/router"
import Index from '../../components/products/index'
import SubCategories from '../../components/products/subCategories'
import SubCategoryAllProducts from '../../components/products/subCategoryAllProducts'
import ProductPage from '../../components/products/productPage'


export default ({ location }) => {

    return (
        < Router basepath="/products">
            <Index location={location} path="/" />
            <SubCategories location={location} path='/:category' />
            <SubCategoryAllProducts location={location} path='/:category/:subcategory' />
            <ProductPage location={location} path='/:category/:subcategory/:_id' />
        </Router >
    )
}




