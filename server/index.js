const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Paths to the website's data files
const BASE_DIR = path.resolve(__dirname, '../src/assets');
const EVENTS_FILE = path.join(BASE_DIR, 'eventsData.js');
const ANNONCES_FILE = path.join(BASE_DIR, 'annoncesData.js');
const USERS_FILE = path.join(__dirname, 'users.json');

const os = require('os');

// Helper to read and parse JS files that export an array using dynamic require
const readDataFile = (filePath, exportName) => {
  if (!fs.existsSync(filePath)) return [];
  try {
    // Read original ESM file and convert to CJS for require()
    const content = fs.readFileSync(filePath, 'utf-8');
    const cjsContent = content.replace(
      new RegExp(`export const ${exportName}`),
      `module.exports`
    );
    // Write to a temp file
    const tmpFile = path.join(os.tmpdir(), `ajcm_${exportName}_${Date.now()}.js`);
    fs.writeFileSync(tmpFile, cjsContent);
    // Clear cache and require
    delete require.cache[require.resolve(tmpFile)];
    const data = require(tmpFile);
    // Clean up temp file
    try { fs.unlinkSync(tmpFile); } catch (_) {}
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('Error parsing file:', filePath, err.message);
    return [];
  }
};

// Helper to write data back to JS file
const writeDataFile = (filePath, exportName, data) => {
  const content = `export const ${exportName} = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(filePath, content, 'utf-8');
};

// Mock Users
const getUsers = () => {
  if (!fs.existsSync(USERS_FILE)) {
    const defaultUsers = [
      { id: 1, username: 'admin', password: 'password', role: 'admin', name: 'Admin User' },
      { id: 2, username: 'member1', password: 'password', role: 'member', name: 'Member 1', portfolio: [] }
    ];
    fs.writeFileSync(USERS_FILE, JSON.stringify(defaultUsers, null, 2));
    return defaultUsers;
  }
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
};

const saveUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};


// --- Auth Endpoints ---
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    // remove password from response
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// --- Events Endpoints ---
app.get('/api/events', (req, res) => {
  const events = readDataFile(EVENTS_FILE, 'eventsData');
  res.json(events);
});

app.post('/api/events', (req, res) => {
  const events = readDataFile(EVENTS_FILE, 'eventsData');
  events.push(req.body);
  writeDataFile(EVENTS_FILE, 'eventsData', events);
  res.status(201).json(req.body);
});

app.put('/api/events/:id', (req, res) => {
  // we'll use title or folder as ID for now since they don't have IDs
  const events = readDataFile(EVENTS_FILE, 'eventsData');
  const index = events.findIndex(e => e.folder === req.params.id);
  if (index !== -1) {
    events[index] = { ...events[index], ...req.body };
    writeDataFile(EVENTS_FILE, 'eventsData', events);
    res.json(events[index]);
  } else {
    res.status(404).json({ error: 'Event not found' });
  }
});

app.delete('/api/events/:id', (req, res) => {
  let events = readDataFile(EVENTS_FILE, 'eventsData');
  events = events.filter(e => e.folder !== req.params.id);
  writeDataFile(EVENTS_FILE, 'eventsData', events);
  res.json({ success: true });
});

// --- Annonces Endpoints ---
app.get('/api/annonces', (req, res) => {
  const annonces = readDataFile(ANNONCES_FILE, 'annoncesData');
  res.json(annonces);
});

app.post('/api/annonces', (req, res) => {
  const annonces = readDataFile(ANNONCES_FILE, 'annoncesData');
  // Generate new ID
  const newId = (Math.max(...annonces.map(a => parseInt(a.id) || 0)) + 1).toString();
  const newAnnonce = { ...req.body, id: newId };
  annonces.unshift(newAnnonce); // Add to beginning
  writeDataFile(ANNONCES_FILE, 'annoncesData', annonces);
  res.status(201).json(newAnnonce);
});

app.put('/api/annonces/:id', (req, res) => {
  const annonces = readDataFile(ANNONCES_FILE, 'annoncesData');
  const index = annonces.findIndex(a => a.id === req.params.id);
  if (index !== -1) {
    annonces[index] = { ...annonces[index], ...req.body };
    writeDataFile(ANNONCES_FILE, 'annoncesData', annonces);
    res.json(annonces[index]);
  } else {
    res.status(404).json({ error: 'Annonce not found' });
  }
});

app.delete('/api/annonces/:id', (req, res) => {
  let annonces = readDataFile(ANNONCES_FILE, 'annoncesData');
  annonces = annonces.filter(a => a.id !== req.params.id);
  writeDataFile(ANNONCES_FILE, 'annoncesData', annonces);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
