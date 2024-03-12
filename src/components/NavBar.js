import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "../App.css"

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
                    <a href="index.html" className="brand-logo">
                            <img src="https://www.freepnglogos.com//uploads/netflix-logo-0.png" alt="IMDb" width={140} height={45} />
                    </a>
                    <ul id="navbar">
                            <li><a className="active" href="sass.html">Movies</a></li>
                            <li><a href="badges.html">TV Shows</a></li>
                            <li><a href="collapsible.html">Web Series</a></li>
                    </ul>
                    
            </div>
    </nav>
);
}

export default NavBar;