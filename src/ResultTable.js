import React, { useState } from "react";

const getDate = (date) => {
    return date.slice(0,10).split('-').reverse().join('.')
}

export default function ResultTable({database, pagesVisited, rowsPerPage, searchValue}){

    const [clicked, setClicked] = useState("");
    const [favourites, setFavourites] = useState(false);

    async function test() {
        const url = `https://api.github.com/search/repositories?q=${searchValue}`
        const response = await fetch(url);
        const responseJson = await response.json()
        await setFavourites(responseJson.items);
        await console.log(responseJson.items);
    }
    const addFavourite = (event) => {
        console.log('add');
        const newList = [...favourites, ]
        const likedId = event.target.parentElement.parentElement.firstChild.innerHTML;
        console.log(likedId);
    }
    const removeFavourite = (event) => {
        console.log('remove')
        const newList = [...favourites ]
        const collectedID = event.target.parentElement.parentElement.firstChild.innerHTML
        const filteredData = database.map(el => el.id === collectedID)
        console.log(collectedID)
    }

    return (
        <>
            <tbody>
            {/* eslint-disable-next-line eqeqeq */}
            {database && database != 0
                // ? tableData.slice(pagesVisited, pagesVisited + rowsPerPage).map((item, idx) =>
                ? database.slice(pagesVisited, Number(pagesVisited) + Number(rowsPerPage)).map((item, idx) =>

                    <tr  className={"main__table-row"}   key={idx} >
                        <td className={"main__table-cell"}>{item.id}</td>
                        <td className={"main__table-cell"}>{item.name}</td>
                        <td className={"main__table-cell"}>{item.owner.login}</td>
                        <td className={"main__table-cell"}>{item.stargazers_count}</td>
                        <td className={"main__table-cell"}>{getDate(item.created_at)}</td>
                        <td className={"main__table-cell"}>
                            {/*{!favourites*/}
                            {/*    ? <button onClick={addFavourite}>Like</button>*/}
                            {/*    : <button onClick={removeFavourite}>Unlike</button>*/}
                            {/*}*/}
                                <button onClick={addFavourite}>
                                    Like
                                </button>

                        </td>
                    </tr>
                )
                : <tr>
                    <th>Brak wyników wyszukiwania</th>
                </tr>
            }
            </tbody>
            <button onClick={() => test()} >test</button>
        </>

    )}