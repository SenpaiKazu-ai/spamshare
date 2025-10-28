async function sharePost() {
  const link = document.getElementById("linkToPost").value.trim();
  const accessToken = document.getElementById("accessToken").value.trim();
  const count = parseInt(document.getElementById("shareCount").value);
  const result = document.getElementById("result");

  if (!link || !accessToken) {
    result.innerHTML = "⚠️ Please fill in both the post link and the access token.";
    return;
  }

  result.innerHTML = "⏳ Sharing in progress...";

  try {
    const res = await fetch("/api/share", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ link, accessToken, count })
    });

    const text = await res.text();

    // Try to parse JSON, but detect HTML (e.g., error pages)
    if (text.startsWith("<")) {
      result.innerHTML = "❌ Server returned HTML instead of JSON (check Flask logs).";
      console.error(text);
      return;
    }

    const data = JSON.parse(text);

    if (data.results) {
      const successCount = data.results.filter(r => !r.error).length;
      result.innerHTML = `✅ Shared ${successCount}/${count} posts successfully.`;
      console.log(data.results);
    } else if (data.error) {
      result.innerHTML = `❌ Error: ${data.error}`;
    } else {
      result.innerHTML = "❌ Unknown error occurred.";
    }
  } catch (err) {
    result.innerHTML = `⚠️ Request failed: ${err.message}`;
  }
}
