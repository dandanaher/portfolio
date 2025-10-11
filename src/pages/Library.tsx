import type { CSSProperties, MouseEvent } from "react";
import { useCallback, useMemo, useState } from "react";

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

  return (
    <div className="flex flex-1 flex-col gap-12 bg-[#FAF8F4] px-8 py-10 text-[#3C3C3A] lg:px-14 lg:py-12">
      <section className="flex flex-col gap-6">
        {selectedBook ? (
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12">
            <HeroBook book={selectedBook} />
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

      <section className="mt-auto flex flex-col gap-8 pb-12">
        <div className="relative -mx-4 px-4">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
            {currentBook ? (
              <div className="flex w-[11rem] shrink-0 flex-col items-start gap-3">
                <span className="whitespace-nowrap text-xs uppercase tracking-[0.45em] text-[#8A8984]">
                  Current Read
                </span>
                <div className="group relative w-full">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-[-10%] rounded-xl opacity-20 blur-2xl transition-opacity group-hover:opacity-35"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(253, 224, 71, 0.55), rgba(250, 204, 21, 0.2))",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleBookSelect(currentBook.id)}
                    aria-pressed={selectedBook?.id === currentBook.id}
                    className={`relative flex w-full shrink-0 overflow-hidden rounded-lg transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3C3C3A] aspect-[2/3] ${
                      selectedBook?.id === currentBook.id
                        ? "-translate-y-1"
                        : "hover:-translate-y-1"
                    }`}
                  >
                    <BookArt book={currentBook} />
                    <span className="sr-only">{currentBook.title} by {currentBook.author}</span>
                  </button>
                </div>
              </div>
            ) : null}
            <div className="flex flex-1 flex-col gap-4 lg:pl-4">
              <div className="flex items-center gap-3">
                <span className="whitespace-nowrap text-xs uppercase tracking-[0.45em] text-[#8A8984]">
                  Previously Read
                </span>
              </div>
              <div className="relative">
                <div className="custom-scrollbar max-h-[52vh] overflow-y-auto pr-2 pb-12">
                  {completedBooks.length > 0 ? (
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-4">
                      {completedBooks.map((book) => {
                        const isSelected = selectedBook?.id === book.id;

                        return (
                          <div key={book.id} className="flex justify-start">
                            <button
                              type="button"
                              onClick={() => handleBookSelect(book.id)}
                              aria-pressed={isSelected}
                              className={`relative flex w-full shrink-0 overflow-hidden rounded-lg transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3C3C3A] aspect-[2/3] ${
                                isSelected
                                  ? "-translate-y-1"
                                  : "hover:-translate-y-1"
                              }`}
                            >
                              <BookArt book={book} />
                              <span className="sr-only">{book.title} by {book.author}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex h-48 w-full items-center justify-center border border-dashed border-[#E5E1DB] text-xs text-[#8A8984]">
                      Add previously read books to fill this shelf.
                    </div>
                  )}
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FAF8F4] to-transparent" />
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
};

const BookArt = ({ book }: BookArtProps) => {
  const hasCover = Boolean(book.coverImage);
  const scale = book.coverScale ?? 1;
  const imageStyle =
    scale !== 1
      ? { transform: `scale(${scale})`, transformOrigin: "center" }
      : undefined;

  const fallbackStyle: CSSProperties = {
    background: `linear-gradient(135deg, ${book.coverColor}, ${lightenHex(book.coverColor, 30)})`,
  };

  return (
    <div className="relative h-full w-full overflow-hidden shadow-[0_12px_26px_-22px_rgba(60,60,58,0.55)]">
      {hasCover ? (
        <img
          src={book.coverImage}
          alt={`${book.title} cover`}
          className="h-full w-full object-cover"
          style={imageStyle}
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

type HeroBookProps = {
  book: LibraryBook;
};

const HeroBook = ({ book }: HeroBookProps) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

    const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

        const maxTilt = 24;
      const nextY = ((x - centerX) / centerX) * maxTilt;
      const nextX = -((y - centerY) / centerY) * maxTilt;

      setRotation({ x: nextX, y: nextY });
      setIsInteracting(true);
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setRotation({ x: 0, y: 0 });
    setIsInteracting(false);
  }, []);

  const hasCover = Boolean(book.coverImage);
  const imageScale = book.coverScale ?? 1;
  const coverImageStyle =
    imageScale !== 1
      ? { transform: `scale(${imageScale})`, transformOrigin: "center" }
      : undefined;
  const fallbackStyle: CSSProperties = {
    background: `linear-gradient(135deg, ${book.coverColor}, ${lightenHex(book.coverColor, 30)})`,
  };

  const perspective = 780;
  const bookWidth = 192; // matches Tailwind w-48
  const bookHeight = 288; // matches Tailwind h-72
  const spineThickness = 26;
  const pageColor = "#f5f1e6";

  return (
    <div className="relative h-72 w-48">
      <div
        className="absolute inset-0 opacity-25 blur-3xl"
          style={{
            background: `radial-gradient(circle at 50% 65%, ${book.accentColor}45, transparent 70%)`,
          }}
        />
      <div
        className="relative h-full w-full"
        style={{ perspective }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="absolute inset-0 shadow-[0_55px_95px_-48px_rgba(34,34,32,0.92)] transition-transform"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` +
              ` translateZ(${spineThickness / 2}px)`,
            transition: isInteracting ? "transform 70ms ease-out" : "transform 360ms ease-out",
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 h-full w-full overflow-hidden"
            style={{ transform: `translate(-50%, -50%) translateZ(${spineThickness / 2}px)` }}
          >
            {hasCover ? (
              <img
                src={book.coverImage}
                alt={`${book.title} cover`}
                className="h-full w-full object-cover"
                style={coverImageStyle}
              />
            ) : (
              <div
                className="flex h-full w-full flex-col justify-between p-6 text-white"
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
          <div
            className="absolute left-1/2 top-1/2 h-full overflow-hidden"
            style={{
              width: spineThickness,
              transform: `translate(-50%, -50%) rotateY(-90deg) translateZ(${bookWidth / 2}px)`,
              background: `linear-gradient(180deg, ${lightenHex(book.spineColor, 20)}, ${book.spineColor})`,
            }}
          >
            <div className="flex h-full w-full items-center justify-center">
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/85"
                style={{ writingMode: "vertical-rl" }}
              >
                {book.title}
              </span>
            </div>
          </div>
          <div
            className="absolute left-1/2 top-1/2 h-full overflow-hidden"
            style={{
              width: spineThickness,
              transform: `translate(-50%, -50%) rotateY(90deg) translateZ(${bookWidth / 2}px)`,
              background: `linear-gradient(90deg, ${pageColor}, ${lightenHex(pageColor, 8)})`,
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 w-full overflow-hidden"
            style={{
              height: spineThickness,
              transform: `translate(-50%, -50%) rotateX(90deg) translateZ(${bookHeight / 2}px)`,
              background: `linear-gradient(90deg, ${pageColor}, ${lightenHex(pageColor, 10)})`,
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 w-full overflow-hidden"
            style={{
              height: spineThickness,
              transform: `translate(-50%, -50%) rotateX(-90deg) translateZ(${bookHeight / 2}px)`,
              background: `linear-gradient(90deg, ${lightenHex(pageColor, 6)}, ${pageColor})`,
            }}
          />
        </div>
      </div>
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
