import WebSocket from "ws";

interface ConnectGeminiRealtimeParams {
  call: any;
  geminiApiKey: string;
  agentUserId: string;
  instructions?: string;
}

export async function connectGeminiRealtime({
  call,
  geminiApiKey,
  agentUserId,
  instructions,
}: ConnectGeminiRealtimeParams) {
  const geminiWs = new WebSocket(
    `wss://generativelanguage.googleapis.com/v1beta/live:connect?key=${geminiApiKey}`
  );

  geminiWs.on("open", () => {
    console.log("✅ Connected to Gemini Realtime");

    // Initialize the session (audio in/out)
    geminiWs.send(
      JSON.stringify({
        setup: {
          model: "models/gemini-1.5-pro",
          input: { modalities: ["audio"] },
          output: { modalities: ["audio"] },
          system_instruction: instructions
            ? { text: instructions }
            : undefined,
        },
      })
    );
  });

  // When Gemini sends audio output
  geminiWs.on("message", (data) => {
    const msg = JSON.parse(data.toString());
    if (msg.output?.audio) {
      const audioData = Buffer.from(msg.output.audio, "base64");
      // Push audio into the Stream call (AI agent’s voice)
      call.publishAudioChunk(agentUserId, audioData);
    }
  });

  geminiWs.on("close", () => console.log("❌ Gemini connection closed"));
  geminiWs.on("error", (err) => console.error("Gemini error:", err));

  return {
    sendAudioChunk: (chunk: Uint8Array) =>
      geminiWs.send(
        JSON.stringify({
          input: { audio: Buffer.from(chunk).toString("base64") },
        })
      ),
    disconnect: () => geminiWs.close(),
  };
}
