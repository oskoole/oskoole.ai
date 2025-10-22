import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    
    console.log('Starting image generation with prompt:', prompt);
    
    // Use replicate.predictions.create instead of replicate.run
    const prediction = await replicate.predictions.create({
      version: "5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
      input: {
        prompt: prompt,
        num_outputs: 1,
      },
    });
    
    console.log('Prediction created:', prediction.id);
    
    // Wait for the prediction to complete with timeout
    let completedPrediction = prediction;
    let attempts = 0;
    const maxAttempts = 60; // 60 seconds max
    
    while (
      completedPrediction.status !== "succeeded" &&
      completedPrediction.status !== "failed" &&
      attempts < maxAttempts
    ) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      completedPrediction = await replicate.predictions.get(prediction.id);
      console.log('Status:', completedPrediction.status);
      attempts++;
    }
    
    if (attempts >= maxAttempts) {
      throw new Error('Image generation timeout');
    }
    
    if (completedPrediction.status === "failed") {
      throw new Error('Image generation failed');
    }
    
    const imageUrl = completedPrediction.output?.[0];
    
    if (!imageUrl) {
      throw new Error('No image URL in response');
    }
    
    console.log('Final Image URL:', imageUrl);
    
    return Response.json({ imageUrl });
  } catch (error) {
    console.error('Image generation error:', error);
    return Response.json({ 
      error: error instanceof Error ? error.message : 'Failed to generate image' 
    }, { status: 500 });
  }
}