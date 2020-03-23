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
                textAlign: 'right',
                display: 'block',
                color: 'black',
                textDecoration: "none",
                marginTop: '20px',
                marginRight: '10%'
            }} to={`/products/${category}`} >Go to {category.charAt(0).toUpperCase() + category.substring(1)}
                <i style={{ marginLeft: '10px', fontSize: 14 }} className="fas fa-arrow-right"></i>

            </Link>
        </section>
    )
}


export default CategoryPreviewSection