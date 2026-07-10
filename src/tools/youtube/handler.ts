const API_KEY = process.env.YOUTUBE_API_KEY;

export async function searchYoutube(
  channelId: string,
  query: string
) {
  const url =
    `https://www.googleapis.com/youtube/v3/search` +
    `?part=snippet` +
    `&channelId=${channelId}` +
    `&q=${encodeURIComponent(query)}` +
    `&maxResults=5` +
    `&type=video` +
    `&key=${API_KEY}`;

  const response = await fetch(url);

  const data = await response.json();

  return data.items.map((item: any) => ({
    title: item.snippet.title,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
  }));
}