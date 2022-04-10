import React from "react";
import '../style/Header.css';

export default function Header(props) {
    const title = 
        <div>
            <h1>{props.title}</h1>
        </div>;

    return(
        <header>
            {title}
        </header>
    )
}