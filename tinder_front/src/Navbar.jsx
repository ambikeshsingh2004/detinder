import axios from "axios";
//import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify/unstyled";
import { removeUser } from "./utils/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  let x = async () => {
    console.log("logout was called");
    try {
      // console.log("logout was called");
      const res = await axios.post(
        "http://localhost:4444/logout",
        {},
        {
          withCredentials: true,
        }
      );
      // dispatch(removeUser());
      // console.log(res.data);
      // navigate("/");
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            DeTinder
          </Link>
        </div>
        {user && (
          <div className="flex gap-4">
            <button
              className="w-20 h-10 bg-gray-400 rounded-lg "
              onClick={async () => {
                console.log("logout was called");
                try {
                  // console.log("logout was called");
                  const res = await axios.post(
                    "http://localhost:4444/logout",
                    {},
                    {
                      withCredentials: true,
                    }
                  );
                  dispatch(removeUser());
                  // console.log(res.data);
                  navigate("/login");
                } catch (err) {
                  console.log(err.message);
                  toast.error(err.message);
                }
              }}
            >
              Logout
            </button>
            <div className="dropdown dropdown-end ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAY1BMVEUAAAD////19fX5+fnv7+9xcXEgICDm5ubOzs6urq7p6ek7OzvR0dH8/Pzd3d2SkpKnp6eEhIQpKSkMDAzGxsa1tbUyMjJ3d3egoKB+fn6/v78TExNnZ2dERERMTExRUVFeXl7qv6XtAAAHM0lEQVR4nM2c2aKqIBSGSUxzzkozh63v/5Q7xxyAtVDM/otzc8r9ibCGH4yc1klLHSLWPTFXXvtE1n0tKgGkWnHyTagHNEqDLt+CoiEW6a3Xd6BcCaS3CvcLUMFdDopkj72h6FkSqdZ1ZyjMolsq2hNKW8dEiGRskIKqVjIRIjevZKBeq5mIIRWwJKCi9UyEON4uUOYWJkKee0B51TYoku4AZW1kIoamHIoaW6FIoBwq2MxEDF8xlB5vhyKhYqirAiZCdKVQ9A//lzP+7MMWVzgoX4LJ5k8/BzlUOCh8gnHMk3bj/i+yXEBBeeiavBkLfj4645INCuqBrTbPzfPx+JUg7vmhoBIk04u2nze5DxCXazBQNMcxfWZMyvtIpQxKR6WYeFzI8bowXAWDgUIFhJxOvvNkf8pANVwYKEx1Z82GQK84n1MFxbnr8TAtvQzK/haqVMBAgf5KRBnfoszI/sRMKgSUJ64Q7iGverswMmaBKfUQUKZw8VWCKkmPFlE3w4RPBJQonp+h1XR5zhpYWw0Uf/FVLmKG6L5rhXmeqYXiJJlbKGUfXr8AZVjoirtVH4Exd4KAWqaMUm6QGulF+13MvcBQC0sqeGBrbdZlMHkGhhr7P0YVrPahu1iK8V9gqH7c3+s/8mVsCjYUpqKCoWwDf4sidX0/JiPDUL3bsvq5derCHcbUw0NJhgAeFKZMgKF8tVBnJVC9mb/CpJ+om1OFEqgLUTPRu8TgKIHq8zGqkBWoCwkxqyCUhuozKd7zYqvLVgZiFcNQfVWbb2PSqvYyGcK8hqH6BiDeBmX3RTXC5IChqj7vISaDQEPziIieMFSf+u7bYsJQvyJMRhhqMCukd8gmGvyICu5nJKDQPipTQ/dhwAUxCPVxN/7W1Ha9Rpu8cL4CofxM4mp8jdplePmBUI/P1dYeMzh9olQtOCWDUCMHfUOkGm/R37ZDjW2K9c9vbC9nYKIBocaXW53+KBkLTO0Q1HgyrF9/010UMLZAUFOjV2IjcSx96gmBGw8Q1NTvxJSNDM0tEmhuQlCzDdF1p3zmBhf0/CCoWc8usz09aOElQUEBgpobZiuGyl56pkC9D0D5c6hSHophyALPD4BaelPSTQ3rPANQqIuhGCeTSvxOfiOPubEjrs3EUKwNEMmyirNPugGK6SxKOR28fR1hqgGQWUL585103m6FI6o/hVAcs1riAfL3SEWzSgSl8w6WoTt40bkPQQIUQXFd/QzZbQn35ARbRwIoKrgiarJzN21b8R+gAEp08BVTWT0E3xffGR9KfLwlBscK3k91eCUMF+oCXLEAqDDHBnjlGQ8qzcBLima7Bm/x1vpj3xkHCpijrfiRwceeImI/QSaUjrtPUrFvVJc4lnZPGPmBAeUl6PM2N1bTnEoctqrvbFkMzaCo7YZSRwKN6zSJ2Wnr2GUW9oDM+xla/nS4JlDX4Cxx9q53Vl9R/xRtK+w6stI96fgrvYcrDDQOFGp6D0wnt39O2a3IX3lx61esE0lfjYQeB0rm4GT5junUYg3s7arL3+PE35vNKQs7oc6tLUvTasoVV4+PYetXyKtlwcTlna8+EzVYxah/N6Ogam/FKINoFiRS1LH61ywOL0OCnTjAcJWXmXtNNd02TV1bmtoUhDL+gkVyZwZP/xqKQhVmd6yTeNzvVWCxkhUv92m6G4VV4cRxfIudeJoJ0T7V5B2bOH/mVVk4jlP8lefgetF1zn4B1LZTTTPT5DwbOCTV/MDg32LOrYKi+uVZMNY9ikpnHGI0itAFuyERlHdJKu68gndqfF52yF6R2KHiQnl+UIhWYQk5X8KK7FZZVLpxMBM4wCSiOt2GjxufU94F2CEBl5dji/cM6RVV/Tghu09mQF2QB2DfMhLWQ/QT/jnruZ4sa2kBpT3h6nykW5VMDsB4dlLhkWrly/A5h1oe7UOoDBMrilLr+sql7qhTOJ9bMygFL32s0Lx9mEIhGwb1SvlQx4xTrfuDB6XmPZSVctlQ5ppJqkwOu3Eo4G/uqTMLatM7hSr0WEJxLdOv6WPwDlByXdouihZQcrlhFxlzKHdNelGtdAYl82b/burL2Q5Kl7Nv9pI5gZL8vYG9dJ1A4c2kXeVMoA4PUp3sEZT3C2uvVjSCAjcHvqVwBPUjU6r3zsjvRKlamT9Aafimam9dBij+65RfVzJASbxmvLeqAepnFh9pzwY0/xzXxSxFe6jfmedtV9NAbf+BBnWKeqijQcYKOqiNv0OiVmEH9UuLr6k+a6hD2/W56o0o8kuZr1Z9toAIf0ngCLkNFPeczTFqofxD3ZaFogbqRzqZXkEDJVp8cRCq+JmZqXJhWssbKIHRWdoSpzGQil1KH4I7jRsoQSfj7+DHPKBiqYYSnd1qCnhfab6+Naa5JvgEfUOJoL0joNw3lKjCOwTKekOJDP1DoF4nIvxBvkOgzici/JOHQBU2EcbzQ6Du/j8FK14WZTLyGwAAAABJRU5ErkJggg=="
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between text-md">
                    Profile
                  </Link>
                </li>

                <li className=" text-xs cursor-pointer badge justify-between text-md">
                  <Link to="/connections">Connections</Link>
                </li>
                <li className=" text-xs cursor-pointer badge justify-between text-md">
                  <Link to="/requests">Requests</Link>
                </li>
                <li className=" text-xs cursor-pointer badge justify-between text-md">
                  <Link to="/premium">Premium</Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
