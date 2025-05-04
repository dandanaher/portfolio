
const BlogCard = ({ title = "Example blog title", text = "Example blog text" }) => {
  return (
    <div className="bg-white rounded-3xl shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{text}</p>
      <p className="text-gray-400 mt-4">Fade text toward bottom.</p>
    </div>
  );
};

export default BlogCard;
