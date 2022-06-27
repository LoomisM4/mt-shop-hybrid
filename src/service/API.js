export default class API { // 1
    static cacheName = "shopCache"; // 1

    static spotlight() { // 1
        let url = "https://shop.marcelwettach.eu/spotlight"; // 1
        return this.other(url) // 2
    }

    static other(url) { // 1
        return this.webOrCache(url); // 2
    }

    static async webOrCache(url) { // 1
        try { // 1
            let response = await cordovaFetch(url); // 2
            let json = await response.json(); // 2
            if (response.status === 200) { // 2
                console.log("caching")
                window.localStorage.setItem(url, JSON.stringify(json)) // 3
                return json // 1
            } else { // 1
                return this.serveFromCache(url) // 2
            }
        } catch (e) { // 1
            console.log(e)
            return this.serveFromCache(url); // 2
        }
    }

    static async serveFromCache(url) { // 1
        console.log("serving from cache")
        let response = window.localStorage.getItem(url) // 3
        return JSON.parse(response) // 2
    }
}

// 33
