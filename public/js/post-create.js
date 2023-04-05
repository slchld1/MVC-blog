async function newFormHandler(event) {
    event.preventDefault();

    const blog_title = document.querySelector('#post-title').value.trim();
    const blog_description = document.querySelector('#post-context').value.trim();

    if(blog_title && blog_description){
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                blog_title,
                blog_description,
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        if(response.ok) {
            document.location.replace('/dashboard')
            console.table(response)
        } else {
            alert(response.statusText);
        }
    }
}

document
    .querySelector('#newPost')
    .addEventListener('submit', newFormHandler)