import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BaseUrl, post } from "../services/Endpoint";
import { removeUser } from "../redux/AuthSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate =useNavigate()
  console.log("user", user);

  const handleLogout = async () => {
    try {
      const res = await post('/auth/logout')
      const data = res.data
      console.log(data) 
      if (res.status === 200) {
        navigate("/login");
        toast.success(data.message);
        dispatch(removeUser())
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="backdrop-opacity-50 bg-white/30   p-4">
      <div className="flex justify-between items-center">
        <Link to={"/"}>
          <div className="text-white font-semibold text-[1.5rem]">LOGO</div>
        </Link>
        <div>
          {!user ? (
            <Link to={"/login"}>
              <button className="p-[5px_28px_6px]    bg-indigo-700 rounded-[6px] text-white font-semibold ">
                Sign in
              </button>
            </Link>
          ) : (
            <div className="Avatars relative">
              <img
                id="avatarButton"
                type="button"
                data-dropdown-toggle="userDropdown"
                data-dropdown-placement="bottom-start"
                className="w-12 h-12 rounded-full cursor-pointer object-cover"
                // src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1729629264~exp=1729632864~hmac=832945374e94c2b84b329d7beca883a12918328c647be5c84e4f2084cb562735&w=740"
                src={`${BaseUrl}/images/${user.profile}`}
                alt="User dropdown"
              />
              {/* Dropdown menu */}
              <div
                id="userDropdown"
                className="z-10  absolute translate-x-[-122px] translate-y-[26px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div>{user.FullName}</div>
                  <div className="font-medium truncate">{user.email}</div>
                </div>
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="avatarButton"
                >
                  {/* {console.log('role',user.role)} */}
                  {user.role == "admin" ? (
                    <li>
                      <Link
                        to={"/dashboard"}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}

                  <li>
                    <Link
                      to={"/profile/85638947"}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Profile
                    </Link>
                  </li>
                </ul>
                <div className="py-1">
                  <Link
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </Link>
                </div>
              </div>
            </div>
          )}
          {/* */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;