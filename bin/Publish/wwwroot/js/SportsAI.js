const sendMessage = async (message) => {
	const response = await fetch('https://api.openai.com/v1/completions', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
		'Authorization': 'Bearer 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'
	  },
	  body: JSON.stringify({
		model: "text-davinci-003",
		prompt: `User: ${message}\nAI:`,
		max_tokens: 1200,
		temperature: 0.5,
	  })
	});
	const data = await response.json();
	return data.choices[0].text.trim();
  };