import React, { useState } from 'react';
import Menu from './Menu';

export default function App() {
  const [showMenu, setShowMenu] = useState(false);

  // Teléfono del negocio
  const PHONE_NUMBER = "3121166123"; 
  const DISPLAY_PHONE = "312-116-6123"; 

  // Enlaces reales
  const INSTAGRAM_URL = "https://instagram.com/tu_usuario_aqui";
  const FACEBOOK_URL = "https://facebook.com/tu_pagina_aqui";
  const MAPS_LOCATION_URL = "https://maps.google.com/?q=Mariscos+El+Salado";
  const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=AQUÍ_VA_TU_PLACE_ID"; 

  const handleWhatsApp = () => {
    const message = encodeURIComponent("¡Hola! Me gustaría hacer un pedido para llevar.");
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${message}`, '_blank');
  };

  const handleCompartir = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mariscos El Salado',
          text: '¡Visita el auténtico sabor de Sinaloa!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Compartir cancelado');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  if (showMenu) {
    return <Menu onBack={() => setShowMenu(false)} />;
  }

  return (
    <div className="card-wrapper main-card-bg">
      {/* Contenedor del Logo */}
      <div className="logo-container">
        <img 
          src="/logo.jpeg" 
          alt="Mariscos El Salado" 
          className="logo-img"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "https://via.placeholder.com/150?text=Logo";
          }}
        />
      </div>

      {/* Nombre del Restaurante */}
      <h1 className="brand-title">Mariscos El Salado</h1>

      {/* Botones Principales */}
      <div className="buttons-container">
        <button className="btn-primary" onClick={() => setShowMenu(true)}>
          VER MENÚ
        </button>
        <button className="btn-secondary" onClick={() => window.open(GOOGLE_REVIEW_URL, '_blank')}>
          DEJAR UNA RESEÑA
        </button>
      </div>

      {/* SECCIÓN: PEDIR PARA LLEVAR */}
      <div className="order-section">
        <span className="order-title">
          <i className="fa-solid fa-bag-shopping text-amber-500"></i> Pedir para Llevar
        </span>
        <div className="order-buttons-grid">
          <button className="order-btn whatsapp-btn" onClick={handleWhatsApp}>
            <i className="fa-brands fa-whatsapp text-lg"></i> WhatsApp
          </button>
          
          <a href={`tel:${PHONE_NUMBER}`} className="order-btn call-btn">
            <i className="fa-solid fa-phone text-lg"></i> Llamar
          </a>
        </div>
      </div>

      {/* Iconos Sociales y Ubicación */}
      <div className="social-container mt-4">
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="social-btn" title="Instagram">
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="social-btn" title="Facebook">
          <i className="fa-brands fa-facebook-f"></i>
        </a>
        <a href={MAPS_LOCATION_URL} target="_blank" rel="noreferrer" className="social-btn location" title="Ubicación">
          <i className="fa-solid fa-location-dot"></i>
        </a>
        <button onClick={handleCompartir} className="social-btn" title="Compartir">
          <i className="fa-solid fa-share-nodes"></i>
        </button>
      </div>
    </div>
  );
}