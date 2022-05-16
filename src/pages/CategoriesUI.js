import React, { useEffect, useState } from 'react';
import {useLocation, useParams} from 'react-router-dom';
import "../style/Categories.css";
import { useNavigate } from "react-router-dom";
import API from "../service/API";

export default function CategoriesUI() {
    let navigate = useNavigate();
    let location = useLocation();
    let params = useParams();

    const [categories, setCategories] = useState([])

    const [error, setError] = useState("Laden...")

    useEffect(() => {
        let url;
        if (params.categoryId === undefined) {
            url = "https://shop.marcelwettach.eu/categories";
        } else {
            url = "https://shop.marcelwettach.eu/category/" + params.categoryId
        }

        API.other(url)
            .then(response => setCategories(response._embedded.categories))
            .catch(error => setError("Laden fehlgeschlagen. Eventuell besteht keine Internetverbindung"))
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
        navigate("/categories/" + categoryId)
    }

    function navigateToArticleList(detailsUrl) {
        localStorage.setItem("articlesUrl", detailsUrl)
        navigate(location.pathname + "/articles")
    }
}
