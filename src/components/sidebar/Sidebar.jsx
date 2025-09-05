import React from 'react';
import "./sidebar.scss";
import { useNavigate, Link} from 'react-router-dom';
import {
    Add,
    CalendarMonthOutlined, 
    Checklist, 
    Logout, 
    Menu,
    NavigateNext, 
    SearchOutlined, 
    StickyNote2
} from "@mui/icons-material";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogOut = ()=> {
        navigate('/login')
    }
  return (
    <div className='sidebar'>
        <div className="top">
            <div className="menu">
                <span className="menu-title">Menu</span>
                <Menu/>
            </div>
            <div className="search">
                <input type="text" placeholder='Search' />
                <SearchOutlined/>
            </div>
        </div>
        <div className="center">
            <ul>
                <p className='title'> TASKS</p>
                <Link to="/home" style={{textDecoration:"none"}}>
                <li>
                    <NavigateNext className='icon'/>
                    <span>Upcoming</span>
                    <div className="counter">5</div>
                </li>
                </Link>
                <Link to="/day" style={{textDecoration:"none"}}>
                <li>
                    <Checklist className='icon'/>
                    <span>Today</span>
                    <div className="counter">4</div>
                </li>
                </Link>
                <Link to="/calendar" style={{textDecoration:"none"}}>
                <li>
                    <CalendarMonthOutlined className='icon'/>
                    <span>Calendar</span>
                </li>
                </Link>
                <Link to="/sticky" style={{textDecoration:"none"}}>
                <li>
                    <StickyNote2 className='icon'/>
                    <span>Sticky Wall</span>
                </li>
                </Link>

            <p className="title">CATEGORY</p>
                <li>
                    <div className="color" style={{ backgroundColor: "#e74c3c" }}></div>
                    <span>Personal</span>
                    <div className="counter">5</div>
                </li>
                <li>
                    <div className="color" style={{ backgroundColor: "#3498db" }}></div>
                    <span>Work</span>
                    <div className="counter">10</div>
                </li>
                <li>
                    <div className="color" style={{ backgroundColor: "#f1c40f" }}></div>
                    <span>Other</span>
                    <div className="counter">8</div>
                </li>
            </ul>
            <p className="title">TAGS</p>
            <div className="tags">
                <div className="tag" style={{backgroundColor: "blue"}}>
                    <span style={{color: "white"}}>TAG 1</span>
                </div>
                <div className="tag" style={{backgroundColor: "green"}}>
                    <span style={{color: "white"}}>TAG 2</span>
                </div>
                <div className="tag add-tag">
                    <input 
                        type="text" 
                        placeholder='New tag name' 
                        style={{
                            border:"None", 
                            background:"transparent", 
                            outline:"none",
                            width:"80%",
                            color:"#333",
                        }}
                    />
                    <Add style={{fontSize:"18px", cursor:"pointer"}}/>
                </div>
            </div>
        </div>
        <br />
        <div className="bottom">
            <ul>
                <li onClick={handleLogOut}>
                    <Logout className='icon'/>
                    <span>Sign out</span>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar