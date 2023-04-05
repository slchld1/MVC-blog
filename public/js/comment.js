async function commentFormHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('#commentBox').value.trim();
    const id = document.querySelector('.blog-section').id;
    const numID = parseFloat(id);

    if(comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                numID,
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