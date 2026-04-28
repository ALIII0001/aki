export function getYouTubeId(url = "") {
  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/watch\?v=([^?&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
    /youtube\.com\/shorts\/([^?&]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }

  return url.length === 11 ? url : "";
}

export function getVimeoId(url = "") {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match?.[1] || "";
}

export function getThumbnail(video) {
  if (video?.thumbnail_url) return video.thumbnail_url;
  if (video?.thumbnail) return video.thumbnail;

  const sourceUrl = video?.video_url || video?.youtube_url || "";
  const youtubeId = getYouTubeId(sourceUrl);
  if (youtubeId) return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  return "";
}

export function getEmbedUrl(url, { autoplay = false, controls = false } = {}) {
  const youtubeId = getYouTubeId(url);
  if (youtubeId) {
    const params = new URLSearchParams({
      autoplay: autoplay ? "1" : "0",
      mute: "1",
      loop: "1",
      playsinline: "1",
      rel: "0",
      modestbranding: "1",
      controls: controls ? "1" : "0",
      playlist: youtubeId
    });

    return `https://www.youtube-nocookie.com/embed/${youtubeId}?${params.toString()}`;
  }

  const vimeoId = getVimeoId(url);
  if (vimeoId) {
    const params = new URLSearchParams({
      autoplay: autoplay ? "1" : "0",
      muted: "1",
      loop: "1",
      title: "0",
      byline: "0",
      portrait: "0"
    });

    return `https://player.vimeo.com/video/${vimeoId}?${params.toString()}`;
  }

  return "";
}

