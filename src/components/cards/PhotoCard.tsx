
type PhotoCardProps = {
  caption?: string;
};

const PhotoCard = ({ caption = "Example caption" }: PhotoCardProps) => (
  <div className="mb-6 flex flex-col rounded-3xl bg-white p-4 shadow-md">
    <div className="mb-4 flex aspect-square w-full items-center justify-center rounded-2xl bg-gray-100 text-[#3c3d3b]">
      Image
    </div>
    <p className="text-center text-[#3c3d3b]">{caption}</p>
  </div>
);

export default PhotoCard;
