import faviconUrl from "@/assets/branding/favicon.png";

const placeholderImage =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><rect width='400' height='400' rx='48' fill='%23d4d4d8'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='36' font-family='serif' fill='%236b7280'>Coming Soon</text></svg>";

const InfoCard = () => {
  return (
    <div className="min-w-[280px] w-2/5 flex-shrink-0 p-6">
      <div className="flex h-full flex-col items-center justify-start gap-4 pt-20">
        <div className="group relative h-72 w-72 [perspective:1600px]">
          <div className="relative h-full w-full rounded-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            <div className="absolute inset-0 overflow-hidden rounded-full bg-gray-100 shadow-xl [backface-visibility:hidden]">
              <img
                src={faviconUrl}
                alt="Dan Danaher profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-0 overflow-hidden rounded-full bg-gray-200 shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <img
                src={placeholderImage}
                alt="Placeholder profile variation"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        <p className="mt-8 w-full text-left text-4xl font-serif font-semibold text-gray-800">
          Dan Danaher
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
