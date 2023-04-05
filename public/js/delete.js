async function deleteFormHandler(event) {
    event.preventDefault();

    const id = document.querySelector('.edit-form').id;
    const numID =parseFloat(id)

    const response = await fetch(`/api/posts/${numID}`, {
        method: 'DELETE',
        body: JSON.stringify({
            blog_id: numID
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    if(response.ok) {
        document.location.replace('/dashboard');
    }else {
        alert(response.statusText);
    }
}

document.querySelector('.button-red').addEventListener('click', deleteFormHandler)