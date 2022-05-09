import React, {useEffect, useState} from "react";

export default function Button(){

// const url = `https://api.github.com/search/repositories?q=${react}`

    const [p, setP] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [searchInput, setSearchInput] = useState('')

    useEffect( () =>{
        async function getData(){
            const url = `https://api.github.com/search/repositories?q=${searchValue}`
            const response = await fetch(url);
            const responseJson = await response.json()
            await setP(responseJson.items);
        }
        searchValue && getData()

    },[searchValue])

    const print = () => {
        console.log(searchValue)
    };
    return  (
        <>
            {/*limited requests*/}
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
            {p && p.map((item, idx) => <p key={idx}>{item.name}</p>)}
            <button onClick={print}>klik</button>
        </>
    )
}
