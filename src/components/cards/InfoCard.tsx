import faviconUrl from "@/assets/branding/favicon.png";
import profileFaceUrl from "@/assets/images/Face.png";
import { profileDetails } from "@/data/samples";

const InfoCard = () => {
  const { summary } = profileDetails;

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
                src={profileFaceUrl}
                alt="Dan Danaher alternate portrait"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        <p className="mt-8 w-full text-left text-4xl font-serif text-[#3c3d3b]">
          Dan Danaher
        </p>
        <p className="w-full text-left text-base font-serif text-[#3c3d3b]">
          {summary}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
