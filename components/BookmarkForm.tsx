"use client";

import { useEffect, useState } from "react";

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
  setEditingBookmark: (bookmark: Bookmark | null) => void;
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
    setEditingBookmark(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mb-6"
    >
      <input
        type="text"
        placeholder="Bookmark Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-3 rounded-lg"
        required
      />

      <input
        type="url"
        placeholder="Bookmark URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-3 rounded-lg"
        required
      />

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          {editingBookmark ? "Update Bookmark" : "Add Bookmark"}
        </button>

        {editingBookmark && (
          <button
            type="button"
            onClick={() => {
              setEditingBookmark(null);
              setTitle("");
              setUrl("");
            }}
            className="bg-gray-300 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
