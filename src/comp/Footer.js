import React from "react";
import '../style/Footer.css';

export default function Footer() {
    return(
        <footer>
            <div className={"navLink"} onClick={() => window.location = "/"}>
                <div>
                    <img src="/img/star.png" alt={"star"}/>
                </div>
            </div>
            <div className={"navLink"} onClick={() => window.location = "/categories"}>
                <div>
                    <img src="/img/list.png" alt={"list"}/>
                </div>
            </div>
            <div className={"navLink"} onClick={() => window.location = "/cart"}>
                <div>
                    <img src="/img/cart.png" alt={"cart"}/>
                </div>
            </div>
            <div className={"navLink"} onClick={() => window.location = "/map"}>
                <div>
                    <img src="/img/map.png" alt={"map"}/>
                </div>
            </div>
        </footer>
    )
}
