import React from "react"
import English from './english'


function Aside({ language, categories }) {
    switch (language) {
        case "en":
            return <English categories={categories} />
        default: return < English categories={categories} />
    }
}

export default Aside;