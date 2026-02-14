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
    <div className="space-y-6 mt-8">
      {bookmarks.length === 0 && (
        <div className="text-center py-16 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200">
          <p className="text-xl font-semibold text-gray-700">
            No bookmarks yet
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Add your first bookmark to get started 🚀
          </p>
        </div>
      )}

      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="group bg-white/80 backdrop-blur-sm 
          border border-gray-200 
          rounded-2xl p-6 
          shadow-sm hover:shadow-xl 
          hover:-translate-y-1
          transition-all duration-300"
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
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline break-all mt-3 inline-block transition"
              >
                {bookmark.url}
              </a>

              <p className="text-xs text-gray-400 mt-4">
                Added on{" "}
                {new Date(bookmark.created_at).toLocaleDateString()}
              </p>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex gap-3 opacity-90 group-hover:opacity-100 transition">
              <button
                onClick={() => onEdit(bookmark)}
                className="bg-yellow-400 hover:bg-yellow-500 
                text-black px-4 py-2 
                rounded-xl text-sm font-medium 
                shadow-sm hover:shadow-md
                transition"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(bookmark.id)}
                className="bg-red-500 hover:bg-red-600 
                text-white px-4 py-2 
                rounded-xl text-sm font-medium 
                shadow-sm hover:shadow-md
                transition"
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
