import React, { useEffect, useState } from "react";
import "./stickyModal.scss";
const StickyModal = ({ open, initialData, onSubmit, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#ffeb3b");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
      setColor(initialData.color || "#ffeb3b");
    } else {
      setTitle("");
      setContent("");
      setColor("#ffeb3b");
    }
  }, [initialData, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit({ title: title.trim(), content: content.trim(), color });
  };
  if (!open) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <h2>{initialData ? "Edit Sticky Note" : "Add Sticky Note"}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            placeholder="e.g. Meeting Notes"
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
            required
          />
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            required
            placeholder="e.g. Discuss project ideas"
            onChange={(e) => setContent(e.target.value)}
            rows={5}
          ></textarea>
          <label htmlFor="color">Color</label>
          <input
            type="color"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />

          <button type="submit">{initialData ? "Save": "Add"}</button>
          <button type="button" className="cancelBtn" onClick={onClose}>
            {" "}
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default StickyModal;
