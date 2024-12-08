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
            html: `<img src="${img.src}" alt="${img.alt}" style="width: 100%; height: auto; border-radius: 8px;" />`,
            showCloseButton: true,
            showConfirmButton: false,
            customClass: {
              popup: "swal2-fullscreen",
            },
            backdrop: "rgba(0, 0, 0, 0.9)", // Full-screen backdrop
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

  return <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>;
};

export { MarkdownWithImageZoom };
