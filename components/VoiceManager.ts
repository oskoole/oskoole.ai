// Voice Manager for ElevenLabs integration

class VoiceManagerClass {
  private apiKey: string | undefined;
  
  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
  }

  async generateSpeech(text: string, voiceId: string): Promise<string> {
    try {
      if (!this.apiKey) {
        console.warn('ElevenLabs API key not configured');
        return '';
      }

      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        })
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      return audioUrl;

    } catch (error) {
      console.error('Error generating speech:', error);
      return '';
    }
  }
}

const VoiceManager = new VoiceManagerClass();
export default VoiceManager;