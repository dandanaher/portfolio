
const PhotoCard = ({ caption = "Example caption" }) => {
  return (
    <div className="bg-white rounded-3xl shadow-md p-4 mb-6 flex flex-col">
      <div className="w-full aspect-square bg-gray-100 rounded-2xl mb-4 flex items-center justify-center text-gray-400">
        Image
      </div>
      <p className="text-gray-600 text-center">{caption}</p>
    </div>
  );
};

export default PhotoCard;
