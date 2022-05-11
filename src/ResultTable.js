import React, {useEffect, useState} from "react";

const getDate = (date) => {
    return date.slice(0,10).split('-').reverse().join('.')
}

export default function ResultTable({tabledata}){
    const [favourite, setFavourite] = useState(false);
    const addFavourite = () => {
        console.log('add')
    }
    const removeFavourite = () => {
        console.log('remove')
    }

    return (
    <tbody>
        {tabledata && tabledata != 0
            ? tabledata.map((item, idx) =>
                <tr key={idx}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.owner.login}</td>
                    <td>{item.stargazers_count}</td>
                    <td>{getDate(item.created_at)}</td>
                    <td>
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
    )}