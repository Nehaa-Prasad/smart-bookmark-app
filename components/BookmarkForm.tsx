"use client";

import { useState, useEffect } from "react";

type Bookmark = {
  id: string;
  title: string;
  url: string;
  user_id: string;
  created_at: string;
};

type Props = {
  onAdd: (title: string, url: string) => void;
  editingBookmark: Bookmark | null;
  setEditingBookmark: (b: Bookmark | null) => void;
};

export default function BookmarkForm({
  onAdd,
  editingBookmark,
  setEditingBookmark,
}: Props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (editingBookmark) {
      setTitle(editingBookmark.title);
      setUrl(editingBookmark.url);
    }
  }, [editingBookmark]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(title, url);
    setTitle("");
    setUrl("");
  };

  const cancelEdit = () => {
    setEditingBookmark(null);
    setTitle("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">

      {/* TITLE INPUT */}
      <input
        type="text"
        placeholder="Bookmark Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 
                   bg-white text-gray-900 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-black
                   transition"
      />

      {/* URL INPUT */}
      <input
        type="url"
        placeholder="Bookmark URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 
                   bg-white text-gray-900 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-black
                   transition"
      />

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded-xl 
                     hover:bg-gray-800 transition font-medium"
        >
          {editingBookmark ? "Update Bookmark" : "Add Bookmark"}
        </button>

        {editingBookmark && (
          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-200 px-6 py-2 rounded-xl hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
