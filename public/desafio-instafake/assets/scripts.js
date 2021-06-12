$('#js-form').submit(async (event) => {
    event.preventDefault();
    const email = document.getElementById('txtEmail').value;  
    const password = $('#txtPass').val();
    const JWT = await postData(email,password);
    const album = await getImage(JWT);

    console.log(album);
    
})

const postData = async (email, password) => {
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method:'POST',
            body: JSON.stringify({
                email: email, 
                password: password
            })
        })
        const {token} = await response.json()

        localStorage.setItem('jwt-token', token)
        return token
    } catch (err) {
        console.error(`Error: ${err}`);
    }
}

const getImage = async (token) => {
    try {
        const response = await fetch('http://localhost:3000/api/albums', {
            method:'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const {album} = await response.json()
        return album
    } catch (err) {
        console.error(`Error: ${err}`);
    }
}
