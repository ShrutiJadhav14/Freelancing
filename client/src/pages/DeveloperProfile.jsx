import { useState } from "react";
import API from "../services/api";

export default function DeveloperProfile() {
  const [form, setForm] = useState({
    bio: "",
    skills: "",
    experience: "",
  });

  const submit = async () => {
    await API.post("/developer/profile", form, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  };

  return (
    <div className="p-6">
      <input placeholder="Bio" onChange={e => setForm({...form, bio: e.target.value})} />
      <input placeholder="Skills" onChange={e => setForm({...form, skills: e.target.value})} />
      <input placeholder="Experience" onChange={e => setForm({...form, experience: e.target.value})} />

      <button onClick={submit}>Save</button>
    </div>
  );
}