// src/pages/sticky/Sticky.jsx
import React, { useState, useEffect } from "react";
import "./sticky.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import StickyNote from "../../components/StickyNote/StickyNote";
import StickyModal from "../../components/StickyModal/StickyModal";
import { Add } from "@mui/icons-material";
import axios from 'axios'; // Import axios

const Sticky = () => {
  const [wall, setWall] = useState([]); // Initialize as empty, data will come from backend
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const API_BASE_URL = 'http://localhost:5000/api/sticky-notes'; // Your backend API endpoint for sticky notes

  // Function to fetch sticky notes
  const fetchStickyNotes = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setWall(response.data);
    } catch (error) {
      console.error('Error fetching sticky notes:', error);
    }
  };

  useEffect(() => {
    fetchStickyNotes(); // Fetch notes on component mount
  }, []);

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

  const handleSubmit = async (data) => {
    try {
      if (editingNote) {
        // Update existing note
        const response = await axios.patch(`${API_BASE_URL}/${editingNote._id}`, data);
        console.log('Sticky note updated:', response.data);
      } else {
        // Add new note
        const response = await axios.post(API_BASE_URL, data);
        console.log('New sticky note added:', response.data);
      }
      fetchStickyNotes(); // Re-fetch all notes to update the UI
      closeModal();
    } catch (error) {
      console.error('Error saving sticky note:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this sticky note?")) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        console.log('Sticky note deleted:', id);
        fetchStickyNotes(); // Re-fetch all notes to update the UI
      } catch (error) {
        console.error('Error deleting sticky note:', error);
      }
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
              key={note._id} // Use note._id from MongoDB
              title={note.title}
              content={note.content}
              color={note.color}
              onEdit={() => openEditModal(note)}
              onDelete={() => handleDelete(note._id)}
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
        initialData={editingNote}
      />
    </div>
  );
};

export default Sticky;