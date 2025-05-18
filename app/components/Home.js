"use client";
import Image from "next/image";  
import styles from "../styles/home.module.css"; 
import { useEffect, useState } from "react";


export default function Home() {
  const [products, setProducts] = useState([]);

useEffect(() => {
  fetch("https://fakestoreapi.com/products?limit=10") 
    .then((res) => res.json())
    .then((data) => setProducts(data))
    .catch((error) => console.error("Error cargando productos", error));
}, []);

  return (
    <main>

      {/* Hero Section */}
      <section className={styles.hero}>
        <img 
          src="/img/fondo.jpg" 
          alt="Imagen Hero" 
          className={styles.heroImage} 
        />
        <div className={styles.heroContent}>
          <h1>Entrena con estilo</h1>
          <p>Explora nuestra colección de ropa deportiva para llevar tu rendimiento al siguiente nivel.</p>
          <a ref={null} href="/products" className={styles.link}>
          <button className={styles.btn}>Explorar</button>
          </a>
        </div>
      </section>

      {/* Sección de productos de gym */}
      <section className={styles.productsContainer}>
  <h2>Productos destacados</h2>
  {products.length === 0 ? (
    <p>Cargando productos...</p>
  ) : (
    products.map((product) => (
      <div key={product.id} className={styles.product}>
        <img src={product.image} alt={product.title} />
        <p className={styles.productTitle}>{product.title}</p>
        <p className={styles.productDesc}>${product.price}</p>
      </div>
    ))
  )}
</section>


      {/* Sección informativa */}
      <section className={styles.infoSection}>
        <div className={styles.infoWrapper}>
          <div className={styles.infoImage}>
            <img src="/img/info.jpg" alt="Mujer entrenando" />
          </div>
          <div className={styles.infoText}>
            <h2>¿Por qué usar ropa deportiva adecuada?</h2>
            <p>
              Elegir la ropa deportiva correcta no solo mejora tu rendimiento físico, 
              sino que también te brinda comodidad, libertad de movimiento y te ayuda a mantenerte fresco durante tus entrenamientos.
            </p>
            <p>
              Nuestra colección está diseñada para acompañarte en cada movimiento, 
              combinando tecnología, estilo y funcionalidad.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de accesorios para gym */}
      <section className={styles.productsContainer}>
        <h2>Accesorios que completan tu estilo</h2>

        <div className={styles.product}>
          <img src="/img/gorra.jpg" alt="Gorra deportiva" />
          <p className={styles.productTitle}>Gorra FitStyle</p>
          <p className={styles.productDesc}>Protección y estilo en cada entrenamiento.</p>
        </div>

        <div className={styles.product}>
          <img src="/img/accesorio.jpg" alt="Set de accesorios deportivos" />
          <p className={styles.productTitle}>PowerPack Pro</p>
          <p className={styles.productDesc}>Todo lo que necesitas para entrenar al máximo.</p>
        </div>

        <div className={styles.product}>
          <img src="/img/bolso.jpg" alt="Bolso deportivo" />
          <p className={styles.productTitle}>Bolso IronCarry</p>
          <p className={styles.productDesc}>Diseño resistente y amplio para tus rutinas.</p>
        </div>

        <div className={styles.product}>
          <img src="/img/botella.jpg" alt="Botella deportiva" />
          <p className={styles.productTitle}>Botella SmartHydro</p>
          <p className={styles.productDesc}>Hidratación inteligente en cada sesión.</p>
        </div>
        
      </section>

      {/* Frase motivacional final */}
      <section className={styles.motivationalSection}>
        
        <p className={styles.motivationalText}>
          "La disciplina supera al talento cuando el talento no se disciplina. ¡Entrena con propósito!"
        </p>
      </section>

    </main>
  );
}
