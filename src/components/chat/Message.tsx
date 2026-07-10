import { Message as MessageType } from "@/types/messages";

const URL_REGEX = /(https?:\/\/\S+)/g;
const YOUTUBE_REGEX =
  /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/g;
const YOUTUBE_URL_WITH_PREFIX_REGEX =
  /\s*-?\s*https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}\S*/g;

function stripYoutubeUrls(text: string) {
  return text
    .replace(YOUTUBE_URL_WITH_PREFIX_REGEX, "")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function linkify(text: string) {
  return text.split(URL_REGEX).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-blue-400 hover:text-blue-300"
      >
        {part}
      </a>
    ) : (
      part
    )
  );
}

function extractYoutubeIds(text: string) {
  return [...text.matchAll(YOUTUBE_REGEX)].map((match) => match[1]);
}

export default function Message({
  message,
}: {
  message: MessageType;
}) {
  const youtubeIds =
    message.role === "user" ? [] : extractYoutubeIds(message.content);

  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xl rounded-xl p-4 ${
          message.role === "user"
            ? "bg-blue-600 text-white"
            : "bg-zinc-800 text-white"
        }`}
      >
        <div className="whitespace-pre-line">
          {message.role === "user"
            ? message.content
            : linkify(stripYoutubeUrls(message.content))}
        </div>
        {youtubeIds.length > 0 && (
          <div className="mt-3 flex flex-col gap-3">
            {youtubeIds.map((id) => (
              <div
                key={id}
                className="aspect-video w-full overflow-hidden rounded-lg border border-zinc-700 shadow-sm"
              >
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${id}`}
                  title="YouTube video player"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}