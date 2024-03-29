import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink,Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../image/dheena.png";



const drawerWidth = 220;
const navLinks = [
    { path: "/", text: "Home" },
  { path: "/PopularA", text: "Popular Movies" },
  { path: "/toprated", text: "Top Rated" },
  { path: "/nowplay", text: "Now Playing" },
];


function DrawerAppBar(props) {
  
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleMouseDown = () => {
    setMouseDown(true);
  };

  const handleMouseUp = () => {
    setMouseDown(false);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${search}`);
    setSearch('')
   
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const NavLinkItem = ({ path, text }) => (
    <ListItem disablePadding>
      <ListItemButton sx={{ textAlign: "center" }}>
        <ListItemText>
          <NavLink
            to={path}
            style={{ textDecoration: "none", color: "#fff"}}
          >
            {text}
          </NavLink>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center"}}>
      <Typography variant="h6" sx={{ my: 2 }}>
                        <Link to={"/"} style={{ textDecoration: "none", color: "#000" }}><img src={logo} alt="IMDb" height={30} width={124} /></Link>
      </Typography>
      <Divider />
      <List>
        {navLinks.map((link) => (
          <NavLinkItem key={link.path} {...link} />
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

return (
  
    <Box sx={{ display: "flex"}}>
        <CssBaseline />
        <AppBar component="nav"  sx={{bgcolor:'black' }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr:10, display: { sm: "none" } }}
                >
                    <MenuIcon />
                </IconButton>
                
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                >
                    <Link to={"/"} style={{ textDecoration: "none", color: "#fff" }}>
                    <div><Link to={"/"}><img src={logo} alt="IMDb" height={30} width={'auto'} /></Link></div>
                    </Link>
                    </Typography>
                   
                <form onSubmit={handleSearchSubmit}>
                    <Input
                        sx={{ color: "white",
                        mx:5
                        }} // Add outline style here
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        endAdornment={<FontAwesomeIcon icon={faSearch} />}
                    />
                </form>
                <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                    <Button  style={{backgroundColor: mouseDown ? 'red' : 'black'}}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}>
                        <NavLink
                            to={"/PopularA"}
                            style={{ textDecoration: "none", color: "#fff" }}
                        >
                            Popular
                        </NavLink>
                    </Button>

                    <Button  style={{backgroundColor: mouseDown ? 'red' : 'black'}}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}>
                        <NavLink
                            to={"/toprated"}
                            style={{ textDecoration: "none", color: "#fff" }}
                        >
                            Top Rated
                        </NavLink>
                    </Button>
                    <Button style={{backgroundColor: mouseDown ? 'red' : 'black'}}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}>
                        <NavLink
                            to={"/nowplay"}
                            style={{ textDecoration: "none", color: "#fff" }}
                        >
                            Now Playing
                        </NavLink>
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
        <nav>
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                        backgroundColor: "black"
                    },
                }}
            >
                {drawer}
            </Drawer>
        </nav>
        <Box component="main" sx={{ p: 1 }}>
        <Toolbar />
      </Box>
    </Box>
  
    
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;


