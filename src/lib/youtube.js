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

export function getThumbnail(video) {
  if (video?.thumbnail) return video.thumbnail;

  const id = getYouTubeId(video?.youtube_url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : "";
}

export function getEmbedUrl(url, { autoplay = false, controls = false } = {}) {
  const id = getYouTubeId(url);
  if (!id) return "";

  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: "1",
    loop: "1",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    controls: controls ? "1" : "0",
    playlist: id
  });

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}
