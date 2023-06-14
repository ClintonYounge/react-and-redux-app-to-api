import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../store/users/usersSlice";

export const UserContainer = () => {
    const { users, isLoading, error } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    if(isLoading){
        return (
            <p>Loading...</p>
        )
    }

    if(error !== undefined){
        return "Error... something went wrong"
    }

    return (
        <ul>
            {users.map((user) => { 
                return (
                    <li key={user.login.uuid}>{user.name.first} {user.name.last}</li>
                )
            })}
        </ul>
    )
}