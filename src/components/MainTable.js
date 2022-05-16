import React, {useState} from "react";
import ResultTable from "./ResultTable";

export default function MainTable({database, setDatabase, pagesVisited, rowsPerPage}){
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
//handle clicks
   const [clicked,setClicked] = useState(null)



    const handleNumbersClick =  (event, sortBy) => {
        sortNumbers(sortBy);
        setClicked(event.currentTarget.id)
        console.log(order)
    }
    const handleNameClick =  (event, sortBy) => {
        sortName(sortBy);
        setClicked(event.currentTarget.id)
        console.log(order)

    }
    const handleOwnerClick =  (event, sortBy) => {
        sortOwner(sortBy);
        setClicked(event.currentTarget.id)
        console.log(order)

    }
    return (    <table> <thead className={"main__table"} >
        <tr className={"main__tableHead"}  >
            { clicked === 'id'
                ? <th className={"main__tableCell-top main__tableCell"}
                      id={"id"}
                      onClick={database ? (event) =>
                          handleNumbersClick(event,'id') : null}>
                    <div className={"main__cellContainer"}>
                        <span>ID</span>
                        {order === 'ascending' ? <span>&#x1F53A;</span> : <span>&#x1F53B;</span>}
                    </div>
                </th>
                : <th className={"main__tableCell-top main__tableCell"}
                      id={"id"}
                      onClick={database ? (event) =>
                          handleNumbersClick(event,'id') : null}>
                    ID</th>}
            { clicked === 'name'
                ? <th className={"main__tableCell-top main__tableCell"}
                      id={"name"}
                      onClick={database ? (event) =>
                          handleNameClick(event) : null}>
                    <div className={"main__cellContainer"}>
                        <span>Nazwa repozytorium</span>
                        {order === 'ascending' ? <span>&#x1F53A;</span> : <span>&#x1F53B;</span>}
                    </div>
                </th>
                : <th className={"main__tableCell-top main__tableCell"}
                      id={"name"}
                      onClick={database ? (event) =>
                          handleNameClick(event) : null}>
                    Nazwa repozytorium</th>}
            { clicked === 'owner'
                ? <th className={"main__tableCell-top main__tableCell"}
                                        id={"owner"}
                                        onClick={database ? (event) =>
                                            handleOwnerClick(event) : null}>
                    <div className={"main__cellContainer"}>
                        <span>Właściciel</span>
                        {order === 'ascending' ? <span>&#x1F53A;</span> : <span>&#x1F53B;</span>}
                    </div>
                </th>
                : <th className={"main__tableCell-top main__tableCell"}
                      id={"owner"}
                      onClick={database ? (event) =>
                          handleOwnerClick(event) : null}>
                    Właściciel</th>}
            { clicked === 'stars'
                ? <th className={"main__tableCell-top main__tableCell"}
                                        id={"stars"}
                                        onClick={database ? (event) =>
                                            handleNumbersClick(event, 'stargazers_count') : null}>
                    <div className={"main__cellContainer"}>
                        <span>Liczba gwiazdek</span>
                        {order === 'ascending' ? <span>&#x1F53A;</span> : <span>&#x1F53B;</span>}
                    </div>
                </th>
                : <th className={"main__tableCell-top main__tableCell"}
                      id={"stars"}
                      onClick={database ? (event) =>
                          handleNumbersClick(event, 'stargazers_count') : null}>
                    Liczba gwiazdek</th>}
            { clicked === 'date'
                ? <th className={"main__tableCell-top main__tableCell"}
                                        id={"date"}
                                        onClick={database ? (event) =>
                                            handleNumbersClick(event,'created_at') : null}>
                    <div className={"main__cellContainer"}>
                        <span>Data utworzenia</span>
                        {order === 'ascending' ? <span>&#x1F53A;</span> : <span>&#x1F53B;</span>}
                    </div>
                </th>
                : <th className={"main__tableCell-top main__tableCell"}
                      id={"date"}
                      onClick={database ? (event) =>
                          handleNumbersClick(event,'created_at') : null}>
                    Data utworzenia</th>}
                <th className={"main__tableCell-top main__tableCell"} >Ulubione</th>
            </tr>
            </thead>
            <ResultTable
                database={database}
                pagesVisited={ pagesVisited }
                rowsPerPage={ rowsPerPage }
            />
        </table>
    )
}
