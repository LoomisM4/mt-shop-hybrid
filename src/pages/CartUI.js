import React, { useEffect, useState } from 'react';
import Cart from '../objects/Cart'
import '../style/Cart.css'

export default function CartUI() {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        setArticles(Cart.getCart().articles)
    }, [])

    if (articles.length > 0) {
        return (
            <div className={"cartDiv"}>
                {articles.map(cartArticle => (
                    <div className={"cartItem"} key={cartArticle.article.articleId}>
                        <div>{cartArticle.article.name}</div>
                        <div className={"quantity"}>
                            <div onClick={() => less(cartArticle)}>-</div>
                            <div>{cartArticle.quantity}</div>
                            <div onClick={() => more(cartArticle)}>+</div>
                        </div>
                        <div className={"price"}>{cartArticle.getPositionPrice().toFixed(2)}</div>
                    </div>
                ))}
                <div>
                    Preis: {Cart.getCart().getTotalPrice().toFixed(2)}
                </div>
                <button onClick={sendOrder}>Zahlungspflichtig bestellen</button>
            </div>
        )
    } else {
        return <div>Der Warenkorb ist leer</div>
    }

    function less(cartArticle) {
        Cart.getCart().removeArticle(cartArticle.article)
        setArticles(Cart.getCart().articles)
    }

    function more(cartArticle) {
        Cart.getCart().addArticle(cartArticle.article)
        setArticles(Cart.getCart().articles)
    }

    function sendOrder() {
        alert("Bestellung erfolgreich abgeschickt")
        Cart.getCart().clear()
        setArticles(Cart.getCart().articles)
    }
}
