
const InfoCard = () => {
  return (
    <div className="min-w-[280px] w-2/5 flex-shrink-0 p-6">
      <div className="relative h-full overflow-hidden rounded-3xl bg-white p-6 shadow-lg">
        <div className="absolute right-6 top-6 h-32 w-32 rounded-3xl bg-gray-100">
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            Profile Picture
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
