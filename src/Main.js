import React, {useEffect, useState} from "react";
import ResultTable from "./ResultTable";
import "./scss/main.scss";
import ReactPaginate from "react-paginate";

export default function Main(){

// const url = `https://api.github.com/search/repositories?q=${react}`

    const [searchValue, setSearchValue] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [database, setDatabase] = useState(null);
    const [order, setOrder] = useState("ascending");
    const [clicked, setClicked] = useState("");

    useEffect(() => {
        async function getData() {
            const url = `https://api.github.com/search/repositories?q=${searchValue}`
            const response = await fetch(url);
            const responseJson = await response.json()
            await setDatabase(responseJson.items);
        }

        searchValue && getData()

    }, [searchValue])

    const sortNumbers = (column, event) => {
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

//paginate

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [pageNr, setPageNr] = useState(0);
    const pagesVisited = pageNr * rowsPerPage;
    const pageCount = database ? Math.ceil(database.length / rowsPerPage) : 0;
    const changePage = ({selected}) => {
        setPageNr(selected);
    }
    return  (
        <div  className={"main__section"}>
            <h1 className={"main__header"}>&#x1F3E0; Strona Główna</h1>
            <input
                className={"main__searchbox"}
                placeholder="Search..."
                onChange={event => {setSearchInput(event.target.value)}}
                onKeyPress={event => {
                    if (event.key === 'Enter') {
                        setSearchValue(searchInput);
                    }
                }}
            />
            {pageCount > 0 && <p> {`Strona ${pageNr + 1} z ${pageCount}`}</p>}
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
                tableData={database}
                pagesVisited={ pagesVisited }
                rowsPerPage={ rowsPerPage }
            />
            </table>
            <div className={"main__selection"}>
                <label htmlFor="main__selection">Wyników na stronę</label>
                <select name="main__selection" id="main__selection" onChange={(e) => {
                    const rows = e.target.value
                    setRowsPerPage(rows);
                    setPageNr(0);
                }} >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                </select>
            </div>
            <ReactPaginate
                containerClassName="main__pagination"
                previousClassName="main__pagination-button"
                nextClassName="main__pagination-button"
                pageLinkClassName="main__pages"
                // activeClassName="main__pagination-active-button"
                previousLabel="Poprzednia"
                nextLabel="Następna"
                onPageChange={changePage}
                pageCount={pageCount}
            />
        </div>
    )

}
