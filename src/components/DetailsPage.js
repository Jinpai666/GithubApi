import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom"
import {Link} from "react-router-dom";


export default function DetailsPage(){
    const getDate = (date) => {
        return date.slice(0,10).split('-').reverse().join('.')
    }
    const {id} = useParams();
    const data = JSON.parse(localStorage.getItem('searchData'));
    const repository = data.filter(repo => repo.id === Number(id.slice(3)))[0];
    const favourites = JSON.parse(localStorage.getItem('fav-repos'));
    const combined = repository ? [...favourites,repository] : [...favourites];
    const filtered = combined ? combined.filter(repo => repo.id === Number(id.slice(3))) :  favourites;
    const final = filtered[0];
    return  (
        <>
            {final && final.length !== 0 && <div className={"details"}>
                <div className={"details__info"}>
                    <span className={"details__name"}>{final.name}</span>
                    by {final.owner.login}
                    <img
                    className={"details__avatar"}
                    src={final.owner.avatar_url}
                    alt="owner avatar"
                    />
                </div>
                <p className={"details__description"}>{final.description}</p>
                <Link className={"details__link"} to={final.url}>&#x1F517; URL</Link>
                <p className={"details__stars"}>&#x2B50; {final.stargazers_count}</p>
                <p className={"details__date"}>&#x1F382; {getDate(final.created_at)}</p>
            </div>}
            <button onClick={()=>console.log(repository)}>data</button>
            <button onClick={()=>console.log(repository)}>repository</button>
            <button onClick={()=>console.log(favourites)}>favourites</button>
            <button onClick={()=>console.log(combined)}>combined</button>
            <button onClick={()=>console.log(filtered)}>filtered</button>
            <button onClick={()=>console.log(final)}>final</button>

        </>

    )
}
