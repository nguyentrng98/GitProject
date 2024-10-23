import { useContext } from "react";
import { Link } from "react-router-dom";
import { InfoContext } from "../../context/infoContext";



export function Header() {
    // thông tin user
    let { user } = useContext(InfoContext);
    console.log("Header", user);
    return (
        <>
            <h1>Header</h1>

            <Link to={"/home"}>Home</Link> |
            <Link to={"/add"}>Add</Link> |
            <span>Username: {user.username}</span>
            <hr />
        </>
    )
}