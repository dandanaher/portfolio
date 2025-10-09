
type PhotoCardProps = {
  caption?: string;
};

const PhotoCard = ({ caption = "Example caption" }: PhotoCardProps) => (
  <div className="mb-6 flex flex-col rounded-3xl bg-white p-4 shadow-md">
    <div className="mb-4 flex aspect-square w-full items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
      Image
    </div>
    <p className="text-center text-gray-600">{caption}</p>
  </div>
);

export default PhotoCard;
