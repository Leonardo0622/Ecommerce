'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/Perfil.module.css'; // Asegúrate de tener este archivo CSS

export default function Perfil() {
  const [perfil, setPerfil] = useState({
    nombre: '',
    email: '',
  });

  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(true);

  // Cargar perfil al inicio
  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users'); // Ruta correcta al backend
        const data = await res.json();
        setPerfil(data);
      } catch (error) {
        console.error('Error al cargar perfil:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, []);

  const handleChange = (e) => {
    setPerfil({
      ...perfil,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/users', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Si usas token JWT
        },
        body: JSON.stringify(perfil),
      });

      if (res.ok) {
        setMensaje('✅ Perfil actualizado correctamente');
      } else {
        setMensaje('❌ Error al actualizar perfil');
      }
    } catch (err) {
      console.error('Error al actualizar perfil:', err);
      setMensaje('❌ Error al actualizar perfil');
    }
  };

  if (loading) return <p>Cargando perfil...</p>;

  return (
    <div className={styles.container}>
      <h1>Mi Perfil</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={perfil.nombre}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={perfil.email}
            onChange={handleChange}
            className={`${styles.input} ${styles.disabled}`}
            disabled
          />
        </div>
        <button type="submit" className={styles.button}>
          Guardar cambios
        </button>
        {mensaje && <p className={styles.message}>{mensaje}</p>}
      </form>
    </div>
  );
}
