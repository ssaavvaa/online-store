import React from "react"
import English from './english'


function Aside({ language }) {
    switch (language) {
        case "en":
            return <English />
        default: return < English />
    }
}

export default Aside;