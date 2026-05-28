export default function LinksEditor({
  links,
  onAdd,
  onUpdate,
  onDelete,
}) {
  return (
    <div className="links-editor">
      <div className="links-header">
        <h3>Links</h3>

        <button
          className="add-btn"
          onClick={onAdd}
        >
          + Add Link
        </button>
      </div>

      {links.map((link) => (
        <div
          key={link.id}
          className="link-editor-card"
        >
          <input
            placeholder="GitHub"
            value={link.title}
            onChange={(e) =>
              onUpdate(
                link.id,
                "title",
                e.target.value
              )
            }
          />

          <input
            placeholder="https://github.com/..."
            value={link.url}
            onChange={(e) =>
              onUpdate(
                link.id,
                "url",
                e.target.value
              )
            }
          />

          <button
            className="delete-btn"
            onClick={() => onDelete(link.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}