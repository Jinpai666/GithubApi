import React, {useState}  from "react";
import ResultTable from "./ResultTable";

export default function MainTable({database, setDatabase, pagesVisited, rowsPerPage}){
    const [order, setOrder] = useState("ascending");

//sorting functions
    const triangle = order === 'ascending' ? "&#x1F53A;" : "&#x1F53B;"
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
//handle clicks
   const [clicked,setClicked] = useState(null)
    const handleNumbersClick =  (event, sortBy) => {
        sortNumbers(sortBy);
        setClicked(event.target.innerHTML)
    }
    const handleNameClick =  (event, sortBy) => {
        sortName(sortBy);
        setClicked(event.target.innerHTML)
    }
    const handleOwnerClick =  (event, sortBy) => {
        sortOwner(sortBy);
        setClicked(event.target.innerHTML)
    }
    return (
        <table>
            <thead className={"main__table"} >
                <tr className={"main__tableHead"} >
                    <th className={"main__tableCell"} onClick={database ? (event) => handleNumbersClick(event,'id') : null}> ID </th>
                    <th className={"main__tableCell"} onClick={database ? (event) => handleNameClick(event) : null}>Nazwa repozytorium</th>
                    <th className={"main__tableCell"} onClick={database ? (event) => handleOwnerClick(event) : null}>Właściciel</th>
                    <th className={"main__tableCell"} onClick={database ? (event) => handleNumbersClick(event,'stargazers_count') : null}>Liczba gwiazdek </th>
                    <th className={"main__tableCell"} onClick={database ? (event) => handleNumbersClick(event,'created_at') : null}>Data utworzenia </th>
                    <th className={"main__tableCell"}>Ulubione</th>
                </tr>
            </thead>
            <ResultTable
                database={database}
                pagesVisited={ pagesVisited }
                rowsPerPage={ rowsPerPage }
            />
            <button onClick={() => console.log(clicked)}>test</button>
        </table>
    )
}
