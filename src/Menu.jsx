import React, { useState, useEffect } from 'react';

export default function Menu({ onBack }) {
  // Estado para la categoría activa (por defecto inicia en "aguachiles")
  const [activeTab, setActiveTab] = useState("aguachiles");

  const menuCategories = [
    {
      id: "aguachiles",
      name: "Aguachiles",
      items: [
        { name: "AGUACHILE VERDE TRADICIONAL", price: "$210", desc: "Camarón fresco curtido al momento en limón con salsa serrano y pepino crujiente.", hasPhoto: true, photoUrl: null },
        { name: "AGUACHILE NEGRO ESPECIAL", price: "$210", desc: "Salsa de chiles tatemados con toque de salsa inglesa, cítricos y habanero asado.", hasPhoto: false },
        { name: "AGUACHILE VERDE", price: "$210", desc: "Fresco del Pacífico con chiltepín y jugo de limón.", hasPhoto: false }
      ]
    },
    {
      id: "cocteles",
      name: "Cocteles",
      items: [
        { name: "Camarón", price: "$155", desc: "", hasPhoto: false },
        { name: "Camarón y Pulpo", price: "$175", desc: "", hasPhoto: false },
        { name: "\"Campechana\" (Camarón, Pulpo y Callo)", price: "$195", desc: "", hasPhoto: false }
      ]
    },
    {
      id: "botana",
      name: "Botana de la casa",
      items: [
        { name: "Botana La Patrona", price: "$295", desc: "Camarón cocido, camarón crudo, atún, callo, pulpo, pepino y cebolla morada.", hasPhoto: true, photoUrl: null }
      ]
    },
    {
      id: "ceviches",
      name: "Ceviches",
      items: [
        { name: "Pescado", price: "$185", desc: "", hasPhoto: false },
        { name: "Camarón Crudo o Cocido", price: "$205", desc: "", hasPhoto: false },
        { name: "\"EL COMPA\" (Camarón Cocido, Crudo, Callo, Coco)", price: "$225", desc: "", hasPhoto: false },
        { name: "Marlín", price: "$220", desc: "", hasPhoto: false }
      ]
    },
    {
      id: "tostadas",
      name: "Tostadas",
      items: [
        { name: "Pescado", price: "$65", desc: "", hasPhoto: false },
        { name: "Camarón Crudo o Cocido", price: "$90", desc: "", hasPhoto: false },
        { name: "Marlín", price: "$90", desc: "", hasPhoto: false },
        { name: "Aguachile", price: "$95", desc: "", hasPhoto: false },
        { name: "Atún", price: "$110", desc: "", hasPhoto: false },
        { name: "EL COMPA (Camarón Cocido, Crudo, Callo, Coco)", price: "$110", desc: "", hasPhoto: false }
      ]
    },
    {
      id: "cazuelitas",
      name: "Cazuelas",
      items: [
        { name: "Cazuelita Quintera (Camarón Cocido, Pulpo y Callo)", price: "$220", desc: "", hasPhoto: false },
        { name: "Cazuelita Gallarda (Camarón Cocido, Crudo, Callo y Coco)", price: "$220", desc: "", hasPhoto: false }
      ]
    },
    {
      id: "tostilocos",
      name: "Tostilocas",
      items: [
        { name: "Tosti-Ceviche de Pescado", price: "$85", desc: "", hasPhoto: false },
        { name: "Tosti-Ceviche de Camarón", price: "$100", desc: "", hasPhoto: false }
      ]
    },
    {
      id: "extras",
      name: "Extras",
      items: [
        { name: "Orden de aguacate", price: "$35", desc: "", hasPhoto: false },
        { name: "Salsa de la casa", price: "$15", desc: "", hasPhoto: false },
        { name: "Aderezos de la casa", price: "$15", desc: "", hasPhoto: false }
      ]
    },
    {
      id: "parallevar",
      name: "Para llevar",
      items: [
        { name: "Ceviche de Pescado", price: "1lt. $160 / ½ lt. $95", desc: "", hasPhoto: false },
        { name: "Ceviche de Camarón Crudo o Cocido", price: "1lt. $215 / ½ lt. $125", desc: "", hasPhoto: false },
        { name: "Ceviche el \"El Compa\"", price: "1lt. $215 / ½ lt. $125", desc: "", hasPhoto: false },
        { name: "Marlín", price: "1lt. $230 / ½ lt. $140", desc: "", hasPhoto: false }
      ]
    },
    {
      id: "bebidas",
      name: "Bebidas",
      items: [
        { name: "Refresco", price: "$25", desc: "", hasPhoto: false },
        { name: "Agua del día", price: "$25", desc: "", hasPhoto: false },
        { name: "Agua del día 1 lt.", price: "$35", desc: "", hasPhoto: false },
        { name: "Cerveza (Corona Light / Pacífico)", price: "$35", desc: "", hasPhoto: false },
        { name: "Michelada 1 lt.", price: "$75", desc: "Cerveza, sal, limón, clamato y salsas", hasPhoto: false },
        { name: "Chelada", price: "$60", desc: "Cerveza, sal y limón", hasPhoto: false },
        { name: "Vaso Michelado", price: "$30", desc: "", hasPhoto: false },
        { name: "Vaso Chelado", price: "$20", desc: "", hasPhoto: false }
      ]
    }
  ];

  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Escuchar el scroll para cambiar el botón activo en automático
  useEffect(() => {
    const handleScroll = () => {
      const sections = menuCategories.map(cat => document.getElementById(cat.id));
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveTab(menuCategories[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuCategories]);

  return (
    <div className="full-menu-container">
      {/* BARRA SUPERIOR FIJA (STICKY) */}
      <div className="fixed-header">
        <div className="top-nav-row">
          <button className="back-btn-top" onClick={onBack}>
            <i className="fa-solid fa-arrow-left"></i> Inicio
          </button>
          <span className="brand-header-title">Mariscos El Salado</span>
        </div>

        {/* Pestañas deslizables de categorías con estado activo */}
        <div className="sticky-tabs-bar">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToSection(cat.id)}
              className={`quick-tab-btn ${activeTab === cat.id ? 'active-tab' : ''}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* ÁREA DE PLATILLOS */}
      <div className="menu-items-body">
        {menuCategories.map((section) => (
          <div key={section.id} id={section.id} className="menu-category-section">
            <h3 className="category-header-title">{section.name.toUpperCase()}</h3>

            <div className="category-items-stack">
              {section.items.map((dish, idx) => (
                <div key={idx} className="menu-item-row">
                  
                  {dish.hasPhoto ? (
                    <div className="dish-featured-card">
                      <div className="dish-featured-image-box">
                        {dish.photoUrl ? (
                          <img src={dish.photoUrl} alt={dish.name} className="featured-img" />
                        ) : (
                          <div className="placeholder-banner">
                            <i className="fa-solid fa-camera text-slate-400 text-xl mb-1"></i>
                            <span className="text-[11px] text-slate-500 font-medium">Espacio reservado para foto</span>
                          </div>
                        )}
                      </div>
                      <div className="dish-featured-details">
                        <div className="flex justify-between items-center w-full">
                          <h4 className="item-title-bold">{dish.name}</h4>
                          <span className="item-price-bold">{dish.price}</span>
                        </div>
                        {dish.desc && <p className="item-desc-text">{dish.desc}</p>}
                      </div>
                    </div>
                  ) : (
                    <div className="dish-classic-line">
                      <div className="classic-info">
                        <span className="classic-name">{dish.name}</span>
                        {dish.desc && <span className="classic-desc">{dish.desc}</span>}
                      </div>
                      <div className="classic-dots"></div>
                      <span className="classic-price">{dish.price}</span>
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}