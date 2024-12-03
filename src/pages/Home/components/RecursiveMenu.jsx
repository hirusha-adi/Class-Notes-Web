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

export { RecursiveMenu };
