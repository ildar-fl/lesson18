import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function NavProfile() {
    const { user } = useAuth();
    const [isOpen, setOpen] = useState();

    const toggleMenu = () => {
        setOpen((prev) => !prev);
    };
    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{user.name}</div>
                <img
                    src={user.image}
                    className="img-responsive rounded-circle"
                    alt="avatar"
                    height={40}
                />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                <Link to={`/users/${user._id}`} className="dropdown-item">
                    Profile
                </Link>
                <Link to={`/logout`} className="dropdown-item">
                    Log out
                </Link>
            </div>
        </div>
    );
}

export { NavProfile };
