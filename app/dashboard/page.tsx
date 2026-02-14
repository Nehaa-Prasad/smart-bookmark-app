"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";

type Bookmark = {
  id: string;
  title: string;
  url: string;
  user_id: string;
  created_at: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);
  const [search, setSearch] = useState(""); // ✅ NEW
  const [loading, setLoading] = useState(true);

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

      // Initial fetch
      const { data } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      setBookmarks(data || []);
      setLoading(false);

      // Realtime subscription
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

            if (payload.eventType === "UPDATE") {
              setBookmarks((prev) =>
                prev.map((b) =>
                  b.id === payload.new.id ? (payload.new as Bookmark) : b
                )
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

  // ✅ FILTERED BOOKMARKS
  const filteredBookmarks = bookmarks.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.url.toLowerCase().includes(search.toLowerCase())
  );

  // ADD or UPDATE
  const handleAdd = async (title: string, url: string) => {
    if (!title || !url) return;

    if (editingBookmark) {
      const { error } = await supabase
        .from("bookmarks")
        .update({ title, url })
        .eq("id", editingBookmark.id);

      if (!error) {
        setEditingBookmark(null);
      }
    } else {
      await supabase.from("bookmarks").insert([
        {
          title,
          url,
          user_id: user.id,
        },
      ]);
    }
  };

  const handleDelete = async (id: string) => {
    const previous = bookmarks;

    // Optimistic remove
    setBookmarks((prev) =>
      prev.filter((bookmark) => bookmark.id !== id)
    );

    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", id);

    if (error) {
      setBookmarks(previous);
    }
  };

  const handleEdit = (bookmark: Bookmark) => {
    setEditingBookmark(bookmark);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-200 to-slate-300 p-10">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-gray-200">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Smart Bookmark
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Logged in as{" "}
              <span className="font-medium text-gray-800">
                {user?.email}
              </span>
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-black text-white px-5 py-2 rounded-xl 
                       hover:bg-gray-800 transition duration-200 
                       shadow-md"
          >
            Logout
          </button>
        </div>

        {/* 🔍 SEARCH */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search bookmarks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 rounded-xl 
             border border-gray-300 
             text-gray-900 placeholder-gray-400
             bg-white
             focus:outline-none focus:ring-2 focus:ring-black 
             transition shadow-sm"
          />
        </div>

        {/* FORM */}
        <BookmarkForm
          onAdd={handleAdd}
          editingBookmark={editingBookmark}
          setEditingBookmark={setEditingBookmark}
        />

        {/* LIST */}
        <BookmarkList
          bookmarks={filteredBookmarks}   
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </main>
  );
}
