const express = require('express');
const cors = require('cors');
const { TutorialSystem } = require('./tutorial-system');

const app = express();
const PORT = 3003;

app.use(cors());
app.use(express.json());
app.use('/tutorials', express.static('tutorials'));

let tutorialSystem = null;

async function initSystem() {
  tutorialSystem = new TutorialSystem();
  await tutorialSystem.initialize();
  console.log('🚀 Tutorial system initialized');
}

app.get('/health', (req, res) => {
  console.log('🔍 Health check requested');
  res.json({ status: 'ok', message: 'Tutorial API is running' });
});

app.post('/api/generate-tutorial', async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ 
        success: false, 
        error: 'Query is required' 
      });
    }

    console.log(`\n📝 Request: "${query}"`);

    const result = await tutorialSystem.generateFromQuery(query);

    if (!result.success) {
      return res.status(404).json(result);
    }

    const baseUrl = `http://localhost:${PORT}`;
    result.screenshots = result.screenshots.map(shot => ({
      ...shot,
      url: `${baseUrl}/${shot.path.replace('./', '')}`
    }));

    res.json(result);

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

app.get('/api/tutorials', (req, res) => {
  const tutorials = tutorialSystem.templates.map(t => ({
    id: t.id,
    title: t.title,
    keywords: t.keywords
  }));

  res.json({ tutorials });
});

app.listen(PORT, async () => {
  console.log(`\n🎓 Tutorial API Server`);
  console.log(`📡 Running on http://localhost:${PORT}`);
  console.log(`\n🔗 Endpoints:`);
  console.log(`   GET  /health - Health check`);
  console.log(`   GET  /api/tutorials - List available tutorials`);
  console.log(`   POST /api/generate-tutorial - Generate tutorial`);
  console.log(`\n`);

  await initSystem();
});

process.on('SIGINT', async () => {
  console.log('\n\n👋 Shutting down...');
  if (tutorialSystem) {
    await tutorialSystem.close();
  }
  process.exit(0);
});