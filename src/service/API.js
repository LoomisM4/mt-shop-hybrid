export default class API {
    static cacheName = "shopCache";

    static spotlight() {
        let url = "https://shop.marcelwettach.eu/spotlight";
        return this.other(url)
    }

    static other(url) {
        return this.webOrCache(url);
    }

    static async webOrCache(url) {
        try {
            let response = await cordovaFetch(url);
            let json = await response.json();
            if (response.status === 200) {
                console.log("caching")
                window.localStorage.setItem(url, JSON.stringify(json))
                return json
            } else {
                return this.serveFromCache(url)
            }
        } catch (e) {
            console.log(e)
            return this.serveFromCache(url);
        }
    }

    static async serveFromCache(url) {
        console.log("serving from cache")
        let response = window.localStorage.getItem(url)
        let json = JSON.parse(response)
        return json;
    }
}
