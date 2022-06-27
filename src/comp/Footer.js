import React from "react";
import '../style/Footer.css';
import { useNavigate } from "react-router-dom";

export default function Footer() { // 1
    let navigate = useNavigate(); // 2

    return( // 1
        <footer> <!-- 1 -->
            <div className={"navLink"} onClick={() => navigate("/")}> <!-- 4 -->
                <div> <!-- 1 -->
                    <img src="img/star.png" alt={"star"}/> <!-- 3 -->
                </div>
            </div>
            <div className={"navLink"} onClick={() => navigate("/categories")}> <!-- 4 -->
                <div> <!-- 1 -->
                    <img src="img/list.png" alt={"list"}/> <!-- 3 -->
                </div>
            </div>
            <div className={"navLink"} onClick={() => navigate("/cart")}> <!-- 4 -->
                <div> <!-- 1 -->
                    <img src="img/cart.png" alt={"cart"}/> <!-- 3 -->
                </div>
            </div>
            <div className={"navLink"} onClick={() => navigate("/map")}> <!-- 4 -->
                <div> <!-- 1 -->
                    <img src="img/map.png" alt={"map"}/> <!-- 3 -->
                </div>
            </div>
        </footer>
    )
}

// 38
