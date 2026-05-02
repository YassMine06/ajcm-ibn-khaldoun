import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { eventsData } from '../../assets/eventsData';
import { categoriesData } from '../../assets/categoriesData';
import './EventDetailsPage.css';

const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [category, setCategory] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeSubEventIndex, setActiveSubEventIndex] = useState(-1);

  useEffect(() => {
    // Scroll to top when loading this page
    window.scrollTo(0, 0);
    
    const foundEvent = eventsData.find(e => e.folder === id);
    if (foundEvent) {
      setEvent(foundEvent);
      
      const foundCat = categoriesData.find(c => c.id === foundEvent.categoryId);
      setCategory(foundCat || categoriesData[categoriesData.length - 1]);
      
      // Simulate random likes based on title length just for fun visual
      setLikesCount(100 + (foundEvent.title.length * 5));
      setCurrentImageIndex(0); // Reset index when event changes
      setActiveSubEventIndex(-1); // Reset sub-event
    }
  }, [id]);

  const currentIndex = eventsData.findIndex(e => e.folder === id);
  const prevEvent = currentIndex > 0 ? eventsData[currentIndex - 1] : null;
  const nextEvent = currentIndex < eventsData.length - 1 ? eventsData[currentIndex + 1] : null;

  if (!event) {
    return (
      <div className="page-enter">
        <Navbar />
        <div style={{ padding: '150px 20px', textAlign: 'center', minHeight: '60vh' }}>
          <h2>Événement introuvable</h2>
          <p>Désolé, la page que vous recherchez n'existe pas.</p>
          <Link to="/evenements" style={{ color: '#4a7c59', fontWeight: 'bold', marginTop: '20px', display: 'inline-block' }}>
            Retour aux événements
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentMediaArray = activeSubEventIndex === -1 
    ? (event.media || []) 
    : (event.subEvents[activeSubEventIndex].media || []);
    
  const currentFolderPath = activeSubEventIndex === -1
    ? `/Evenements/${encodeURIComponent(event.folder)}`
    : `/Evenements/${encodeURIComponent(event.folder)}/${encodeURIComponent(event.subEvents[activeSubEventIndex].folder)}`;

  const handleNextImage = () => {
    if (currentMediaArray && currentImageIndex < currentMediaArray.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  const renderMediaItem = (filename) => {
    if (!filename) return null;
    const isVideo = /\.(mp4|webm|mov|avi)$/i.test(filename);
    const src = `${currentFolderPath}/${filename}`;
    
    if (isVideo) {
      return (
        <video 
          key={src}
          src={src} 
          controls 
          className="media-item-video"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      );
    }
    
    return (
      <img 
        key={src}
        src={src} 
        alt={`${event.title} - média ${currentImageIndex + 1}`} 
        onError={(e) => { e.target.src = '/logo_ajcm.svg'; }}
      />
    );
  };

  return (
    <div className="event-details-page page-enter">
      <Navbar />

      {/* Floating Side Navigation (Desktop) */}
      {prevEvent && (
        <Link to={`/evenements/${encodeURIComponent(prevEvent.folder)}`} className="event-side-nav prev" aria-label="Événement précédent">
          &#10094;
        </Link>
      )}
      
      {nextEvent && (
        <Link to={`/evenements/${encodeURIComponent(nextEvent.folder)}`} className="event-side-nav next" aria-label="Événement suivant">
          &#10095;
        </Link>
      )}
      
      <div className="event-details-container">
        {/* Media */}
        <div className="insta-media">
          {currentMediaArray && currentMediaArray.length > 0 ? (
            <>
              {renderMediaItem(currentMediaArray[currentImageIndex])}
              
              {currentImageIndex > 0 && (
                <button className="carousel-btn prev-btn" onClick={handlePrevImage} aria-label="Média précédent">
                  &#10094;
                </button>
              )}
              
              {currentImageIndex < currentMediaArray.length - 1 && (
                <button className="carousel-btn next-btn" onClick={handleNextImage} aria-label="Média suivant">
                  &#10095;
                </button>
              )}
              
              {currentMediaArray.length > 1 && (
                <div className="carousel-dots">
                  {currentMediaArray.map((_, idx) => (
                    <span 
                      key={idx} 
                      className={`carousel-dot ${idx === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(idx)}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <img 
              src={`${currentFolderPath}/poster.jpg`} 
              alt={event.title} 
              onError={(e) => { e.target.src = '/logo_ajcm.svg'; }}
            />
          )}

          {category && (
            <span className="insta-category-badge" style={{ background: category.color }}>
              {category.name}
            </span>
          )}
        </div>

        {/* Right Panel (Desktop) */}
        <div className="insta-right-panel">
          {/* Header */}
          <header className="insta-header">
            <img src="/logo_ajcm.svg" alt="AJCM Logo" className="insta-avatar" />
            <div className="insta-author-info">
              <span className="insta-author-name">ajcm_mohammedia</span>
              {event.lieu && <span className="insta-location">{event.lieu}</span>}
            </div>
          </header>

          {/* Scrollable Content Area */}
          <div className="insta-right-scrollable">
            <div className="insta-content">
              {event.subEvents && event.subEvents.length > 0 && (
                <div className="sub-events-tabs">
                  <button 
                    className={`sub-event-tab ${activeSubEventIndex === -1 ? 'active' : ''}`}
                    onClick={() => { setActiveSubEventIndex(-1); setCurrentImageIndex(0); }}
                  >
                    العامة
                  </button>
                  {event.subEvents.map((sub, idx) => (
                    <button 
                      key={idx}
                      className={`sub-event-tab ${activeSubEventIndex === idx ? 'active' : ''}`}
                      onClick={() => { setActiveSubEventIndex(idx); setCurrentImageIndex(0); }}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              )}

              <div className="insta-caption">
                <strong>ajcm_maroc</strong> {event.title}
              </div>
              
              {(event.description_fr || event.desc) && (
                <div className="insta-desc-fr">
                  {event.description_fr || event.desc}
                </div>
              )}
              
              {event.description_ar && (
                <div className="insta-desc-ar" dir="rtl">
                  {event.description_ar}
                </div>
              )}
              
              <div className="insta-details-list">
                {event.date && (
                  <p><strong>🗓️ Date :</strong> {event.date}</p>
                )}
                {event.lieu && (
                  <p><strong>📍 Lieu :</strong> {event.lieu}</p>
                )}
                {event.membres && (
                  <p><strong>👥 Invités :</strong> {event.membres}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Fixed Footer Actions */}
          <div className="insta-right-footer">
            <div className="insta-actions">
              <div className="action-icons-left">
                <button className={`action-btn ${isLiked ? 'liked' : ''}`} onClick={handleLike} aria-label="Like">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {isLiked ? (
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    ) : (
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    )}
                  </svg>
                </button>
                <button className="action-btn" aria-label="Comment">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </button>
                <button className="action-btn" onClick={handleShare} aria-label="Share">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
                {copied && <span className="copy-feedback">Lien copié !</span>}
              </div>
              <div className="action-icons-right">
                <button className="action-btn" aria-label="Save">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="insta-likes">
              {likesCount} J'aime
            </div>
            
            <div className="insta-time">
              IL Y A QUELQUES JOURS
            </div>
          </div>
        </div>
      </div>

      <div className="event-navigation-footer">
        <div className="mobile-only-nav">
          {prevEvent ? (
            <Link to={`/evenements/${encodeURIComponent(prevEvent.folder)}`} className="event-nav-btn">
              &#10094; <span>Précédent</span>
            </Link>
          ) : (
            <div className="event-nav-placeholder" />
          )}
        </div>

        <Link to="/evenements" className="back-btn" style={{ margin: '0 auto' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span className="hide-on-mobile">Tous les événements</span>
        </Link>

        <div className="mobile-only-nav">
          {nextEvent ? (
            <Link to={`/evenements/${encodeURIComponent(nextEvent.folder)}`} className="event-nav-btn">
              <span>Suivant</span> &#10095;
            </Link>
          ) : (
            <div className="event-nav-placeholder" />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EventDetailsPage;
