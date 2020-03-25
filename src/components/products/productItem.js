import React, { useState } from "react"
import $ from 'jquery';
import { Link } from 'gatsby'
import genId from '../../helpers/id_generator'
import css from './productItem.module.scss'




export function Item({
    name,
    brand,
    images,
    price
}) {

    return (
        <li className={css.item}>
            <div className={css.imageWrapper}>
                <img key={genId()}
                    className={css.productImage}
                    src={images[0]}
                    alt={images[0]}
                />
            </div>
            {name && <p className={css.name}>name: {name}</p>}
            {brand && <p className={css.brand}>brand: {brand}</p>}
            {price && <p className={css.price}>{price} $</p>}
        </li >
    )
}

export function ItemWithInfoNoGallery({
    _id,
    subCategory = null,
    category = null,
    brand,
    images,
    model,
    price
}) {

    return (
        <li className={css.item}>
            <Link to={`/products/${category}/${subCategory}/${_id}`}>
                <div className={css.imageWrapper}>
                    <img key={genId()}
                        className={css.productImage}
                        src={images[0]}
                        alt={images[0]}
                    />
                </div>
                <p className={css.name}>model: {model}</p>
                <p className={css.brand}>brand: {brand}</p>
                <p className={css.price}>{price}</p>
            </Link>
        </li >
    )
}

export function ItemWithGallery({
    name,
    brand,
    images,
    price
}) {
    let index = 0;
    function handleNext({ target }) {
        index += 1;
        if (index > images.length - 1) index = 0;
        $(target).siblings(`.${css.productImage}`).attr('src', images[index])

    }

    function handlePrev({ target }) {
        index -= 1;
        if (index < 0) index = images.length - 1;
        $(target).siblings(`.${css.productImage}`).attr('src', images[index])

    }

    return (
        <li className={css.item}>

            <div className={css.imageWrapper}>
                <i onClick={handleNext} className={`fas fa-arrow-right ${css.arrowRight}`}></i>
                <i onClick={handlePrev} className={`fas fa-arrow-left ${css.arrowLeft}`}></i>
                <img key={genId()}
                    className={css.productImage}
                    src={images[index]}
                    alt={images[index]}
                />
            </div>
            <p className={css.name}>name: {name}</p>
            <p className={css.brand}>brand: {brand}</p>
            <p className={css.price}>{price}</p>
        </li >
    )
}


