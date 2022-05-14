import React, {useState}  from "react";
import ResultTable from "./ResultTable";

export default function MainTable({database, setDatabase, pagesVisited, rowsPerPage, searchValue}){
    const [order, setOrder] = useState("ascending");
//sorting functions
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
    const sortOwner = () => {
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

    return (
        <table className={"main__table"}>
            <thead >
                <tr className={"main__table-head"} >
                    <th className={"main__table-cell"} onClick={database ? () => sortNumbers('id') : null}>ID</th>
                    <th className={"main__table-cell"} onClick={database ? () => sortName("name") : null}>Nazwa repozytorium</th>
                    <th className={"main__table-cell"} onClick={database ? () => sortOwner() : null}>Właściciel</th>
                    <th className={"main__table-cell"} onClick={database ? () => sortNumbers("stargazers_count") : null}>Ilość Gwiazdek</th>
                    <th className={"main__table-cell"} onClick={database ? () => sortNumbers("created_at") : null}>Data utworzenia</th>
                    <th className={"main__table-cell"}>Ulubione</th>
                </tr>
            </thead>
            <ResultTable
                database={database}
                pagesVisited={ pagesVisited }
                rowsPerPage={ rowsPerPage }
                searchValue={searchValue}
            />
            {/*<button onClick={() => console.log(favourites)} >test</button>*/}


        </table>
    )
}
