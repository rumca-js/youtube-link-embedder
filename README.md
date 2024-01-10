# YouTube Link Embedder

This is a firefox Extension that allows you to view all YouTube videos.

It puts the video into iframe:

```
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
```

# Installation

 - Described by https://extensionworkshop.com/documentation/publish/distribute-sideloading/
 - Enter "about:debugging#/runtime/this-firefox" in firefox address bar. Add temporary extentension mechanism

# HowTo

 - Navigate to any page. Let's say https://www.youtube.com
 - click extension, popup should be opened
 - provide your desired video, let's say https://www.youtube.com/watch?v=CeA92xqw-QI
