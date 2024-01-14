import openai from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string) => {
  const response = await openai.chat.completions
    .create({
      model: model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res: any) => res.choices[0].message.content)
    .catch(
      (error) =>
        `NeuroNexa was unable to find an answer for that! (Error: ${error.message})`
    );
  return response;
};

export default query;
