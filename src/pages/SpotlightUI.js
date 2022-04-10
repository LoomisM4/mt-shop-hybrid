import React, { useEffect, useState } from 'react';
import '../style/Spotlight.css'

export default function SpotlightUI() {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetch("https://shop.marcelwettach.eu/spotlight")
            .then(response => response.json())
            .then(response => setArticles(response._embedded.articles))
    }, [])

    if (articles.length > 0) {
        return (
            <div>
                {articles.map(a => (
                    <div key={a.id} onClick={() => navigateToDetails(a._links.details.href)}>
                        <img src={a._links.spotlightImage.href} alt={""}/>
                    </div>
                ))}
            </div>
        )
    } else {
        return <div>Laden...</div>
    }

    function navigateToDetails(detailsUrl) {
        localStorage.setItem("articleUrl", detailsUrl)
        window.location = "/article"
    }
}