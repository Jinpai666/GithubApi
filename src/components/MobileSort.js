// import React from "react";
//
// export default function MobileSort({numbersClick, ownerClick, nameClick, clicked, setClicked}) {
//
//     return (
//         <div className={"main__sortSelection"}>
//             <label htmlFor="sortSelector">Sortuj po:</label>
//             {clicked === "owner" &&
//             <select className={"main__sortOptions"} name="sortSelector" onChange={(e) => {
//                 ownerClick(e, 'owner')
//             }}>
//                 <option value="" disabled selected>Wybierz...</option>
//                 <option value={"id"}>Id</option>
//                 <option value={"name"}>Nazwa</option>
//                 <option value={"owner"}>Właściciel</option>
//                 <option value={"stars"}>Gwiazdki</option>
//                 <option value={"date"}>Data</option>
//             </select>}
//             {clicked === "name" &&
//                 <select className={"main__sortOptions"} name="sortSelector" onChange={(e) => {
//                     nameClick(e, "name")
//                 }}>
//                     <option value="" disabled selected>Wybierz...</option>
//                     <option value={"id"}>Id</option>
//                     <option value={"name"}>Nazwa</option>
//                     <option value={"owner"}>Właściciel</option>
//                     <option value={"stars"}>Gwiazdki</option>
//                     <option value={"date"}>Data</option>
//                 </select>}
//             {clicked === "id" || clicked === "stars" || clicked === "date" &&
//                 <select className={"main__sortOptions"} name="sortSelector" onChange={(e) => {
//                     numbersClick(e, e.target.value)
//                 }}>
//                     <option value="" disabled selected>Wybierz...</option>
//                     <option value={"id"}>Id</option>
//                     <option value={"name"}>Nazwa</option>
//                     <option value={"owner"}>Właściciel</option>
//                     <option value={"stars"}>Gwiazdki</option>
//                     <option value={"date"}>Data</option>
//                 </select>}
//         </div>
//     )
// }