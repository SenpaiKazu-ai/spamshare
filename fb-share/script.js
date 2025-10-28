async function sharePost() {
    const linkToPost = document.getElementById('linkToPost').value;
    const shareCount = parseInt(document.getElementById('shareCount').value);
    const accessToken = document.getElementById('accessToken').value;
    const resultDiv = document.getElementById('result');

    if (!linkToPost || !accessToken) {
        resultDiv.textContent = 'Please fill in all fields';
        return;
    }

    resultDiv.textContent = 'Sharing...';

    try {
        for (let i = 0; i < shareCount; i++) {
            const response = await fetch(`https://graph.facebook.com/v18.0/me/feed`, {
                method: 'POST',
                body: new URLSearchParams({
                    'link': linkToPost,
                    'access_token': accessToken
                })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error?.message || 'Share failed');
            }

            resultDiv.textContent = `Shared ${i + 1} of ${shareCount} times`;
        }
        resultDiv.textContent = 'Sharing completed successfully!';
    } catch (error) {
        resultDiv.textContent = `Error: ${error.message}`;
    }
}
