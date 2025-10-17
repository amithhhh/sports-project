import React from "react";


export default function AddInfo() {
    return (
        <form>
            <input type="text" placeholder="mobile number" />
            <textarea placeholder="address" />
            <input type="text" placeholder="city" />
            <input type="text" placeholder="postal code" />
            <input type="text" placeholder="state" />
            <input type="text" placeholder="country" />
            <button type="submit">save</button>
        </form>
    )
}