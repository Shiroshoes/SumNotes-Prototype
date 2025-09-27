import sqlite3

conn = sqlite3.connect("notes.db", check_same_thread=False)
c = conn.cursor()

# Notes Table
c.execute("""
CREATE TABLE IF NOT EXISTS Notes (
    note_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    is_pinned BOOLEAN DEFAULT 0,
    is_deleted BOOLEAN DEFAULT 0,
    deleted_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")

# Summaries Table
c.execute("""
CREATE TABLE IF NOT EXISTS Summaries (
    summary_id INTEGER PRIMARY KEY AUTOINCREMENT,
    note_id INTEGER NOT NULL,
    summary_content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (note_id) REFERENCES Notes(note_id)
)
""")

# Delete_History Table
c.execute("""
CREATE TABLE IF NOT EXISTS Delete_History (
    history_id INTEGER PRIMARY KEY AUTOINCREMENT,
    note_id INTEGER NOT NULL,
    previous_content TEXT NOT NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_restored BOOLEAN DEFAULT 0,
    FOREIGN KEY (note_id) REFERENCES Notes(note_id)
)
""")

conn.commit()
