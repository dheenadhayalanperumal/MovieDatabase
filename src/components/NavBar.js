import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Input } from "@mui/material";
import "../App.css"
import logo from "../image/logo.png";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log(search); // Replace this with your search function
  };

return (
    <nav>
            <div className="nav">
                <div>
                    <a href="index.html" className="brand-logo">
                            <img src={logo} alt="IMDb" />
                    </a>
                    </div>
                    <div id="navbar">
                    <ul>
                            <li><a className="active" href="sass.html">Movies</a></li>
                            <li><a href="badges.html">TV Shows</a></li>
                            <li><a href="collapsible.html">Web Series</a></li>
                            <li>
                            <Input sx={{ color: 'white'}}
                                value={search}
                                onChange={handleSearchChange}
                                placeholder="Search..."
                                endAdornment={
                                    <FontAwesomeIcon icon={faSearch} />
                                }
                            />
                            </li>
                    </ul>
                    </div>
                    
            </div>
    </nav>
);
}

export default NavBar;