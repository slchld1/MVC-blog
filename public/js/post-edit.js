async function editFormHandler(event) {
    event.preventDefault();

    const blog_title = document.querySelector('#blog-title').value.trim();
    const blog_description = document.querySelector('#blog-context').value.trim();
    const id = document.querySelector('.edit-form').id;
    const numID =parseFloat(id)
    if(blog_title && blog_description) {
        const response = await fetch(`/api/posts/${numID}`, {
            method: 'PUT',
            body: JSON.stringify({
                blog_title,
                blog_description,
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if(response.ok){
            document.location.replace('/dashboard');
        }else {
            alert(response.statusText);
        }
    }
}
document.querySelector('.edit-form').addEventListener('submit', editFormHandler)