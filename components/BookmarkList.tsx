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
    <div className="space-y-5">
      {bookmarks.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          <p className="text-lg font-medium">No bookmarks yet</p>
          <p className="text-sm mt-1">
            Add your first bookmark to get started 🚀
          </p>
        </div>
      )}

      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="group bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition duration-300"
        >
          <div className="flex justify-between items-start gap-6">
            {/* LEFT CONTENT */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 break-words">
                {bookmark.title}
              </h3>

              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline break-all mt-2 inline-block"
              >
                {bookmark.url}
              </a>

              <p className="text-xs text-gray-400 mt-3">
                Added on {new Date(bookmark.created_at).toLocaleDateString()}
              </p>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex gap-3 opacity-90 group-hover:opacity-100 transition">
              <button
                onClick={() => onEdit(bookmark)}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-xl text-sm font-medium transition"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(bookmark.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
