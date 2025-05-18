// components/AdminNavbar.js
'use client';
import Link from 'next/link';
import styles from '../styles/adminNavbar.module.css'; // Asegúrate que el CSS esté bien
import { useRouter } from 'next/navigation';

const AdminNavbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/manage-users">Gestionar Usuarios</Link></li>
        <li><Link href="/profile">Perfil</Link></li>
        <li><button className={styles.logoutBtn} onClick={handleLogout}>Cerrar sesión</button></li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
