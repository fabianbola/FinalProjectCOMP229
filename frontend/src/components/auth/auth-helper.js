import { jwtDecode } from "jwt-decode";


const authenticate = (token, cb) => {
    if (typeof window !== "undefined") {
        sessionStorage.setItem('token', token);

        let decoded = jwtDecode(token);
        sessionStorage.setItem('username', decoded.username)
    }
    cb();
}

export { authenticate}
