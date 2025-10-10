import type { CSSProperties, WheelEvent } from "react";
import { useMemo, useState } from "react";

import type { LibraryBook } from "@/data/library";
import { libraryBooks } from "@/data/library";

const Library = () => {
  const currentBook = useMemo(
    () => libraryBooks.find((book) => book.status === "current") ?? null,
    []
  );

  const completedBooks = useMemo(
    () => libraryBooks.filter((book) => book.status === "completed"),
    []
  );

  const [selectedBookId, setSelectedBookId] = useState<string | null>(
    currentBook?.id ?? completedBooks[0]?.id ?? null
  );

  const selectedBook = useMemo(() => {
    if (!selectedBookId) {
      return currentBook ?? completedBooks[0] ?? null;
    }

    return (
      libraryBooks.find((book) => book.id === selectedBookId) ??
      currentBook ??
      completedBooks[0] ??
      null
    );
  }, [selectedBookId, currentBook, completedBooks]);

  const handleBookSelect = (bookId: string) => {
    setSelectedBookId(bookId);
  };

  const handleShelfWheel = (event: WheelEvent<HTMLDivElement>) => {
    const prefersVertical = Math.abs(event.deltaY) >= Math.abs(event.deltaX);
    const delta = prefersVertical ? event.deltaY : event.deltaX;

    if (delta === 0) {
      return;
    }

    event.preventDefault();
    event.currentTarget.scrollLeft += delta * 2.5;
  };

  return (
    <div className="flex flex-1 flex-col gap-12 bg-[#FAF8F4] px-8 py-10 text-[#3C3C3A] lg:px-14 lg:py-12">
      <section className="flex flex-col gap-6">
        {selectedBook ? (
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12">
            <BookArt book={selectedBook} variant="hero" />
            <div className="flex flex-1 flex-col gap-5">
              <div>
                <h1 className="text-3xl font-serif leading-tight lg:text-[38px]">
                  {selectedBook.title}
                </h1>
                <p className="mt-3 text-sm uppercase tracking-[0.25em] text-[#8A8984]">
                  {selectedBook.author} · {selectedBook.year}
                </p>
              </div>
              <p className="max-w-3xl text-base leading-relaxed text-[#4F4F4C]">
                {selectedBook.description}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-base text-[#8A8984]">
            No books in the queue yet. Add a current read to populate this view.
          </p>
        )}
      </section>

      <section className="flex flex-col gap-4">
        <div className="relative -mx-4 px-4">
          <div
            className="overflow-x-auto pb-6 custom-scrollbar"
            onWheel={handleShelfWheel}
          >
            <div className="grid grid-flow-col auto-cols-max items-start gap-6">
              {currentBook ? (
                <div className="flex min-w-[10rem] flex-col items-start gap-3">
                  <span className="text-xs uppercase tracking-[0.45em] text-[#8A8984]">
                    Current Read
                  </span>
                  <button
                    type="button"
                    onClick={() => handleBookSelect(currentBook.id)}
                    aria-pressed={selectedBook?.id === currentBook.id}
                    className={`relative flex h-48 w-32 shrink-0 overflow-hidden transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3C3C3A] ${
                      selectedBook?.id === currentBook.id
                        ? "-translate-y-1"
                        : "hover:-translate-y-1"
                    }`}
                  >
                    <BookArt book={currentBook} variant="small" />
                    <span className="sr-only">{currentBook.title} by {currentBook.author}</span>
                  </button>
                </div>
              ) : null}
              <div className="flex min-w-max flex-col gap-3">
                <div className="sticky left-4 top-0 z-10 flex items-center gap-3 bg-[#FAF8F4]">
                  <span className="text-xs uppercase tracking-[0.45em] text-[#8A8984]">
                    Previously Read
                  </span>
                  {currentBook && selectedBook?.id !== currentBook.id ? (
                    <button
                      type="button"
                      onClick={() => setSelectedBookId(currentBook.id)}
                      className="text-[10px] uppercase tracking-[0.3em] text-[#8A8984] underline-offset-4 transition hover:text-[#3C3C3A] hover:underline"
                    >
                      Back to current
                    </button>
                  ) : null}
                </div>
                <div className="flex items-start gap-4">
                  {completedBooks.map((book) => {
                    const isSelected = selectedBook?.id === book.id;

                    return (
                      <button
                        key={book.id}
                        type="button"
                        onClick={() => handleBookSelect(book.id)}
                        aria-pressed={isSelected}
                        className={`relative flex h-48 w-32 shrink-0 overflow-hidden transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3C3C3A] ${
                          isSelected ? "-translate-y-1" : "hover:-translate-y-1"
                        }`}
                      >
                        <BookArt book={book} variant="small" />
                        <span className="sr-only">{book.title} by {book.author}</span>
                      </button>
                    );
                  })}
                  {completedBooks.length === 0 ? (
                    <div className="flex h-48 w-32 shrink-0 items-center justify-center border border-dashed border-[#E5E1DB] text-xs text-[#8A8984]">
                      Add previously read books to fill this shelf.
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

type BookArtProps = {
  book: LibraryBook;
  variant: "hero" | "small";
};

const BookArt = ({ book, variant }: BookArtProps) => {
  const hasCover = Boolean(book.coverImage);

  const baseClass =
    variant === "hero"
      ? "h-72 w-48"
      : "h-48 w-32";

  const containerClass =
    variant === "hero"
      ? `relative shrink-0 overflow-hidden shadow-[0_20px_36px_-28px_rgba(60,60,58,0.55)] ${baseClass}`
      : `relative shrink-0 overflow-hidden shadow-[0_14px_24px_-22px_rgba(60,60,58,0.5)] ${baseClass}`;

  const fallbackStyle: CSSProperties = {
    background: `linear-gradient(135deg, ${book.coverColor}, ${lightenHex(book.coverColor, 30)})`,
  };

  return (
    <div className={containerClass}>
      {hasCover ? (
        <img
          src={book.coverImage}
          alt={`${book.title} cover`}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full flex-col justify-between p-4 text-white"
          style={fallbackStyle}
        >
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-white/80">{book.author}</span>
            <h4 className="mt-4 text-base font-semibold leading-tight">{book.title}</h4>
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
