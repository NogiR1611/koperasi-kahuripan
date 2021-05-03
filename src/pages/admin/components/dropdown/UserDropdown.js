import React from "react";
import { createPopper } from "@popperjs/core";

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const [username,setUsername] = React.useState('');
  const [redirect,setRedirect] = React.useState(true);
  const [isLoggedIn,setIsLoggedIn] = React.useState(true);
  const btnDropdownRef = React.createRef(); 
  const popoverDropdownRef = React.createRef();

  React.useEffect( () => {
    const admin = localStorage["UserData"];
    let parseAdmin = JSON.parse(admin);
    setUsername( parseAdmin.username );
  },[]);

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const logout = () => {
    let userData = {
        username : '',
        isLoggedIn : false
    }

    localStorage["UserData"] = JSON.stringify(userData);
    localStorage.removeItem("TOKEN_KEY");
    setUsername(userData.username);
    setRedirect(!redirect);
    setIsLoggedIn(!isLoggedIn);
  }
  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={require("./../../../../assets/admin/img/blank-profile-picture.png").default}
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <p
          className={
            "text-base py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
        >
          {username}
        </p>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={logout}
        >
          Keluar
        </a>
      </div>
    </>
  );
};

export default UserDropdown;