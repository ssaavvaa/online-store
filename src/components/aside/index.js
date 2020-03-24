import React from "react"
import EnglishAuth from './english-auth'
import EnglishUnAuth from './english-unAuth'


function Aside({ language, categories, resetStore, getCurrentUser }) {
    switch (language) {
        case "en":
            if (getCurrentUser) {
                return <EnglishAuth
                    categories={categories}
                    resetStore={resetStore}
                />
            }
            return < EnglishUnAuth
                categories={categories}
            />
        default: return < EnglishUnAuth
            categories={categories}
        />
    }
}

export default Aside;