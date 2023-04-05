async function commentFormHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('#commentBox').value.trim();
    const id = document.querySelector('.blog-section').id;
    const blog_id = parseFloat(id);

    if(comment_text) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                blog_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.commentSection').addEventListener('submit', commentFormHandler)