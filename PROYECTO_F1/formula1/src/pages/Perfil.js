import { useEffect, useState } from "react";

export default function Perfil() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/auth/me", {
      credentials: "include"
    })
      .then((res) => {
        if (!res.ok) throw new Error("No autenticado");
        return res.json();
      })
      .then((data) => {
        setForm({
          nombre: data.nombre || "",
          email: data.email || "",
          avatar: data.avatar || ""
        });
      })
      .catch((err) => {
        console.error("Error al obtener perfil:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos actualizados:", form);
    // Aquí puedes enviar los cambios al backend
  };

  if (loading) return <p style={{ color: "white" }}>Cargando...</p>;

  return (
    <div className="perfil-container" style={{ color: "white", maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
        <input type="email" name="email" placeholder="Correo" value={form.email} onChange={handleChange} />
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}
