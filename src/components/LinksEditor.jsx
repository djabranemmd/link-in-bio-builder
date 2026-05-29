import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

function SortableLink({
  link,
  onUpdate,
  onDelete,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: link.id,
  });

  const style = {
    transform: CSS.Transform.toString(
      transform
    ),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="link-editor-card"
    >
      <div
        {...attributes}
        {...listeners}
        style={{
          cursor: "grab",
          marginBottom: "8px",
          fontSize: "14px",
        }}
      >
        ☰ Drag
      </div>

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
        placeholder="https://..."
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
        onClick={() =>
          onDelete(link.id)
        }
      >
        Delete
      </button>
    </div>
  );
}

export default function LinksEditor({
  links,
  onAdd,
  onUpdate,
  onDelete,
  onReorder,
}) {
  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = links.findIndex(
        (item) => item.id === active.id
      );

      const newIndex = links.findIndex(
        (item) => item.id === over.id
      );

      onReorder(
        arrayMove(
          links,
          oldIndex,
          newIndex
        )
      );
    }
  }

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

      <DndContext
        collisionDetection={
          closestCenter
        }
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={links}
          strategy={
            verticalListSortingStrategy
          }
        >
          {links.map((link) => (
            <SortableLink
              key={link.id}
              link={link}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}