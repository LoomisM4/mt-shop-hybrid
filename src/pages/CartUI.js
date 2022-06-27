import React, { useEffect, useState } from 'react';
import Cart from '../objects/Cart'
import '../style/Cart.css'

export default function CartUI() { // 1
    const [articles, setArticles] = useState([]) // 2

    useEffect(() => { // 1
        setArticles(Cart.getCart().articles) // 3
    }, [])

    if (articles.length > 0) { // 3
        return ( // 1
            <div className={"cartDiv"}> <!-- 2 -->
                {articles.map(cartArticle => ( // 1
                    <div className={"cartItem"} key={cartArticle.article.articleId}> <!-- 5 -->
                        <div>{cartArticle.article.name}</div> <!-- 3 -->
                        <div className={"quantity"}> <!-- 2 -->
                            <div onClick={() => less(cartArticle)}>-</div> <!-- 3 -->
                            <div>{cartArticle.quantity}</div> <!-- 2 -->
                            <div onClick={() => more(cartArticle)}>+</div> <!-- 3 -->
                        </div>
                        <div className={"price"}>{cartArticle.getPositionPrice().toFixed(2)}</div> <!-- 4 -->
                    </div>
                ))}
                <div> <!-- 1 -->
                    Preis: {Cart.getCart().getTotalPrice().toFixed(2)} <!-- 3 -->
                </div>
                <button onClick={sendOrder}>Zahlungspflichtig bestellen</button> <!-- 2 -->
            </div>
        )
    } else { // 1
        return <div>Der Warenkorb ist leer</div> // 2
    }

    function less(cartArticle) { // 1
        Cart.getCart().removeArticle(cartArticle.article) // 3
        setArticles(Cart.getCart().articles) // 3
    }

    function more(cartArticle) { // 1
        Cart.getCart().addArticle(cartArticle.article) // 3
        setArticles(Cart.getCart().articles) // 3
    }

    function sendOrder() { // 1
        alert("Bestellung erfolgreich abgeschickt") // 1
        Cart.getCart().clear() // 2
        setArticles(Cart.getCart().articles) // 3
    }
}

// 66
