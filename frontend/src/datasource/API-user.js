let apiURL = process.env.REACT_APP_APIURL;

const signin = async (user) => {
    try {
        let response = await fetch(apiURL + '/users/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const logOut = async (idUser) => {
    try {
        let response = await fetch(apiURL + '/myuser/signout/' + idUser, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export { signin, logOut }