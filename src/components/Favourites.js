import React from "react";
import {Link} from "react-router-dom";


export default function Favourites(){
    const data =  JSON.parse(localStorage.getItem('fav-repos'));


    return  (
        <>
            <h2 className={"favourites__header"}>&#x2B50; Ulubione</h2>
            <ul className={"favourites"}>
                {data.map((fav, idx) => (
                    <li key={idx} ><Link className={"favourites__item"} to={`/favourites/${fav.id}`}>{fav.name}</Link></li>)
                )}
            </ul>
        </>
    )
}
