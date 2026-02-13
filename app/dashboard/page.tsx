"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Bookmark = {
  id: number;
  title: string;
  url: string;
  user_id: string;
  created_at: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      setUser(session.user);

      // Fetch existing bookmarks
      const { data } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      setBookmarks(data || []);
      setLoading(false);

      // 🔥 Realtime subscription
      const channel = supabase
        .channel("realtime-bookmarks")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "bookmarks",
            filter: `user_id=eq.${session.user.id}`,
          },
          (payload) => {
            if (payload.eventType === "INSERT") {
              setBookmarks((prev) => [payload.new as Bookmark, ...prev]);
            }

            if (payload.eventType === "DELETE") {
              setBookmarks((prev) =>
                prev.filter((b) => b.id !== payload.old.id)
              );
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    };

    init();
  }, [router]);

  const addBookmark = async () => {
    if (!title || !url) return;

    await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ]);

    setTitle("");
    setUrl("");
  };

  const deleteBookmark = async (id: number) => {
    await supabase.from("bookmarks").delete().eq("id", id);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h2>Welcome {user?.email}</h2>

      <button
        onClick={logout}
        style={{
          padding: "8px 16px",
          background: "black",
          color: "white",
          borderRadius: "6px",
          marginBottom: "20px",
        }}
      >
        Logout
      </button>

      <h3>Add Bookmark</h3>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginRight: "10px", padding: "8px" }}
      />

      <input
        type="text"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ marginRight: "10px", padding: "8px" }}
      />

      <button
        onClick={addBookmark}
        style={{
          padding: "8px 16px",
          background: "black",
          color: "white",
          borderRadius: "6px",
        }}
      >
        Add
      </button>

      <hr style={{ margin: "30px 0" }} />

      <h3>Your Bookmarks</h3>

      {bookmarks.length === 0 && <p>No bookmarks yet.</p>}

      <ul>
        {bookmarks.map((bookmark) => (
          <li key={bookmark.id} style={{ marginBottom: "10px" }}>
            <a href={bookmark.url} target="_blank">
              {bookmark.title}
            </a>

            <button
              onClick={() => deleteBookmark(bookmark.id)}
              style={{
                marginLeft: "10px",
                background: "red",
                color: "white",
                borderRadius: "4px",
                padding: "4px 8px",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
