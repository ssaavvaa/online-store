import React, { useState } from "react"
import { Link } from 'gatsby'
import { useMutation } from "@apollo/react-hooks";
import Layout from "../layout"
import SEO from "../seo"
import { CREATE_PRODUCT } from '../../graphql/mutations'
import siteMapNav from '../../site-map-nav/create-product.json'
import css from './createProduct.module.scss'

function Body({ getCurrentUser }) {
    if (!getCurrentUser) {
        return (
            <div className='wrapper'>
                <p
                    style={{
                        textAlign: "center",
                        fontSize: '24px'
                    }}
                >Please
                  <Link style={{ marginLeft: '20px' }} to='/sign-in' >Sign In</Link>
                </p>
                <p
                    style={{
                        textAlign: 'center'
                    }}
                >To view your profile...</p>
            </div>
        )
    }

    const [state, setState] = useState({
        name: "",
        brand: "",
        model: "",
        creator: getCurrentUser._id,
        category: "",
        subCategory: "",
        description: "",
        price: 0.01,
        colors: [],
        images: []
    })

    const [previewImage, setPreviewImage] = useState(null)

    const { name, brand, images, model, category, subCategory, description, colors, price, creator } = state;

    const [createProduct, attrs] = useMutation(CREATE_PRODUCT, {
        variables: {
            name,
            creator,
            brand,
            model,
            category: category.toLowerCase(),
            subCategory: subCategory.toLowerCase(),
            description,
            price: parseFloat(price),
            colors,
            images
        },
        onCompleted: data => console.log(data),
        onError: err => console.log(err)
    })

    async function handlePicture(e) {
        e.preventDefault()
        const myWidget = cloudinary.createUploadWidget({
            cloudName: 'djke3wknc',
            uploadPreset: 'online-store'
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                setPreviewImage(result.info.secure_url)
                return setState({ ...state, images: [result.info.secure_url] })
            }
        }
        )
        return myWidget.open()
    };

    function handleSubmit(e) {
        e.preventDefault()
        return createProduct()
    }

    function handleChange({ target: { value, name } }) {
        setState({ ...state, [name]: value })
    }



    return (

        <div className='wrapper'>
            <h1 className={css.heading}>Create Product</h1>
            <form onSubmit={handleSubmit} className='createForm'>
                <input
                    placeholder="name"
                    value={name}
                    name='name'
                    type='text'
                    onChange={handleChange}
                />
                <input
                    value={brand}
                    placeholder='brand'
                    name='brand' type='text'
                    onChange={handleChange}
                />
                <input
                    value={model}
                    placeholder='model'
                    name='model'
                    type='text'
                    onChange={handleChange}
                />
                <input
                    value={category}
                    placeholder='category'
                    name='category'
                    type='text'
                    onChange={handleChange}
                />
                <input
                    value={subCategory}
                    placeholder='subcategory'
                    name='subCategory'
                    type='text'
                    onChange={handleChange}
                />
                <input

                    placeholder='price'
                    name='price'
                    type="number"
                    step="0.01"
                    onChange={handleChange}
                />
                <textarea
                    value={description}
                    placeholder="description"
                    name='description'
                    type='text'
                    onChange={handleChange}
                />

                {previewImage && <img className={css.previewImage} alt='previewImage' src={previewImage} />}
                <button type='button' className='addImageButton' onClick={handlePicture} >Add Image</button>
                <button type='submit'>{attrs.loading ? 'Loading...' : 'Submit'}</button>
            </form>
        </div>

    )
}

export default ({ location }) => (
    <Layout siteMapNav={siteMapNav} location={location} language='en'>
        <SEO title="Profile" />
        <Body />
    </Layout>
)

