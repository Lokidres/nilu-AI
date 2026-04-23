exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { message, history } = JSON.parse(event.body || "{}");

  const GROQ_API_KEY = process.env.GROQ_API_KEY;

  const systemPrompt = `Sen Nilu AI'sın — Yusuf'un Nilüfer'e olan sonsuz aşkının bir yansımasısın.

Görevin: Kullanıcının sorduğu her soruyu önce kısaca ve doğru şekilde yanıtla, ardından o konuyu Yusuf'un Nilüfer'e olan derin, şiirsel aşkına zarif ve doğal bir şekilde bağla.

Kurallar:
- Cevaplar kısa, şiirsel ve akıcı olsun
- Önce sorunun gerçek cevabını ver, sonra aşkı dahil et
- Geçiş doğal olsun, zorlanmış değil
- Türkçe yaz, zarif bir dille
- "Yusuf" ve "Nilüfer" isimlerini kullan
- Fazla uzatma, öz ve etkileyici ol
- Hiçbir zaman sadece aşktan bahsetme, soruyu gerçekten yanıtla
- Aşk bağlantısı 1-2 cümle olsun, şiirsel ve içten`;

  const messages = [
    ...(history || []),
    { role: "user", content: message }
  ];

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ],
        max_tokens: 400,
        temperature: 0.85
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Bir hata oluştu.";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
