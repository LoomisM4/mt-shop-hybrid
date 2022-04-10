import React, { useEffect, useState } from 'react';
import Cart from '../objects/Cart'
import "../style/Details.css"

export default function ArticleUI() {
    const [article, setArticle] = useState()

    useEffect(() => {
        let url = localStorage.getItem("articleUrl")
        fetch(url)
            .then(response => response.json())
            .then(response => setArticle(response))
    }, [])

    if (article == null) {
        return <div>Laden...</div>
    } else {
        return (
            <div>
                <div className={"horizontalScroll"}>
                    {article._links.images.map(i => (
                        <div className={"image"} key={i.id}>
                            <img src={i.href} alt={""}/>
                        </div>
                    ))}
                </div>
                <div className={"center"}>
                    <button onClick={addToCart}>In den Warenkorb</button>
                    <div className={"title"}>{article.name}</div>
                    <div>{article.description}</div>
                </div>
            </div>
        )
    }

    function addToCart() {
        Cart.getCart().addArticle(article)
    }
}
