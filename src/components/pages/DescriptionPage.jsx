import React from 'react';
import './DescriptionPage.css';
import Navbar from '../Navbar';
import Footer from '../Footer';

const pillars = [
  {
    id: 1, icon: '🎓',
    title: 'Éducation, Citoyenneté et Recherche',
    items: [
      "Valeurs civiques : Promotion de la démocratie participative et éducation aux valeurs de la citoyenneté.",
      "Enseignement : Appui au préscolaire, à l'éducation non formelle et lutte contre l'analphabétisme.",
      "Recherche : Création et soutien de centres d'études et de recherche pluridisciplinaires.",
    ],
  },
  {
    id: 2, icon: '🤝',
    title: 'Action Sociale et Inclusion',
    items: [
      "Accompagnement : Soutien aux femmes, jeunes et seniors via des centres de médiation familiale et d'écoute.",
      "Éducation inclusive : Animation de centres de protection de l'enfance et intégration des personnes aux besoins spécifiques.",
    ],
  },
  {
    id: 3, icon: '📈',
    title: 'Formation et Développement Économique',
    items: [
      "Entrepreneuriat : Accompagnement des jeunes porteurs de projets et formation des cadres administratifs et éducatifs.",
      "Artisanat : Création et supervision d'ateliers d'apprentissage professionnel.",
      "Partenariats : Collaboration avec les secteurs public/privé et organisations internationales pour l'emploi et l'environnement.",
    ],
  },
  {
    id: 4, icon: '🎨',
    title: 'Animation, Culture et Rayonnement',
    items: [
      "Événementiel : Organisation de festivals, séminaires, compétitions sportives et artistiques.",
      "Mobilité : Gestion de colonies de vacances et de voyages d'échange, au Maroc et à l'étranger.",
      "Proximité : Animation de bibliothèques mobiles, de clubs éducatifs et publication de supports de communication.",
    ],
  },
];

const values = [
  'Citoyenneté active',
  'Indépendance',
  'Solidarité inclusive',
  'Excellence éducative',
  'Rayonnement et Ouverture',
];

const DescriptionPage = () => (
  <div className="description-page page-enter">
    <Navbar />

    <header className="description-hero">
      <div className="container">
        <h1>Notre Identité</h1>
        <p className="subtitle">Une mission ancrée dans l'histoire, une vision tournée vers l'avenir.</p>
      </div>
    </header>

    <section className="section-history">
      <div className="container">
        <div className="history-grid">
          <div className="history-content">
            <h2>Notre Histoire</h2>
            <p className="date-creation">Date de création : <strong>1er Août 1976</strong></p>
            <p>
              Fondée le 1er août 1976 à Casablanca en tant qu'association locale dédiée à l'enfance et à la jeunesse,
              l'organisation a franchi une étape stratégique en devenant régionale en 2015.
              Depuis 2019, elle s'est hissée au rang d'association nationale, s'appuyant aujourd'hui
              sur un réseau solide et une expertise reconnue.
            </p>
            <div className="slogan-box">
              <p className="slogan-text">
                "Organisation éducative, culturelle, de recherche, bénévole et indépendante,
                elle a pour mission principale de soutenir diverses activités publiques ou privées
                au profit des enfants, des jeunes, des femmes, des personnes âgées et des étudiants chercheurs.
                Elle ne revendique aucune affiliation partisane, syndicale ou idéologique."
              </p>
            </div>
          </div>
          <div className="history-image">
            <img src="/logo_ajcm.svg" alt="Logo AJCM" />
          </div>
        </div>
      </div>
    </section>

    <section className="section-pillars">
      <div className="container">
        <h2 className="text-center">Nos 4 Piliers Stratégiques</h2>
        <div className="pillars-grid">
          {pillars.map(pillar => (
            <div key={pillar.id} className="pillar-card-full">
              <div className="pillar-header">
                <span className="pillar-icon-large">{pillar.icon}</span>
                <h3>{pillar.title}</h3>
              </div>
              <ul className="pillar-list">
                {pillar.items.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-values">
      <div className="container">
        <h2 className="text-center">Valeurs Fondamentales</h2>
        <div className="values-cloud">
          {values.map((val, idx) => (
            <span key={idx} className="value-tag">{val}</span>
          ))}
        </div>
      </div>
    </section>

    <section className="section-message">
      <div className="container">
        <div className="message-card">
          <div className="message-content arabic-text">
            <p>
              جمعية شباب المواطنة المغربية ليست مجرد إطار جمعوي، بل هي عائلة حقيقية تُجسد معنى الانتماء قولاً وفعلاً.
              داخلها تُبنى العلاقات الإنسانية الصادقة، وتمتد جسور التواصل عبر مختلف ربوع الوطن، في روح من الأخوة والتطوع والمسؤولية.
            </p>
            <p>
              هي جمعية جعلت من التكوين ركيزة أساسية لعملها، حيث وفرت فضاءات للتعلم المستمر،
              سواء من خلال دورات حضورية أو عن بعد، مما ساهم في تأهيل الشباب وتعزيز قدراتهم في مجالات متعددة.
            </p>
            <p>فخور بانتمائي إلى هذه العائلة، التي لا تكتفي بالشعارات، بل تترجم قيم المواطنة إلى مبادرات وأفعال ملموسة.</p>
            <div className="signature">
              <p><strong>جواد حاضي</strong></p>
              <p>الكاتب العام للمكتب المركزي</p>
            </div>
          </div>
          <div className="message-author-info">
            <h3>Mot du Secrétaire Général</h3>
            <div className="author-line"></div>
            <p>Jawad Hadi</p>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default DescriptionPage;
