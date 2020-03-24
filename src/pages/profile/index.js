

import React from "react"
import { Router } from "@reach/router"
import Index from '../../components/profile/index'
import CreateProduct from '../../components/profile/createProducts'
import NotFound from '../404'
import Products from '../../components/profile/products'
import Info from '../../components/profile/info'
import EditProduct from '../../components/profile/editProduct'


export default ({ location }) => {

  return (
    <Router basepath="/profile">
      <Index location={location} path="/" />
      <CreateProduct location={location} path='/create-product' />
      <Products location={location} path='/products' />
      <Info location={location} path='/info' />
      <EditProduct location={location} path='/products/:_id' />
      <NotFound path="*" />
    </Router >
  )
}




