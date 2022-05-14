import React, { useState, useEffect } from "react";

const getDate = (date) => {
    return date.slice(0,10).split('-').reverse().join('.')
}

export default function ResultTable({database, pagesVisited, rowsPerPage, searchValue}){

    const [favourites, setFavourites] = useState([]);
    const [favouritesIdCollection, setFavouritesIdCollection] = useState([]);

    // // local storage

    const saveToLocalStorage = (items) => {
        localStorage.setItem('fav-repos', JSON.stringify(items))
    };


    useEffect(() => {
      saveToLocalStorage(favourites)
    },[favourites]);


    const addFavourite = (event) => {
        console.log('add');
        const targetId = event.target.parentElement.parentElement.firstChild.innerHTML;
        const likedObj = database.filter(item => item.id === Number(targetId));
        const newList = [...favourites, likedObj ]
        const newCollection = [...favouritesIdCollection, Number(targetId)]
        console.log(newList)

        setFavourites(newList)
        setFavouritesIdCollection(newCollection);
        saveToLocalStorage(favourites);
    }

    const removeFavourite = (event) => {
        console.log('remove');
        const targetId = event.target.parentElement.parentElement.firstChild.innerHTML;
        const newList = favourites.filter(favourite => Number(favourite.id) !== Number(targetId));
        const newCollection = favouritesIdCollection.filter(item => Number(item) !== Number(targetId) )
        console.log(newList)
        setFavourites(newList)
        setFavouritesIdCollection(newCollection);
        saveToLocalStorage(favourites);
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
                            {favouritesIdCollection && favouritesIdCollection.includes(item.id)
                                ? <button key={idx} onClick={removeFavourite}>Unlike</button>
                                : <button key={idx} onClick={addFavourite}>Like</button>
                            }
                        </td>
                    </tr>
                )
                : <tr>
                    <th>Brak wyników wyszukiwania</th>
                </tr>
            }
            </tbody>
            <button onClick={() => console.log(database)} >database</button>
            <button onClick={() => console.log(favouritesIdCollection)} >favouritesIdCollection</button>
            <button onClick={() => console.log(favourites)} >fav</button>

        </>

    )}