async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-r').value.trim();
    const password = document.querySelector('#password-r').value.trim();
    const name = document.querySelector('#fullName').value.trim();
    const email = document.querySelector('#email-r').value.trim();

    if (username && password && name && email) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
                name,
                email,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/login');
        } else {
            alert(response.statusText);
        }
    }
}

document
    .querySelector('#signUp')
    .addEventListener('submit', signupFormHandler);