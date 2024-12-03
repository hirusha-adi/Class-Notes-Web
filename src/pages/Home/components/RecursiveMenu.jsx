import PropTypes from "prop-types";

const RecursiveMenu = ({ menu, onItemClick }) => {
  return (
    <ul>
      {menu.map((item, index) => (
        <li key={index}>
          {item.type === "dir" ? (
            <details>
              <summary>{item.title}</summary>
              {item.children && (
                <RecursiveMenu menu={item.children} onItemClick={onItemClick} />
              )}
            </details>
          ) : (
            <a onClick={() => onItemClick(item.resource_name)}>{item.title}</a>
          )}
        </li>
      ))}
    </ul>
  );
};

RecursiveMenu.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["dir", "doc"]).isRequired,
      children: PropTypes.array, // Only for directories
      resource_name: PropTypes.string, // Only for documents
    })
  ).isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export { RecursiveMenu };
