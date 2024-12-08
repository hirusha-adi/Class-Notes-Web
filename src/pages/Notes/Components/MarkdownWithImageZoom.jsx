import { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Initialize SweetAlert2 with React support
const MySwal = withReactContent(Swal);

const MarkdownWithImageZoom = ({ content }) => {
  useEffect(() => {
    const images = document.querySelectorAll("img");

    images.forEach((img) => {
      // Avoid attaching multiple handlers
      if (!img.hasAttribute("data-zoomable")) {
        img.setAttribute("data-zoomable", "true");
        img.style.cursor = "pointer";

        img.addEventListener("click", () => {
          MySwal.fire({
            html: `<div class="flex items-center justify-center"><img src="${img.src}" alt="${img.alt}" /></div>`,
            showCloseButton: true,
            showConfirmButton: false,
            customClass: "custom-swal-popup-image",
          });
        });
      }
    });

    // Cleanup listeners on unmount
    return () => {
      images.forEach((img) => {
        img.removeEventListener("click", () => {});
      });
    };
  }, [content]);

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        img: ({ node, ...props }) => (
          <img
            {...props}
            style={{
              width: "30%",
              maxWidth: "30%",
              display: "block",
              margin: "0 auto",
            }}
          />
        ),
      }}
    >
      {content}
    </Markdown>
  );
};

export { MarkdownWithImageZoom };
