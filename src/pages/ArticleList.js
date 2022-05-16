import React, { useEffect, useState } from 'react';
import '../style/ArticleList.css'
import { useNavigate } from "react-router-dom";
import API from "../service/API";

export default function ArticleList() {
    let navigate = useNavigate();

    const [articles, setArticles] = useState([])

    useEffect(() => {
        let url = localStorage.getItem("articlesUrl")

        API.other(url)
            .then(response => setArticles(response._embedded.articles))
    }, [])

    if (articles.length > 0) {
        return (
            <div className={"articleList"}>
                {articles.map(a => (
                    <div key={a.id} onClick={() => navigateToArticle(a._links.details.href)}>
                        <img src={a._links.preview.href} alt={""}/>
                    </div>
                ))}
            </div>
        )
    } else {
        return <div>Laden...</div>
    }

    function navigateToArticle(detailsUrl) {
        localStorage.setItem("articleUrl", detailsUrl)
        navigate("/article")
    }
}
