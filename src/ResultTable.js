import React, { useState, useEffect } from "react";

const getDate = (date) => {
    return date.slice(0,10).split('-').reverse().join('.')
}

export default function ResultTable({database, pagesVisited, rowsPerPage}){
    const favsFromLocalStorage = JSON.parse(localStorage.getItem('fav-repos'));
    const [favourites, setFavourites] = useState(favsFromLocalStorage && favsFromLocalStorage.length > 0 ? favsFromLocalStorage : []);
    const idsFromLocalStorage = JSON.parse(localStorage.getItem('fav-ids'));

    const [favouritesIdCollection, setFavouritesIdCollection] = useState(idsFromLocalStorage && idsFromLocalStorage.length > 0 ? idsFromLocalStorage : []);

//local storage

    useEffect(() => {
        localStorage.setItem('fav-repos', JSON.stringify(favourites))
    },[favourites])
    useEffect(() => {
        localStorage.setItem('fav-ids', JSON.stringify(favouritesIdCollection))
    },[favouritesIdCollection])

//favourites functions
    const addFavourite = (event) => {
        console.log('add');
        const targetId = event.target.parentElement.parentElement.firstChild.innerHTML;
        const likedObj = database.filter(item => item.id === Number(targetId));
        const newList = [...favourites, ...likedObj ]
        const newCollection = [...favouritesIdCollection, Number(targetId)]
        setFavourites(newList);
        setFavouritesIdCollection(newCollection);
    }

    const removeFavourite = (event) => {
        console.log('remove');
        const targetId = event.target.parentElement.parentElement.firstChild.innerHTML;
        const newList = [...favourites].filter(favourite => Number(favourite.id) !== Number(targetId));
        const newCollection = [...favouritesIdCollection].filter(item => Number(item) !== Number(targetId) )
        console.log(newList)
        setFavourites(newList)
        setFavouritesIdCollection(newCollection);
    }

    return (
        <>
            <tbody>
            {database && database.length !== 0
                ? database.slice(pagesVisited, Number(pagesVisited) + Number(rowsPerPage)).map((item, idx) =>
                    <tr  className={"main__tableRow"}   key={idx} >
                        <td className={"main__tableCell"}>{item.id}</td>
                        <td className={"main__tableCell"}>{item.name}</td>
                        <td className={"main__tableCell"}>
                            <div className={"main__userContainer"}>
                                <img
                                    className={"main__avatar"}
                                    src={item.owner.avatar_url}
                                    alt="owner avatar"
                                />
                                <p>{item.owner.login}</p>
                            </div>

                        </td>
                        <td className={"main__tableCell"}>{item.stargazers_count}</td>
                        <td className={"main__tableCell"}>{getDate(item.created_at)}</td>
                        <td className={"main__tableCell"}>
                            {favouritesIdCollection && favouritesIdCollection.includes(item.id)
                                ? <button key={idx} onClick={removeFavourite} className={"main__likeButton"} >Usuń z ulubionych</button>
                                : <button key={idx} onClick={addFavourite} className={"main__likeButton"}>Dodaj do ulubionych</button>
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