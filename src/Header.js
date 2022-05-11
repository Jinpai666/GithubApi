import React, {useEffect, useState} from "react";
import ResultTable from "./ResultTable";
import {Link} from "react-router-dom";

export default function Header(){


    return  (
       <nav>
           <Link to="/">Strona Główna</Link>
           <Link to="favourites"> Ulubione</Link>
       </nav>
    )
}
