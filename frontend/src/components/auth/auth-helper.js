import { jwtDecode } from "jwt-decode";


const authenticate = (token, cb) => {
    if (typeof window !== "undefined") {
        sessionStorage.setItem('token', token);

        let decoded = jwtDecode(token);
        console.log(decoded);
        sessionStorage.setItem('username', decoded.username)

        sessionStorage.setItem('isAdmin', decoded.admin ? 'true' : 'false');
    }
    cb();
}

const isAuthenticated = () => {
    if (typeof window === "undefined") {
        return false;
    }
    return !!sessionStorage.getItem('token');
}

const getToken = () => {
    if (typeof window === "undefined") {
        return false;
    }
    return sessionStorage.getItem('token');
}

const getUsername = () => {
    if (typeof window === "undefined") {
        return false;
    }
    return sessionStorage.getItem('username');
}

const getAdmin = () => {
    if (typeof window === "undefined") {
        return false;
    }
    return sessionStorage.getItem('isAdmin');
}

const clearJWT = () => {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('isAdmin');
    }
}

export { authenticate, isAuthenticated, getToken, getUsername, getAdmin, clearJWT }