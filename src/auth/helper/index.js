import {API} from "../../backend"
import {cartEmpty} from "../../core/helper/carthelper";

export const signup = user => {
    return fetch (`${API}user/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(respose => {
        return respose.json();
    })
    .catch(err => console.log(err))
};

export const signin = user => {
     const formData = new FormData();

    for(const name in user){
        console.log(user[name]);
        formData.append(name, user[name])
    }

    
    
    // formData.append('email', email)
    // formData.append('password', password)

    for(var key of formData.keys()){
        console.log("MY KEY: ", key)
    }

    return fetch(`${API}user/login/`, {
        method: "POST",
        body: formData
    })
    .then((respose) => {
        console.log("SUCCESS: ", respose)
        return respose.json(); 
    })
    .catch(err => console.log(err))
}


export const authenticate = (data, next) => {
    if (typeof window !== undefined) {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};


export const isAuthenticated = () => {
    if(typeof window == undefined){
        return false
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
        //TODO: compare JWT with database json token
    } else {
        return false;
    }
};


export const signout = next => {
    const userId = isAuthenticated() && isAuthenticated().user.id
    
    if (typeof window !== undefined){
        localStorage.removeItem("jwt")
        cartEmpty(() => {});
        //next();

        return fetch(`${API}user/logout/${userId}`, {
            method:"GET"
        })
        .then (response => {
            console.log("Signout success")
            next();
        })
        .catch((err) => console.log(err));
    }
}   