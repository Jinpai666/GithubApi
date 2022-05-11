import React from "react";
import {Link} from "react-router-dom";

export default function Header(){


    return  (
       <nav>
           <Link to="/">&#x1F3E0; Strona Główna</Link>
           <Link to="favourites">&#x2B50; Ulubione</Link>
       </nav>
    )
}
