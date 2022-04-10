import React, { useEffect, useState } from 'react';
import '../style/ArticleList.css'

export default function ArticleList() {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        let url = localStorage.getItem("articlesUrl")
        fetch(url)
            .then(response => response.json())
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
        window.location = "/article"
    }
}