import React from "react";
import {Link} from "react-router-dom";

export default function Header(){


    return  (
       <nav className={"header"}>
           <Link to="/" className={"header__link"} >&#x1F3E0; Strona Główna</Link>
           <Link to="favourites" className={"header__link"} >&#x2B50; Ulubione</Link>
       </nav>
    )
}
