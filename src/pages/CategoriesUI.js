import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../style/Categories.css";

export default function CategoriesUI() {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState("Laden...")

    let params = useParams()

    useEffect(() => {
        if (params.categoryId === undefined) {
            fetch("https://shop.marcelwettach.eu/categories")
                .then(response => response.json())
                .then(response => setCategories(response._embedded.categories))
                .catch(error => {
                    console.log(error)
                    setError("Laden fehlgeschlagen. Eventuell besteht keine Internetverbindung")
                })
        } else {
            fetch("https://shop.marcelwettach.eu/category/" + params.categoryId)
                .then(response => response.json())
                .then(response => setCategories(response._embedded.categories))
                .catch(error => {
                    console.log(error)
                    setError("Laden fehlgeschlagen. Eventuell besteht keine Internetverbindung")
                })
        }
    }, [params.categoryId])

    if (categories.length > 0) {
        return (
            <div>
                {categories.map(c => {
                    if (c._links.subcategories !== undefined) {
                        return <div className={"menuItem"} key={c.categoryId} onClick={() => navigateToSub(c.categoryId)}>
                            {c.name}
                        </div>
                    } else {
                        return <div className={"menuItem"} key={c.categoryId} onClick={() => navigateToArticleList(c._links.articles.href)}>
                            {c.name}
                        </div>
                    }
                })}
            </div>
        )
    } else {
        return <div>{error}</div>
    }

    function navigateToSub(categoryId) {
        console.log(categoryId)
        window.location = "/categories/" + categoryId
    }

    function navigateToArticleList(detailsUrl) {
        localStorage.setItem("articlesUrl", detailsUrl)
        window.location += "/articles"
    }
}
