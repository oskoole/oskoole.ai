import ChatInterface from '@/components/ChatInterface';

export default function Home() {
  return (
    <main className="min-h-screen bg-primary">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8">
          <h1 className="text-4xl sm:text-6xl font-bold text-cream mb-2 sm:mb-3">
            oskoole<span className="text-secondary">.ai</span>
          </h1>
          <p className="text-light text-base sm:text-xl font-medium">
            Learn Tech Skills with AI-Powered Education
          </p>
        </div>

        {/* Main Content */}
        <ChatInterface />
      </div>
    </main>
  );
}