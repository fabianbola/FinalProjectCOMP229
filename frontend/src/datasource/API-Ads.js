let apiURL = process.env.REACT_APP_APIURL;

const list = async (category) => {
    try {
        let response = await fetch(apiURL + '/ads/list/' + category, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return await response.json();
    } catch (err) {
        console.log(err)
    }
}

export { list }