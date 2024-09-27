import React from "react";
import {Link} from "react-router-dom";
import "./Header.css";

const Menu: React.FC = () => {
    return (
        <div className="menu">
            <Link to="/home">home</Link>
            <Link to="/projects">feet</Link>
            <Link to="/about">FEET</Link>
            <Link to="/contact">FEET</Link>
        </div>
    );
}

export default Menu;