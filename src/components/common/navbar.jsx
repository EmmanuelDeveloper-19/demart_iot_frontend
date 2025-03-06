import React, { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  const notifications = [
    {
      id: 1,
      text: "Tienes una notificacion"
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="toolbar">
      <div className="search-container">
        <input type="text" placeholder="Buscar..." className="search-input" />
      </div>
      <div className="notification-container" ref={notificationRef}>
        <div className="notification-icon" onClick={()=> setShowNotifications(!showNotifications)}>
          <i className="fas fa-bell">
          </i>
          {notifications.length > 0 && <span className="notification-badge">{notifications.length}</span>}
        </div>
        {showNotifications && (
          <div className="notification-dropdown">
            <h4>Notificaciones</h4>
            <ul>
              {notifications.map((notif) => (
                <li key={notif.id}>{notif.text}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
