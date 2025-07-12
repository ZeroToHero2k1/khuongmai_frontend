export const getAccessToken = (): string|null =>{
    return localStorage.getItem("accessToken");
}

export const setAccessToken=(token: string)=>{
    return localStorage.setItem("accessToken",token);
}

export const clearAccessToken=()=>{
    return localStorage.removeItem("accessToken");
}

export const getRefreshToken=():string|null =>{
    return localStorage.getItem("refreshToken");
}

export const setRefreshToken=(token: string)=>{
    return localStorage.setItem("refreshToken",token);
}

export const removeRefreshToken=()=>{
    return localStorage.removeItem("refreshToken");
}

export const isHetHanToken=(token: string):boolean=>{
    try{
        const payload=JSON.parse(atob(token.split(".")[1]));
        return payload.exp < Date.now()/1000;
    }catch {
        return true;
    }
}