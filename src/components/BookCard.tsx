import React from 'react';

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  publisher?: string[];
  subject?: string[];
}

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const coverUrl = book.cover_i 
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : '/book-placeholder.png';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-[3/4] bg-gray-200 flex items-center justify-center">
        <img
          src={coverUrl}
          alt={book.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/book-placeholder.png';
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
          {book.title}
        </h3>
        {book.author_name && book.author_name.length > 0 && (
          <p className="text-sm text-gray-600 mb-1">
            by {book.author_name.join(', ')}
          </p>
        )}
        {book.first_publish_year && (
          <p className="text-xs text-gray-500 mb-1">
            Published: {book.first_publish_year}
          </p>
        )}
        {book.publisher && book.publisher.length > 0 && (
          <p className="text-xs text-gray-500 mb-2">
            {book.publisher[0]}
          </p>
        )}
        {book.subject && book.subject.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {book.subject.slice(0, 3).map((subject, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {subject}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
