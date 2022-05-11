import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom"

export default function DetailsPage(){
    let {id} = useParams();

    return  (
        <div>
            this is details page for {id}
        </div>
    )
}
