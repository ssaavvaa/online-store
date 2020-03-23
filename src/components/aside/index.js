import React from "react"
import English from './english'


function Aside({ language, categories, resetStore, getCurrentUser }) {
    switch (language) {
        case "en":
            return <English
                getCurrentUser={getCurrentUser}
                categories={categories}
                resetStore={resetStore}
            />
        default: return < English
            categories={categories}
            resetStore={resetStore}
            getCurrentUser={getCurrentUser}
        />
    }
}

export default Aside;