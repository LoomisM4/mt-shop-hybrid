import React, { useEffect, useState } from 'react';
import '../style/Spotlight.css'
import { useNavigate } from "react-router-dom";
import API from "../service/API";

export default function SpotlightUI() {
    let navigate = useNavigate();

    const [articles, setArticles] = useState([])

    useEffect(() => {
        API.spotlight()
            .then(response => setArticles(response._embedded.articles))
            .catch(error => console.log(error))
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
        navigate("/article")
    }
}
