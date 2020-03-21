import React from "react"
import { Link } from 'gatsby'
import css from './categoryPreviewSection.module.scss';
import { Item } from './productItem'

function CategoryPreviewSection({ category, products }) {
    return (
        <section className={css.section}>
            <h3>{category}</h3>
            <ul className={css.productsList}>
                {products.map(({ _id, name, brand, images, price }) => (
                    <Item
                        key={_id}
                        name={name}
                        brand={brand}
                        images={images}
                        price={price}
                    />
                ))}
            </ul>
            <Link style={{
                textAlign: 'center',
                display: 'block',
                marginTop: '20px'
            }} to={`/products/${category}`} >Go to {category.charAt(0).toUpperCase() + category.substring(1)}</Link>
        </section>
    )
}


export default CategoryPreviewSection