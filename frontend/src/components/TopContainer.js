import React, {useEffect} from 'react'
import { BiSearchAlt, BiBell, BiChevronDown  } from "react-icons/bi";
import  spike  from "../images/spike.jpg"

function TopContainer() {

    useEffect(() => {
        const menuChevron= document.getElementById('menuChevron');
        const menuContainer = document.getElementById('menuContainer');
    
        menuChevron.addEventListener('mouseenter', () => {
            menuChevron.style.transform = "rotate(180deg)";
            menuContainer.style.transform = 'translatex(0px)';
        });
        menuContainer.addEventListener('mouseleave', () => {
            menuChevron.style.transform = "rotate(0deg)";
            menuContainer.style.transform = 'translatex(300px)';
        });
    }, []);
 
  return (
    <div className='topContainer'>
        <div className='inputBox'>
            <input type='text' placeholder='Rechercher'/>
            <i>
                <BiSearchAlt/>
            </i>
        </div>

        <div className="profileContainer">
            <i className="profileIcon">
            <BiBell/>
            </i>

            <div className="profileImage">
                <img src={spike} alt="" />
            </div>
            <p className="profileName">Alex Adams</p>
            <i className="menuChevron" id="menuChevron">
                <BiChevronDown/>
            </i>

            <div className="menuContainer" id="menuContainer">
                <ul>
                    <li>Profile</li>
                    <li>Compte</li>
                    <li>Se Deconnecter</li>
                </ul> 
            </div>
        </div>
    </div>
  )
}

export default TopContainer