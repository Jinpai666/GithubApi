import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom"
import {Link} from "react-router-dom";


export default function DetailsPage(){
    const getDate = (date) => {
        return date.slice(0,10).split('-').reverse().join('.')
    }
    const {id} = useParams();
    const data = JSON.parse(localStorage.getItem('searchData'));
    const repository = data && data.filter(repo => Number(repo.id) === Number(id.slice(3)))[0];
    return  (
        <>
            {repository && repository.length !== 0 && <div className={"details"}>
                <div className={"details__info"}>
                    <span className={"details__name"}>{repository.name}</span>
                    by {repository.owner.login}
                    <img
                    className={"details__avatar"}
                    src={repository.owner.avatar_url}
                    alt="owner avatar"
                    />
                </div>
                <p className={"details__description"}>{repository.description}</p>
                <Link className={"details__link"} to={repository.url}>&#x1F517; URL</Link>
                <p className={"details__stars"}>&#x2B50; {repository.stargazers_count}</p>
                <p className={"details__date"}>&#x1F382; {getDate(repository.created_at)}</p>
                {/*<button onClick={()=>console.log(repository)}>test</button>*/}
            </div>}
        </>

    )
}
