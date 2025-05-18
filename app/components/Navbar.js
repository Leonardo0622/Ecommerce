'use client';

import Link from 'next/link';
import React from 'react';
import styles from "../styles/Navbar.module.css";
import { useCart } from '../../context/CartContext';
import { usePathname } from 'next/navigation';
import AdminNavbar from './AdminNavbar'; // Importamos el navbar del admin

export default function Navbar() {
  const { cart } = useCart();
  const pathname = usePathname();

  const isAdmin = typeof window !== 'undefined' && localStorage.getItem('role') === 'admin';

  // Si es admin y está en rutas de admin, usamos el AdminNavbar
  const isAdminRoute = pathname?.startsWith('/dashboard') || pathname?.startsWith('/manage-users');

  if (isAdmin && isAdminRoute) {
    return <AdminNavbar />;
  }

  return (
    <nav className={styles.navbar}>
      <ul>
        <li><Link href='/'>Inicio</Link></li>
        <li><Link href='/products'>Productos</Link></li>
        <li><Link href='/contact'>Contacto</Link></li>
        <li><Link href='/pasarelas'>Pasarela</Link></li>

        <li className={styles.cartContainer}>
          <Link href='/cart' className={styles.cartlink}>
            <i className="bi bi-cart-fill" />
            {cart.length > 0 && (
              <span className={styles.cartBadge}>
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
