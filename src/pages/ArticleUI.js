import React, { useEffect, useState } from 'react';
import Cart from '../objects/Cart'
import "../style/Details.css"
import API from "../service/API";

export default function ArticleUI() { // 1
    const [article, setArticle] = useState() // 2

    useEffect(() => { // 1
        let url = localStorage.getItem("articleUrl") // 2
        API.other(url) // 1
            .then(response => setArticle(response)) // 2
    }, [])

    if (article == null) { // 2
        return <div>Laden...</div> // 2
    } else { // 1
        return ( // 1
            <div> <!-- 1 -->
                <div className={"horizontalScroll"}> <!-- 2 -->
                    {article._links.images.map(i => ( <!-- 3 -->
                        <div className={"image"} key={i.id}> <!-- 4 -->
                            <img src={i.href} alt={""}/> <!-- 4 -->
                        </div>
                    ))}
                </div>
                <div className={"center"}> <!-- 2 -->
                    <button onClick={addToCart}>In den Warenkorb</button> <!-- 2 -->
                    <div className={"title"}>{article.name}</div> <!-- 3 -->
                    <div>{article.description}</div> <!-- 2 -->
                </div>
            </div>
        )
    }

    function addToCart() { // 1
        Cart.getCart().addArticle(article) // 2
    }
}

// 41
