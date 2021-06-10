$('#js-form').submit(async (event) => {
    event.preventDefault();
    const email = document.getElementById('txtEmail').value;  
    const password = $('#txtPass').val();
    const JWT = await postData(email,password);

    console.log(JWT);
    
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
// localhost