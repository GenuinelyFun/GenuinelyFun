import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

const Menu: React.FC = () => {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/feet">Feet</Link>
        </div>
    );
}

export default Menu;