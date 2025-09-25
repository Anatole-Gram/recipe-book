import React from "react";

export default function  HeaderMenu () {
    function click () {
        alert(`Click!`)
    }
    return (
        <button onClick={click}>Кнопка</button>
    )
}