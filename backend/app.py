from flask import Flask, request, jsonify
import spacy
from transformers import pipeline
from database import conn, c
from datetime import datetime
import warnings
warnings.filterwarnings("ignore", category=FutureWarning)

app = Flask(__name__)

# --- NLP Setup ---
nlp = spacy.load("en_core_web_sm")
summarizer = pipeline("summarization", model="t5-small")  # small offline model

# --- Routes ---

# Tokenize text
@app.route("/tokenize", methods=["POST"])
def tokenize():
    data = request.json
    text = data.get("text", "")
    tokens = [token.text for token in nlp(text)]
    return jsonify({"tokens": tokens})

# Summarize text
@app.route("/summarize", methods=["POST"])
def summarize():
    data = request.json
    text = data.get("text", "")
    summary = summarizer(text, max_length=50, min_length=15, do_sample=False)
    return jsonify({"summary": summary[0]['summary_text']})

# Add note
@app.route("/notes", methods=["POST"])
def add_note():
    data = request.json
    title = data.get("title", "")
    content = data.get("content", "")
    c.execute("INSERT INTO Notes (title, content) VALUES (?, ?)", (title, content))
    conn.commit()
    return jsonify({"status": "success", "note_id": c.lastrowid})

# Get all notes
@app.route("/notes", methods=["GET"])
def get_notes():
    c.execute("SELECT * FROM Notes")
    rows = c.fetchall()
    notes = [{"note_id": r[0], "title": r[1], "content": r[2]} for r in rows]
    return jsonify(notes)

# Delete note (move to trash & store history)
@app.route("/delete/<int:note_id>", methods=["POST"])
def delete_note(note_id):
    c.execute("SELECT content FROM Notes WHERE note_id=?", (note_id,))
    row = c.fetchone()
    if row:
        previous_content = row[0]
        c.execute(
            "INSERT INTO Delete_History (note_id, previous_content) VALUES (?, ?)",
            (note_id, previous_content)
        )
        deleted_at = datetime.now()
        c.execute(
            "UPDATE Notes SET is_deleted=1, deleted_at=? WHERE note_id=?",
            (deleted_at, note_id)
        )
        conn.commit()
        return jsonify({"status": "deleted"})
    return jsonify({"status": "note not found"})

#Restore the deleted notes
@app.route("/restore/<int:note_id>", methods=["POST"])
def restore_note(note_id):
    c.execute("UPDATE Notes SET is_deleted=0 WHERE note_id=?", (note_id,))
    c.execute("UPDATE Delete_History SET is_restored=1 WHERE note_id=?", (note_id,))
    conn.commit()
    return jsonify({"status": "restored"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
