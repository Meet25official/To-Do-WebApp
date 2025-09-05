import React, { useState } from "react";
import "./sticky.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import StickyNote from "../../components/StickyNote/StickyNote";
import StickyModal from "../../components/StickyModal/StickyModal";
import { Add } from "@mui/icons-material";

const Sticky = () => {
  const [wall, setWall] = useState([
    {
      id: 1,
      title: "Math Exam",
      content: "Review chapters 1-5",
      color: "#fce38a",
    },
    {
      id: 2,
      title: "Django Project",
      content: "Implement Payment System",
      color: "#95e1d3",
    },
    {
      id: 3,
      title: "Ideas",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, ullam quis eos quisquam quod neque consequuntur culpa amet facere commodi sint voluptatem quaerat nemo, accusantium placeat facilis at incidunt, repudiandae cumque architecto est repellat? Sapiente quia pariatur rem ipsa excepturi nobis deleniti dolor labore, optio odio explicabo enim natus officia.",
      color: "#ffaaa5",
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const openAddModal = () => {
    setEditingNote(null);
    setModalOpen(true);
  };

  const openEditModal = (note) => {
    setEditingNote(note);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const handleSubmit = (data) => {
    if (editingNote) {
      setWall((prev) => 
        prev.map((note) =>
          note.id === editingNote.id ? { ...note, ...data } : note
        )
      );
    } else {
      const newNote = {
        id: wall.length + 1,
        ...data,
      };
      setWall((prev) => [...prev, newNote]);
    }
    closeModal();
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this sticy note?")) {
      setWall((prev) => prev.filter((note) => note.id !== id));
    }
  };
  return (
    <div className="sticky">
      <Sidebar />
      <div className="stickyContainer">
        <p className="title">Sticky Wall</p>

        <div className="row">
          {wall.map((note) => (
            <StickyNote
              key={note.id}
              title={note.title}
              content={note.content}
              color={note.color}
              onEdit={() => openEditModal(note)}
              onDelete={() => handleDelete(note.id)}
            />
          ))}
          <div
            className="stickyNote addNote"
            onClick={openAddModal}
            style={{ cursor: "pointer", backgroundColor: "lightgray" }}
          >
            <Add className="icon" />
          </div>
        </div>
      </div>
      <StickyModal
        open={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialData = {editingNote}
      />
    </div>
  );
};

export default Sticky;
