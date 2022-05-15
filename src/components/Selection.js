import React from "react";

export default function Selection({setRows, setPage}){

    return(
        <div className={"main__selection"}>
            <label htmlFor="selection">Wyników na stronę:</label>
            <select className={"main__selectionOptions"} name="selection" id="selection" onChange={(e) => {
                setRows(e.target.value)
                setPage(0);
            }} >
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>30</option>
            </select>
        </div>
    )
}

