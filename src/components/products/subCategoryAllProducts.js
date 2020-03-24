import React, { useState } from "react"
import { useQuery } from '@apollo/react-hooks';
import Layout from '../layout'
import SEO from '../seo'
import { GET_SUBCATEGORY_ALL_PRODUCTS } from '../../graphql/queries'
import { ItemWithInfoNoGallery } from './productItem'
import css from './subCategoryAllProducts.module.scss'
// import idGen from '../../helpers/id_generator'



function Body({ subCategory, category }) {

    const [products, setProducts] = useState([])
    const [limit, setLimit] = useState(4)
    const [noMore, setNoMore] = useState(false)

    const { loading, fetchMore } = useQuery(GET_SUBCATEGORY_ALL_PRODUCTS, {
        variables: { subCategory, limit },
        onError: err => console.log(err),
        onCompleted: data => setProducts(data.getSubCategoryAllProducts)
    })
    async function showMoreItems() {
        const { data: { getSubCategoryAllProducts } } = await fetchMore({
            variables: { limit: limit + 4, subCategory },
            updateQuery: (_, { fetchMoreResult }, err) => {
                setProducts(fetchMoreResult.getSubCategoryAllProducts)
                return fetchMoreResult
            },
        })
        if (getSubCategoryAllProducts.length === products.length) {
            return setNoMore(true)
        }

        return setLimit(limit + 8);
    }
    return (
        <div className='container'>
            {!loading && products.length > 0 &&
                <h1 className={css.heading}>{subCategory}</h1>
            }

            {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
            {products.length > 0 &&
                <ul className={css.allCategoryProducts}>
                    {products.map(props => (
                        <ItemWithInfoNoGallery
                            key={props._id}
                            subCategory={subCategory}
                            category={category}
                            {...props} />

                    ))}
                </ul>
            }
            {!loading && !products.length &&
                <p style={{ textAlign: 'center' }}>
                    Category "<span style={{ color: 'red' }}>{subCategory}</span>" not found...
               </p>
            }
            {!noMore && !loading &&
                <p onClick={showMoreItems}
                    style={{ cursor: "pointer", textAlign: 'center', marginTop: '20px' }}>
                    Load More
            </p>
            }

            {noMore &&
                <p style={{ textAlign: 'center', marginTop: '20px' }}>
                    No more items found...
            </p>}
        </div>
    )

}

function CategoryAllProducts({ location, category, subcategory }) {
    const siteMapNav = [
        {
            "name": "Home",
            "url": "/"
        },
        {
            "name": "Products",
            "url": "/products"
        },
        {
            "name": category.charAt(0).toUpperCase() + category.substring(1),
            "url": `/products/${category}`
        },
        {
            "name": subcategory.charAt(0).toUpperCase() + subcategory.substring(1),
            "url": `/products/${category}/${subcategory}`
        },
    ]
    return (
        <Layout siteMapNav={siteMapNav} location={location} language='en'>
            <SEO title={
                `Products 
                 | ${category.charAt(0).toUpperCase() + category.substring(1)}
                 | ${subcategory.charAt(0).toUpperCase() + subcategory.substring(1)}
                 `} />
            <Body subCategory={subcategory} category={category} />
        </Layout >
    )
}

export default CategoryAllProducts;