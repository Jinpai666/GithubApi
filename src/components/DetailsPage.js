import React from "react";
import { useParams } from "react-router-dom"

export default function DetailsPage(){
    const {id} = useParams();

    return  (
        <div>
            <p></p>
            <p>this is details page for {id}</p>
        </div>
    )
}
