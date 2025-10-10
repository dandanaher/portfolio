import type { CSSProperties } from "react";

import ScrollColumn from "@/components/shared/ScrollColumn";
import type { LibraryBook } from "@/data/library";
import { libraryBooks } from "@/data/library";

const Library = () => {
  const currentBook = libraryBooks.find((book) => book.status === "current") ?? null;
  const completedBooks = libraryBooks.filter((book) => book.status === "completed");

  return (
    <div className="flex flex-1 flex-col bg-[#FAF8F4] px-8 py-12 text-[#3C3C3A] lg:px-16 lg:py-16">
      <div className="flex flex-1 flex-col gap-10 lg:flex-row">
        <section className="rounded-3xl border border-[#E5E1DB] bg-white p-8 shadow-sm lg:w-[40%]">
          <h2 className="text-sm uppercase tracking-[0.4em] text-[#8A8984]">Current Book</h2>
          {currentBook ? (
            <CurrentBookPreview book={currentBook} />
          ) : (
            <p className="mt-6 text-base text-[#8A8984]">
              No current book in progress. Add one to keep the shelf moving.
            </p>
          )}
        </section>

        <section className="flex min-h-0 flex-1 flex-col rounded-3xl border border-[#E5E1DB] bg-white shadow-sm">
          <div className="border-b border-[#E5E1DB] px-8 py-6">
            <h2 className="text-sm uppercase tracking-[0.4em] text-[#8A8984]">Previously Read</h2>
          </div>
          <ScrollColumn className="flex-1">
            <div className="space-y-5">
              {completedBooks.map((book) => (
                <CompletedBookEntry key={book.id} book={book} />
              ))}
              {completedBooks.length === 0 ? (
                <p className="text-sm text-[#8A8984]">
                  The shelf is waiting. Add previously read books to populate this list.
                </p>
              ) : null}
            </div>
          </ScrollColumn>
        </section>
      </div>
    </div>
  );
};

const CurrentBookPreview = ({ book }: { book: LibraryBook }) => {
  return (
    <div className="mt-8 flex flex-col gap-6 md:flex-row">
      <BookArt book={book} variant="large" />
      <div className="flex flex-1 flex-col gap-4">
        <div>
          <h3 className="text-3xl font-serif">{book.title}</h3>
          <p className="mt-2 text-sm uppercase tracking-[0.25em] text-[#8A8984]">
            {book.author} · {book.year}
          </p>
        </div>
        <p className="text-base leading-relaxed text-[#4F4F4C]">{book.description}</p>
      </div>
    </div>
  );
};

const CompletedBookEntry = ({ book }: { book: LibraryBook }) => {
  return (
    <div className="flex items-start gap-5 rounded-2xl border border-[#E5E1DB] bg-white p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
      <BookArt book={book} variant="small" />
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-xl font-serif">{book.title}</h3>
        <p className="text-xs uppercase tracking-[0.3em] text-[#8A8984]">
          {book.author} · {book.year}
        </p>
        <p className="text-sm leading-6 text-[#4F4F4C]">{book.description}</p>
      </div>
    </div>
  );
};

type BookArtProps = {
  book: LibraryBook;
  variant: "large" | "small";
};

const BookArt = ({ book, variant }: BookArtProps) => {
  const hasCover = Boolean(book.coverImage);
  const baseClass =
    variant === "large"
      ? "h-80 w-56 rounded-3xl"
      : "h-28 w-20 rounded-xl";
  const fallbackStyle: CSSProperties = {
    background: `linear-gradient(135deg, ${book.coverColor}, ${lightenHex(book.coverColor, 30)})`,
  };

  return (
    <div className={`relative overflow-hidden border border-[#E5E1DB] bg-white shadow-sm ${baseClass}`}>
      {hasCover ? (
        <img
          src={book.coverImage}
          alt={`${book.title} cover`}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col justify-between p-5 text-white" style={fallbackStyle}>
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-white/80">{book.author}</span>
            <h4 className="mt-4 text-lg font-semibold leading-tight">{book.title}</h4>
          </div>
          <span className="text-xs uppercase tracking-[0.3em] text-white/70">{book.year}</span>
        </div>
      )}
    </div>
  );
};

const lightenHex = (hex: string, amount: number) => {
  const sanitized = hex.replace("#", "");
  const bigint = parseInt(sanitized, 16);

  if (Number.isNaN(bigint)) {
    return hex;
  }

  const r = Math.min(255, ((bigint >> 16) & 255) + amount);
  const g = Math.min(255, ((bigint >> 8) & 255) + amount);
  const b = Math.min(255, (bigint & 255) + amount);
  return `rgb(${r}, ${g}, ${b})`;
};

export default Library;
