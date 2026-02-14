"use client";

import { useState } from "react";

type Props = {
  onAdd: (title: string, url: string) => void;
};

export default function BookmarkForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;
    onAdd(title, url);
    setTitle("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded text-black"
      />
      <input
        type="text"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 rounded text-black"
      />
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </form>
  );
}
