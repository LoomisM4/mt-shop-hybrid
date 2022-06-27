import React from "react";
import '../style/Header.css';

export default function Header(props) { // 1
    const title = // 1
        <div> <!-- 1 -->
            <h1>{props.title}</h1> <!-- 2 -->
        </div>;

    return( // 1
        <header> <!-- 1 -->
            {title}
        </header>
    )
}

// 7
