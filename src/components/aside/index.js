import React from "react"
import English from './english'


const Aside = ({ language }) => {
    switch (language) {
        case "en":
            return <English />
        default: return < English />
    }
}

export default Aside;