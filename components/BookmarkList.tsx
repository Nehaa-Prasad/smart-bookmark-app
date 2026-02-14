"use client";

type Bookmark = {
  id: string;
  title: string;
  url: string;
};

type Props = {
  bookmarks: Bookmark[];
  onDelete: (id: string) => void;
};

export default function BookmarkList({ bookmarks, onDelete }: Props) {
  if (bookmarks.length === 0) {
    return (
      <div className="bg-white p-4 rounded-xl shadow text-center">
        <p className="text-gray-500">
          No bookmarks yet. Add your first one 🚀
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{bookmark.title}</p>
            <a
              href={bookmark.url}
              target="_blank"
              className="text-blue-500 text-sm"
            >
              {bookmark.url}
            </a>
          </div>

          <button
            onClick={() => onDelete(bookmark.id)}
            className="text-red-500 font-medium"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
