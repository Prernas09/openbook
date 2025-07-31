// src/pages/index.tsx
import { useEffect, useState } from "react";
import Head from "next/head";
import BookCard from "@/components/BookCard";
import Header from "@/components/Header";

export default function Home() {
  const [query, setQuery] = useState("harry potter");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBooks = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12`);
      const data = await res.json();
      setBooks(data.docs || []);
    } catch (err) {
      setError("Failed to fetch books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchBooks();
  };

  return (
    <>
      <Head>
        <title>OpenBook Hub</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Discover Your Next Great Read</h2>
            <p className="text-gray-600">Search through millions of books from the Open Library</p>
          </div>

          <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8 flex gap-2">
            <input
              type="text"
              className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search books by title, author, or genre..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
            >
              Search
            </button>
          </form>

          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-500">Loading books...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
            </div>
          )}
          
          {!loading && books.length === 0 && !error && (
            <div className="text-center py-8">
              <p className="text-gray-500">No books found. Try a different search term.</p>
            </div>
          )}

          {!loading && books.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book: any) => (
                <BookCard key={book.key} book={book} />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
