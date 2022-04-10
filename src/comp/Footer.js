import React from "react";
import '../style/Footer.css';
import { useNavigate } from "react-router-dom";

export default function Footer() {
    let navigate = useNavigate();

    return(
        <footer>
            <div className={"navLink"} onClick={() => navigate("/")}>
                <div>
                    <img src="img/star.png" alt={"star"}/>
                </div>
            </div>
            <div className={"navLink"} onClick={() => navigate("/categories")}>
                <div>
                    <img src="img/list.png" alt={"list"}/>
                </div>
            </div>
            <div className={"navLink"} onClick={() => navigate("/cart")}>
                <div>
                    <img src="img/cart.png" alt={"cart"}/>
                </div>
            </div>
            <div className={"navLink"} onClick={() => navigate("/map")}>
                <div>
                    <img src="img/map.png" alt={"map"}/>
                </div>
            </div>
        </footer>
    )
}
