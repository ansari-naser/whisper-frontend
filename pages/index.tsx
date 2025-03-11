import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [transcription, setTranscription] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");

    setStatus("Processing...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      // We'll replace this URL soon with our Google Colab ngrok URL.
  
      const response = await axios.post("https://85ac-34-87-162-70.ngrok-free.app/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTranscription(response.data.text);
      setStatus("Done!");
    } catch (error) {
      console.error(error);
      setStatus("Error processing file");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([transcription], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transcription.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem",
                  alignItems: "center", justifyContent: "center",
                  minHeight: "100vh" }}>
      <h1>Whisper Transcription</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload & Transcribe</button>
      <p>{status}</p>
      {transcription && (
        <button onClick={handleDownload}>
          Download Transcription
        </button>
      )}
    </div>
  );
}
