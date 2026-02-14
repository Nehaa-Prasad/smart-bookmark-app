"use client";

type Bookmark = {
  id: string;
  title: string;
  url: string;
  user_id: string;
  created_at: string;
};

type Props = {
  bookmarks: Bookmark[];
  onDelete: (id: string) => Promise<void>;
  onEdit: (bookmark: Bookmark) => void;
};

export default function BookmarkList({
  bookmarks,
  onDelete,
  onEdit,
}: Props) {
  return (
    <div className="space-y-4">
      {bookmarks.length === 0 && (
        <p className="text-gray-500 text-center">
          No bookmarks yet.
        </p>
      )}

      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="flex justify-between items-center border p-4 rounded-xl shadow-sm"
        >
          <div>
            <h3 className="font-semibold text-lg">
              {bookmark.title}
            </h3>
            <a
              href={bookmark.url}
              target="_blank"
              className="text-blue-600 text-sm"
            >
              {bookmark.url}
            </a>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(bookmark)}
              className="bg-yellow-400 px-3 py-1 rounded-lg text-sm"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(bookmark.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
