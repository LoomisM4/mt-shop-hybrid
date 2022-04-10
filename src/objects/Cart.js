export default class Cart {
    articles = []

    static getCart() {
        let json = localStorage.getItem("cart")
        let cart = new Cart()
        if (json === null) {
            localStorage.setItem("cart", JSON.stringify(cart))
        } else {
            let obj = JSON.parse(json)
            let cartArticles = []
            obj.articles.forEach(a => {
                let cartArticle = new CartArticle(a.article, a.quantity)
                cartArticles.push(cartArticle)
            });
            cart.articles = cartArticles
        }

        return cart
    }

    addArticle(article) {
        let savedArticle = this.articles.find(a => a.article.id === article.id)

        if (savedArticle !== undefined) {
            savedArticle.quantity++
        } else {
            let a = new CartArticle(article, 1)
            this.articles.push(a)
        }

        localStorage.setItem("cart", JSON.stringify(this))
    }

    removeArticle(article) {
        let savedArticle = this.articles.find(a => a.article.id === article.id)

        if (savedArticle !== undefined && savedArticle.quantity > 0) {
            savedArticle.quantity--
        }

        localStorage.setItem("cart", JSON.stringify(this))
    }

    clear() {
        this.articles = []
        localStorage.setItem("cart", JSON.stringify(this))
    }

    getTotalPrice() {
        return this.articles.reduce((sum, a) => sum + a.getPositionPrice(), 0.0)
    }
}

class CartArticle {
    article
    quantity
    
    constructor(article, quantity) {
        this.article = article
        this.quantity = quantity
    }

    getPositionPrice() {
        return this.article.price * this.quantity
    }
}
