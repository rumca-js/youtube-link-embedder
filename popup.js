// popup.js
document.addEventListener("DOMContentLoaded", function () {
  const openLinkButton = document.getElementById("openLinkButton");

  openLinkButton.addEventListener("click", function () {
    const linkInput = document.getElementById("linkInput").value;
    if (linkInput) {
      // Extract video ID from YouTube link
      const videoIdMatch = linkInput.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      const videoId = videoIdMatch ? videoIdMatch[1] : null;

      if (videoId) {
        // Execute a script in the currently active tab
        browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
          const activeTab = tabs[0];
          if (activeTab) {
            browser.tabs.executeScript(activeTab.id, {
              code: `
                const container = document.createElement('div');
                container.className = 'youtube_player_container';
                container.style.position = 'relative';
                container.style.width = '80%';
                container.style.paddingBottom = '46.25%';

                const iframe = document.createElement('iframe');
                iframe.src = 'https://www.youtube.com/embed/${videoId}';
                iframe.width = '100%';
                iframe.height = '100%';
                iframe.frameBorder = 0;
                iframe.referrerPolicy = 'no-referrer-when-downgrade';
                iframe.allowFullscreen = true;
                iframe.className = 'youtube_player_frame';
                iframe.style.position = 'absolute';
                iframe.style.top = '0';
                iframe.style.left = '0';
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.border = '0';

                container.appendChild(iframe);

                // Replace the body of the currently active tab with the container
                document.body.innerHTML = '';
                document.body.appendChild(container);
              `,
            });
          } else {
            console.error("No active tab found.");
          }
        });
      } else {
        console.error("Invalid YouTube link. Please enter a valid YouTube video link.");
      }
    }
  });
});
