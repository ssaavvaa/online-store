import React, { useState } from "react"
import { useQuery } from "@apollo/react-hooks";
import css from './search.module.scss'
import { SEARCH_PRODUCTS } from '../graphql/queries'
import { ItemWithInfoNoGallery } from './products/productItem'




export default ({ searchQuery }) => {

    const [products, setProducts] = useState([])


    const { loading } = useQuery(SEARCH_PRODUCTS, {
        variables: { query: searchQuery, limit: 50 },
        onCompleted: ({ searchProducts }) => setProducts(searchProducts),
        onError: err => console.log(err)
    })



    return (
        <div className='container'>
            <h1 className={css.heading}>Search</h1>
            {loading && <p
                style={{ textAlign: 'center' }}>
                Loading...
                        </p>
            }
            {!loading &&
                <p style={{ textAlign: 'center' }}>
                    Search results for " {searchQuery} "
                </p>
            }
            {!loading && !products.length > 0 &&
                <p style={{ textAlign: 'center' }}>
                    No results...
                    </p>
            }
            {!loading && products.length > 0 &&
                <ul className={css.allFoundProducts}>
                    {products.map((props) => (
                        <ItemWithInfoNoGallery
                            key={props._id}
                            {...props} />
                    ))}
                </ul>
            }

        </div>
    )
}