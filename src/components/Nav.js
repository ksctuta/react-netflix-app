import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Nav.css";
export default function Nav() {

    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener("scroll", () => {
            //console.log(window.scrollY);
            if (window.scrollY > 50) {
                setShow(true)
            }
            else {
                setShow(false)
            }
        })

        return () => {
            window.removeEventListener("scroll", () => { });
        }
    }, [])

    const handleChange = (event) => {
        setSearchValue(event.target.value);
        navigate(`/search?q=${event.target.value}`);
    };

    return (
        <nav className={`nav ${show && "nav__black"} `}>
            <img alt='Netflix Logo' className="nav__logo" onClick={() => window.location.href = "/"}
                //src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png' 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
            />

            <input type='text' value={searchValue} onChange={handleChange} className='nav__input' placeholder='영화를 검색해주세요.'/>


            <img alt='User logged' className="nav__avatar"
                //src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' 
                src="https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
            />
        </nav>
    )
}
