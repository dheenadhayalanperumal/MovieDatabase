import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Input } from "@mui/material";
import "../App.css"
import logo from "../image/logo.png";
import { Link, NavLink } from "react-router-dom";
import NowPlayA from "./NowplayingAll";

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
                <div><Link to={"/"}><img src={logo} alt="IMDb" /></Link></div>
                    
                    <div id="navbar">
                    <ul>
                            <li><NavLink to={"/"}>Home</NavLink></li>
                            <li><NavLink to={"/trend"}>Today Trend</NavLink></li>
                            <li><NavLink to={"/nowplay"}>Now Playing</NavLink></li>
                            <li><NavLink to={"/PopularA"}>Popular Movie</NavLink></li>
                            
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