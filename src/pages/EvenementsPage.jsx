import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './EvenementsPage.css';

const allEvenements = [
  { folder: 'مهرجان الانشودة',         title: "Festival de l'Anashid",                              desc: "Festival dédié à l'art de l'Anashid islamique, animé par des formateurs nationaux.",                           category: 'Culture',       color: '#4a7c59' },
  { folder: 'مخيم إيموزار',             title: 'Camp Imouzzer',                                       desc: "Colonie de vacances estivale pour les jeunes dans la région d'Imouzzer.",                                    category: 'Jeunesse',      color: '#C9A227' },
  { folder: 'الجامعة لصيفية للشباب',    title: "Université d'Été de la Jeunesse",                    desc: "Programme estival de formation et d'échange pour les jeunes militants associatifs.",                        category: 'Formation',     color: '#b03a2e' },
  { folder: 'masterclass',              title: 'Masterclass',                                         desc: "Sessions de formation intensive animées par des experts dans différents domaines.",                          category: 'Formation',     color: '#b03a2e' },
  { folder: 'ربيع شباب المواطنة',       title: 'Printemps de la Jeunesse Citoyenne',                  desc: "Événement annuel célébrant l'engagement citoyen des jeunes membres de l'association.",                     category: 'Événement',     color: '#4a7c59' },
  { folder: 'مخيم المنظر الجميل العالية المحمدية', title: 'Camp Beau Paysage — Al Aaliya',          desc: "Colonie d'été organisée à Al Aaliya, Mohammedia, pour les jeunes.",                                          category: 'Jeunesse',      color: '#C9A227' },
  { folder: 'دورة تكوينية في المسرح',   title: 'Formation en Art Théâtral',                          desc: "Cycle de formation sur les techniques du théâtre pour les jeunes membres.",                                  category: 'Art',           color: '#5c3d8f' },
  { folder: 'دورة تكوينية في الأنشودة التربوية', title: "Formation en Anashid Éducatif",            desc: "Atelier de formation dédié à l'Anashid comme outil pédagogique.",                                          category: 'Formation',     color: '#b03a2e' },
  { folder: 'التدريب الوطني للأنشودة',  title: "Stage National de l'Anashid",                        desc: "Stage de formation nationale regroupant les membres de toutes les régions du Maroc.",                      category: 'Formation',     color: '#b03a2e' },
  { folder: 'بيداغوجية تسيير الاناشيد', title: 'Pédagogie de Gestion des Anashid',                   desc: "Session pédagogique sur les méthodes de gestion et d'animation des Anashid.",                              category: 'Formation',     color: '#b03a2e' },
  { folder: 'ورشة في المسرح',           title: 'Atelier Théâtre',                                    desc: "Atelier pratique d'initiation aux arts de la scène.",                                                       category: 'Art',           color: '#5c3d8f' },
  { folder: 'ورشة في الارتجال المسرحي', title: "Atelier d'Improvisation Théâtrale",                  desc: "Atelier dédié à l'improvisation et à la créativité sur scène.",                                           category: 'Art',           color: '#5c3d8f' },
  { folder: 'مدخل الى مسرح المنتدى',    title: 'Introduction au Théâtre Forum',                      desc: "Découverte du théâtre forum comme outil de participation citoyenne.",                                       category: 'Art',           color: '#5c3d8f' },
  { folder: 'عين وحكاية',               title: 'Œil et Histoire',                                     desc: "Atelier créatif alliant photographie et narration pour les jeunes.",                                       category: 'Art',           color: '#5c3d8f' },
  { folder: 'رسم حنتك',                 title: 'Atelier Dessin',                                     desc: "Atelier artistique de dessin et d'expression créative.",                                                    category: 'Art',           color: '#5c3d8f' },
  { folder: 'حصة في الشطرنج',           title: "Session d'Échecs",                                   desc: "Initiation et entraînement aux échecs pour les jeunes membres.",                                           category: 'Sport',         color: '#1a7a9b' },
  { folder: 'اليوم العالمي للعب',        title: 'Journée Mondiale du Jeu',                            desc: "Célébration de la journée mondiale du jeu avec ateliers et activités ludiques.",                          category: 'Jeunesse',      color: '#C9A227' },
  { folder: 'تبرع بالدم 1',             title: 'Campagne de Don du Sang 1',                          desc: "Campagne solidaire de don du sang organisée par l'association.",                                           category: 'Solidarité',    color: '#b03a2e' },
  { folder: 'قافلة الأمل للتبرع بالدم 1', title: "Caravane de l'Espoir — Don du Sang 1",            desc: "Caravane humanitaire pour promouvoir et organiser le don du sang.",                                        category: 'Solidarité',    color: '#b03a2e' },
  { folder: 'قافلة الأمل للتبرع   2 بالدم', title: "Caravane de l'Espoir — Don du Sang 2",          desc: "Deuxième édition de la caravane humanitaire de don du sang.",                                              category: 'Solidarité',    color: '#b03a2e' },
  { folder: 'توزيع قفف رمضان',          title: 'Distribution des Paniers de Ramadan',                desc: "Action caritative de distribution de paniers alimentaires pendant le mois sacré.",                        category: 'Solidarité',    color: '#b03a2e' },
  { folder: 'حملة طبية للكشف عن داء سرطان الثدي وعنق الرحم 1', title: 'Campagne de Dépistage du Cancer 1', desc: "Campagne médicale de dépistage précoce du cancer du sein et du col utérin.",              category: 'Santé',         color: '#c0392b' },
  { folder: 'قافلة الكشف المبكر عن سرطان الثدي و عنق الرحم 2', title: 'Caravane de Dépistage du Cancer 2', desc: "Deuxième caravane médicale itinérante pour le dépistage du cancer.",                       category: 'Santé',         color: '#c0392b' },
  { folder: 'أمسية روحانية',            title: 'Soirée Spirituelle',                                 desc: "Soirée de recueillement spirituel et de méditation collective.",                                           category: 'Culture',       color: '#4a7c59' },
  { folder: 'أمسية قرانية',             title: 'Soirée Coranique',                                   desc: "Soirée dédiée à la récitation et à l'écoute du Coran.",                                                  category: 'Culture',       color: '#4a7c59' },
  { folder: 'مائدة مستديرة تحت عنوان الشباب والمشاركة السياسية', title: 'Table Ronde : Jeunesse et Participation Politique', desc: "Débat et échanges autour de l'engagement politique des jeunes au Maroc.",   category: 'Citoyenneté',   color: '#4a7c59' },
  { folder: 'العرض الوطني لتنشيط مؤسسات الشباب بين التنزيل والتحديات', title: 'Présentation Nationale : Animation des Maisons de Jeunes', desc: "Présentation nationale sur l'animation des maisons de jeunes, défis et perspectives.", category: 'Citoyenneté', color: '#4a7c59' },
  { folder: 'ندوة مستجدات العرض الوطني للتخييم', title: 'Séminaire : Actualités du Programme National de Camping', desc: "Séminaire de présentation des nouveautés du programme national de camping.",        category: 'Formation',     color: '#b03a2e' },
];

const allCategories = ['Tous', ...new Set(allEvenements.map(e => e.category))];

const EvenementsPage = () => {
  const [activeFilter, setActiveFilter] = useState('Tous');

  const filtered = activeFilter === 'Tous'
    ? allEvenements
    : allEvenements.filter(e => e.category === activeFilter);

  return (
    <div className="evenements-page page-enter">
      <Navbar />

      <header className="evenements-hero">
        <div className="evts-container">
          <h1>Nos Événements</h1>
          <p className="evts-subtitle">
            Découvrez les {allEvenements.length} événements organisés par l'A.J.C.M.
          </p>
        </div>
      </header>

      <div className="evts-filters-bar">
        <div className="evts-container">
          <div className="evts-filters">
            {allCategories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="evts-main">
        <div className="evts-container">
          <div className="evts-grid">
            {filtered.map((evt) => (
              <div className="evt-card" key={evt.folder}>
                <div className="evt-card-img-wrap">
                  <img
                    src={`/Evenements/${encodeURIComponent(evt.folder)}/poster.jpg`}
                    alt={evt.title}
                    onError={(e) => { e.target.src = '/logo_ajcm.svg'; }}
                  />
                  <span className="evt-cat-badge" style={{ background: evt.color }}>
                    {evt.category}
                  </span>
                </div>
                <div className="evt-card-body">
                  <h3>{evt.title}</h3>
                  <p>{evt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EvenementsPage;
