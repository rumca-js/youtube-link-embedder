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
        // Open a new tab and execute a script after a short delay
        browser.tabs.create({
          url: browser.runtime.getURL("blank.html"),
        }).then((tab) => {
          setTimeout(() => {
            browser.tabs.executeScript(tab.id, {
              code: `
                const container = document.createElement('div');
                container.className = 'youtube_player_container';
                
                const iframe = document.createElement('iframe');
                iframe.src = 'https://www.youtube.com/embed/${videoId}';
                iframe.width = '100%';
                iframe.height = '100%';
                iframe.frameBorder = 0;
                iframe.referrerPolicy = 'no-referrer-when-downgrade';
                iframe.allowFullscreen = true;
                iframe.className = 'youtube_player_frame';

                container.appendChild(iframe);
                document.body.innerHTML = '';
                document.body.appendChild(container);
              `,
            });
          }, 500); // Adjust the delay (in milliseconds) if needed
        });
      } else {
        console.error("Invalid YouTube link. Please enter a valid YouTube video link.");
      }
    }
  });
});
