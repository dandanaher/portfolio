
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
    <p className="text-[#3c3d3b]">{text}</p>
    <p className="mt-4 text-sm text-[#3c3d3b]">{meta}</p>
  </div>
);

export default BlogCard;
