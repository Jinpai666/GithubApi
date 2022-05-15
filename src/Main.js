import React, {useEffect, useState} from "react";
import "./scss/main.scss";
import ReactPaginate from "react-paginate";
import Selection from "./Selection";
import MainTable from "./MainTable";

export default function Main(){
//general states
    const searchValueFromSession = sessionStorage.getItem('searchResult');
    const [searchValue, setSearchValue] = useState(searchValueFromSession ? searchValueFromSession : '');
    const [searchInput, setSearchInput] = useState('');
    const [database, setDatabase] = useState(null);
//paginate states
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [pageNr, setPageNr] = useState(0);
    const pagesVisited = pageNr * rowsPerPage;
    const pageCount = database ? Math.ceil(database.length / rowsPerPage) : 0;
    const changePage = ({selected}) => {
        setPageNr(selected);
    }
//fetch data
    useEffect(() => {
        async function getData() {
            const url = `https://api.github.com/search/repositories?q=${searchValue}`
            const response = await fetch(url);
            const responseJson = await response.json()
            await setDatabase(responseJson.items);
        }
        searchValue && getData()
    }, [searchValue])

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
                        sessionStorage.setItem('searchResult',searchInput);
                    }
                }}
            />
            {pageCount > 0 && <p className={"main__pageCount"}> {`Strona ${pageNr + 1} z ${pageCount}`}</p>}
            {searchValue
                ? <MainTable
                    database={database}
                    setDatabase={setDatabase}
                    pagesVisited={pagesVisited}
                    rowsPerPage={rowsPerPage}
                    searchValue={searchValue}
                />
                : <h2 className={"main__greeting"}>Wpisz nazwę repozytorium żeby rozpocząć wyszukiwanie</h2>
            }
            <Selection setRows={setRowsPerPage} setPage={setPageNr}/>
            <ReactPaginate
                containerClassName="main__pagination"
                previousClassName="main__paginationButton"
                nextClassName="main__paginationButton"
                pageLinkClassName="main__pages"
                // activeClassName="main__pagination-active-button"
                previousLabel="Poprzednia"
                nextLabel="Następna"
                onPageChange={changePage}
                pageCount={pageCount}
            />
            {/*<button onClick={()=> console.log(sessionStorage.getItem('searchResult'))}>test</button>*/}
        </div>
    )

}
