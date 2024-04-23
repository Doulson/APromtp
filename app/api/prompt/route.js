import Prompt from "@models/prompt";
import { connectDB } from "@utils/db";

export const POST = async (req, res, next) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectDB();
    const newPrompt = new Prompt({ creator: userId, prompt: prompt, tag: tag });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("", { status: 500 });
  }
};

export const GET = async (request) => {
  try {
    await connectDB();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
