import React, { useState } from "react";
import ReactPaginate from 'react-paginate';

const getDate = (date) => {
    return date.slice(0,10).split('-').reverse().join('.')
}

export default function ResultTable({tableData, pagesVisited, rowsPerPage}){
    const [favourite, setFavourite] = useState(false);
    const addFavourite = (repo) => {
        console.log('add')
        const newList = [...favourite, repo ]
        console.log(repo)
    }
    const removeFavourite = (event) => {
        console.log('remove')
        const newList = [...favourite ]
        const collectedID = event.target.parentElement.parentElement.firstChild.innerHTML
        const filteredData = tableData.map(el => el.id === collectedID)
        console.log(collectedID)
    }

    return (
        <>
            <tbody>
            {tableData && tableData != 0
                ? tableData.slice(pagesVisited, pagesVisited + rowsPerPage).map((item, idx) =>

                    <tr  className={"main__table-row"}   key={idx} >
                        <td className={"main__table-cell"}>{item.id}</td>
                        <td className={"main__table-cell"}>{item.name}</td>
                        <td className={"main__table-cell"}>{item.owner.login}</td>
                        <td className={"main__table-cell"}>{item.stargazers_count}</td>
                        <td className={"main__table-cell"}>{getDate(item.created_at)}</td>
                        <td className={"main__table-cell"}>
                            {!favourite
                                ? <button onClick={addFavourite}>Like</button>
                                : <button onClick={removeFavourite}>Unlike</button>
                            }
                        </td>
                    </tr>
                )
                : <tr>
                    <th>Brak wyników wyszukiwania</th>
                </tr>
            }
            </tbody>
        </>

    )}