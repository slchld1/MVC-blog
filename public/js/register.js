async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-r').value.trim();
    const password = document.querySelector('#password-r').value.trim();

    if (username && password) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
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