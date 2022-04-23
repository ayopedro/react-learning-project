import { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import classes from './AddUser.module.css';

const AddUser = (props) => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();
    
    const addUserHandler = (e) => {
        e.preventDefault();
        if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0 ){
            setError({
                title: "Invalid Input",
                message: "Kindly Enter a Name and Age"
            })
            return;
        }
        if(+enteredAge < 1){
            setError({
                title: "Invalid Age",
                message: "Kindly an Age greater than 0"
            })
            return;
        }
        props.onAddUser(enteredUsername, enteredAge);
        setEnteredUsername('');
        setEnteredAge('');
        // e.preventDefault();
    }

    const usernameChangeHandler = (e) => {
        setEnteredUsername(e.target.value);
    }

    const ageChangeHandler = (e) => {
        setEnteredAge(e.target.value);
    }

    const errorHandler = () => {
        setError(null);
    }

    return (
        <div>
        {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
        <Card className={classes.input}>
            <form onSubmit={addUserHandler}>
                <label htmlFor="username">UserName</label>
                <input 
                id='username' 
                value={enteredUsername} 
                type='text' onChange={usernameChangeHandler}
                />
                <label htmlFor="age">Age (Years) </label>
                <input 
                id='age' 
                value={enteredAge} 
                type='number' 
                onChange={ageChangeHandler}
                />
                <Button type='submit' onConfirm={errorHandler}>Add User</Button>
            </form>
            
        </Card>
        </div>
    )
};

export default AddUser;