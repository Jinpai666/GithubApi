import React, {useEffect, useState} from "react";
import ResultTable from "./ResultTable";

export default function Main(){

// const url = `https://api.github.com/search/repositories?q=${react}`

    const [searchValue, setSearchValue] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [database, setDatabase] = useState(null);
    const [order, setOrder] = useState("ascending");

    useEffect(() => {
        async function getData() {
            const url = `https://api.github.com/search/repositories?q=${searchValue}`
            const response = await fetch(url);
            const responseJson = await response.json()
            await setDatabase(responseJson.items);
        }

        searchValue && getData()

    }, [searchValue])
    const sortNumbers = (column) => {
        if (order === "ascending") {
            const sorted = [...database].sort((a,b) =>
                a[column] >= b[column]  ? 1 : -1
            );
            setDatabase(sorted);
            setOrder("descending");
        }
        if (order === "descending") {
            const sorted = [...database].sort((a,b) =>
                a[column] <= b[column]  ? 1 : -1
            );
            setDatabase(sorted);
            setOrder("ascending");
        }
    }
    const sortOwner = (column) => {
        if (order === "ascending") {
            const sorted = [...database].sort(function (a,b) {
                return a.owner.login.localeCompare(b.owner.login, undefined, {sensitivity: 'base'});
            });
            setDatabase(sorted);
            setOrder("descending");
        }
        if (order === "descending") {
            const sorted = [...database].sort(function (a,b) {
                return b.owner.login.localeCompare(a.owner.login, undefined, {sensitivity: 'base'});
            });
            setDatabase(sorted);
            setOrder("ascending");
        }
    }
    const sortName = () => {
        if (order === "ascending") {
            const sorted = [...database].sort(function (a,b) {
                return a.name.localeCompare(b.name, undefined, {sensitivity: 'base'});
            });
            setDatabase(sorted);
            setOrder("descending");
        }
        if (order === "descending") {
            const sorted = [...database].sort(function (a,b) {
                return b.owner.login.localeCompare(a.owner.login, undefined, {sensitivity: 'base'});
            });
            setDatabase(sorted);
            setOrder("ascending");
        }
    }

    return  (
        <>
            {/*we could use it but due to limited requests it's not working well*/}
            {/*<input*/}
            {/*    onChange={(event) => setSearchValue(event.target.value)}*/}
            {/*    placeholder="Search..."*/}
            {/*/>*/}
            <input
                placeholder="Search..."
                onChange={event => {setSearchInput(event.target.value)}}
                onKeyPress={event => {
                    if (event.key === 'Enter') {
                        setSearchValue(searchInput);
                        console.log(searchValue)
                    }
                }}
            />
            <table>
                <thead>
                {order === "descending" ? <p>asc</p> : <p>desc</p>}
                    <tr>
                        <th onClick={() => sortNumbers('id')}>ID</th>
                        <th onClick={() => sortName("name")}>Nazwa repozytorium</th>
                        <th onClick={() => sortOwner()}>Właściciel</th>
                        <th onClick={() => sortNumbers("stargazers_count")}>Ilość Gwiazdek</th>
                        <th onClick={() => sortNumbers("created_at")}>Data utworzenia</th>
                        <th>Ulubione</th>
                    </tr>
                </thead>
            <ResultTable tabledata={database}/>
            </table>
        </>
    )
}
