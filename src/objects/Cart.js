export default class Cart { // 1
    articles = [] // 1

    static getCart() { // 1
        let json = localStorage.getItem("cart") // 2
        let cart = new Cart() // 2
        if (json === null) { // 2
            localStorage.setItem("cart", JSON.stringify(cart)) // 2
        } else { // 1
            let obj = JSON.parse(json) // 2
            let cartArticles = [] // 1
            obj.articles.forEach(a => { // 2
                let cartArticle = new CartArticle(a.article, a.quantity) // 4
                cartArticles.push(cartArticle) // 1
            });
            cart.articles = cartArticles // 2
        }

        return cart // 1
    }

    addArticle(article) { // 1
        let savedArticle = this.articles.find(a => a.article.id === article.id) // 7

        if (savedArticle !== undefined) { // 2
            savedArticle.quantity++ // 2
        } else { // 1
            let a = new CartArticle(article, 1) // 2
            this.articles.push(a) // 2
        }

        localStorage.setItem("cart", JSON.stringify(this)) // 2
    }

    removeArticle(article) { // 1
        let savedArticle = this.articles.find(a => a.article.id === article.id) // 7

        if (savedArticle !== undefined && savedArticle.quantity > 0) { // 4
            savedArticle.quantity-- // 2
        }

        localStorage.setItem("cart", JSON.stringify(this)) // 2
    }

    clear() { // 1
        this.articles = [] // 1
        localStorage.setItem("cart", JSON.stringify(this)) // 2
    }

    getTotalPrice() { // 1
        return this.articles.reduce((sum, a) => sum + a.getPositionPrice(), 0.0) // 5
    }
}

class CartArticle { // 1
    constructor(article, quantity) { // 1
        this.article = article // 2
        this.quantity = quantity // 2
    }

    getPositionPrice() { // 1
        return this.article.price * this.quantity // 5
    }
}

// 82
