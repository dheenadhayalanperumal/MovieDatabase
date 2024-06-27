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
import { NavLink, Link } from "react-router-dom";
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
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${search}`);
    setSearch('');
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
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "#000" : "#fff",
              backgroundColor: isActive ? "#fff" : "transparent",
              padding: "10px",
              borderRadius: "5px",
            })}
          >
            {text}
          </NavLink>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link to={"/"} style={{ textDecoration: "none", color: "#000" }}>
          <img src={logo} alt="IMDb" height={30} width={124} />
        </Link>
      </Typography>
      <Divider />
      <List>
        {navLinks.map((link) => (
          <NavLinkItem key={link.path} {...link} />
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ bgcolor: 'black' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 10, display: { sm: "none" } }}
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
              sx={{ color: "white", mx: 5 }}
              value={search}
              onChange={handleSearchChange}
              placeholder="Search..."
              endAdornment={<FontAwesomeIcon icon={faSearch} />}
            />
          </form>

          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            {navLinks.map((link) => (
              <Button
                key={link.path}
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <NavLink
                  to={link.path}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "#000" : "#fff",
                    backgroundColor: isActive ? "#fff" : "transparent",
                    padding: "10px",
                    borderRadius: "5px",
                  })}
                >
                  {link.text}
                </NavLink>
              </Button>
            ))}
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
            keepMounted: true,
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
  window: PropTypes.func,
};

export default DrawerAppBar;
