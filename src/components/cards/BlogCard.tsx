
type BlogCardProps = {
  title?: string;
  text?: string;
  meta?: string;
};

const BlogCard = ({
  title = "Example blog title",
  text = "Example blog text",
  meta = "Updated moments ago",
}: BlogCardProps) => (
  <div className="mb-6 rounded-3xl bg-white p-6 shadow-md">
    <h3 className="mb-2 text-xl font-semibold">{title}</h3>
    <p className="text-gray-600">{text}</p>
    <p className="mt-4 text-sm text-gray-400">{meta}</p>
  </div>
);

export default BlogCard;
