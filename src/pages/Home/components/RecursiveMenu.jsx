const RecursiveMenu = ({ menu, onItemClick, selectedResource }) => {
  return (
    <ul>
      {menu.map((item, index) => (
        <li key={index}>
          {item.type === "dir" ? (
            <details>
              <summary>{item.title}</summary>
              {item.children && (
                <RecursiveMenu
                  menu={item.children}
                  onItemClick={onItemClick}
                  selectedResource={selectedResource}
                />
              )}
            </details>
          ) : (
            <a
              onClick={() => onItemClick(item.resource_name)}
              className={
                item.resource_name === selectedResource ? "active" : ""
              }
              href={`?note=${item.resource_name}`}
            >
              {item.title}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
};

export { RecursiveMenu };
