import React, { useEffect, useState } from 'react';
import {useLocation, useParams} from 'react-router-dom';
import "../style/Categories.css";
import { useNavigate } from "react-router-dom";
import API from "../service/API";

export default function CategoriesUI() { // 1
    let navigate = useNavigate(); // 2
    let location = useLocation(); // 2
    let params = useParams(); // 2

    const [categories, setCategories] = useState([]) // 2

    const [error, setError] = useState("Laden...") // 2

    useEffect(() => { // 1
        let url; // 0
        if (params.categoryId === undefined) { // 3
            url = "https://shop.marcelwettach.eu/categories"; // 1
        } else { // 1
            url = "https://shop.marcelwettach.eu/category/" + params.categoryId // 3
        }

        API.other(url) // 1
            .then(response => setCategories(response._embedded.categories)) // 4
            .catch(error => setError("Laden fehlgeschlagen. Eventuell besteht keine Internetverbindung")) // 2
    }, [params.categoryId]) // 1

    if (categories.length > 0) { // 3
        return ( // 1
            <div> <!-- 1 -->
                {categories.map(c => { // 1
                    if (c._links.subcategories !== undefined) { // 4
                        return <div className={"menuItem"} key={c.categoryId} onClick={() => navigateToSub(c.categoryId)}> <!-- 8 -->
                            {c.name} <!-- 1 -->
                        </div>
                    } else { // 1
                        return <div className={"menuItem"} key={c.categoryId} onClick={() => navigateToArticleList(c._links.articles.href)}> <!-- 10 -->
                            {c.name} <!-- 1 -->
                        </div>
                    }
                })}
            </div>
        )
    } else { // 1
        return <div>{error}</div> // 2
    }

    function navigateToSub(categoryId) { // 1
        navigate("/categories/" + categoryId) // 2
    }

    function navigateToArticleList(detailsUrl) { // 1
        localStorage.setItem("articlesUrl", detailsUrl) // 1
        navigate(location.pathname + "/articles") // 3
    }
}

// 70
