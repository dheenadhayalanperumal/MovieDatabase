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
            <a href="index.html" className="brand-logo">IMDB</a>
            <ul id="navbar">
                <li><a className="active" href="sass.html">Movies</a></li>
                <li><a href="badges.html">TV Shows</a></li>
                <li><a href="collapsible.html">Celebrities</a></li>
            </ul>
            <div id="mobile">
                <FontAwesomeIcon icon={showMenu ? "fas fa-times" : "fas fa-bars"} onClick={() => setShowMenu(!showMenu)} />
            </div>
            <form onSubmit={handleSearchSubmit}>
                <input type="text" value={search} onChange={handleSearchChange} placeholder="Search..." />
            </form>
            <button onClick={() => setShowMenu(!showMenu)}>
                {showMenu ? 'Close menu' : 'Open menu'}
            </button>
        </div>
    </nav>
);
}

export default NavBar;