import { useState } from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IoMdMenu } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { FaUsersViewfinder } from "react-icons/fa6";
import { Link } from "react-router-dom";

function LandingNav() {


    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <div className="m-5">
                <p className="text-3xl font-bold text-black">
                    𝑭𝒓𝒆𝒆𝒍𝒂𝒏𝒐
                </p>
            </div>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <FaHome color="black" size={25} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <FaUsersViewfinder color="black" size={25} />
                    </ListItemIcon>
                    <ListItemText primary="Find Freelancer" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <FaUsersViewfinder color="black" size={25} />
                    </ListItemIcon>
                    <ListItemText primary="Find Works" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <Link to="/login">
                    <ListItemButton>
                        <ListItemIcon>
                            <Button variant="contained" color="primary" fullWidth>
                                Login
                            </Button>
                        </ListItemIcon>
                    </ListItemButton>
                </Link>
            </ListItem>
            <ListItem disablePadding>
                <Link to="/signup">
                    <ListItemButton>
                        <ListItemIcon>
                            <Button variant="contained" color="warning" fullWidth>
                                Sign Up
                            </Button>
                        </ListItemIcon>
                    </ListItemButton>
                </Link>
            </ListItem>
        </Box>
    );
    return (
        <div className="bg-white  shadow-xl top-0 left-0 w-full z-50">
            <div className="container mx-auto px-4 py-5 flex justify-between items-center">
                <p className="text-3xl font-bold text-black">
                    <Link to="/home"> 𝑭𝒓𝒆𝒆𝒍𝒂𝒏𝒐</Link>
                </p>
                <nav className="md:flex hidden items-center">
                    <ul className="flex flex-col items-center md:flex-row md:space-x-8">
                        <li className="py-2">
                            <a href="#" className="text-black font-bold hover:text-yellow-500">
                                Home
                            </a>
                        </li>
                        <li className="py-2">
                            <a href="#" className="text-black font-bold hover:text-yellow-500">
                                Find Work
                            </a>
                        </li>
                        <li className="py-2">
                            <a href="#" className="text-black font-bold hover:text-yellow-500">
                                Find Freelancers
                            </a>
                        </li>
                        <li className="py-2">
                            <Link to="/login">
                                <button
                                    className="px-4 py-2 rounded-md text-white bg-yellow-500 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                                >
                                    Login
                                </button>
                            </Link>
                        </li>
                        <li className="py-2">
                            <Link to="/signup">
                                <button
                                    className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                                >
                                    Sign Up
                                </button>
                            </Link>
                        </li>

                    </ul>
                </nav>
                <div className="block md:hidden">
                    <Button onClick={toggleDrawer(true)}><IoMdMenu size="30" /></Button>
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                </div>
            </div>
        </div>
    )
}


export default LandingNav;
