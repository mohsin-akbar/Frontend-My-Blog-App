//isLogin 

export const isLoggedIn=()=>{
   let data=localStorage.getItem("data");
   if(data==null){
    return false;
   }else{
    return true;
   }
}

//doLogin => set to localstorage

export const doLogin=(data,next)=>{
        localStorage.setItem("data",JSON.stringify(data));
        next();
}

//current user
export const currentUser=(data,next)=>{
    localStorage.setItem("current",JSON.stringify(data));
    next();
}

//doLogout=>  remove from local storage


export const doLogout=(next)=>{
    localStorage.removeItem("data");
    next();
}

//getCurrentUser
export const getCurrentUser=()=>{
    if(isLoggedIn){
        return JSON.parse(localStorage.getItem("current"));//parse method kisi bhi string ko object me convert karta h
    }else{
        return undefined;
    }
}