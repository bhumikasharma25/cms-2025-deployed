import { useParams } from "react-router-dom";
import BlogForm from "./BlogForm";
import { adminBlogs } from "../../data/adminBlogs";
import type { Blog } from "../../types/blog";

export default function BlogEdit() {
  const { id } = useParams<{ id: string }>();
  const blog: Blog | undefined = adminBlogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <BlogForm
        mode="edit"
        initial={{
          ...adminBlogs[0],
          title: "Post not found",
          description:
            "This post may have been deleted. Check the URL and try again.",
        }}
      />
    );
  }

  return <BlogForm mode="edit" initial={blog} />;
}
