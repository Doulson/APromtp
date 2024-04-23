import Prompt from "@models/prompt";
import { connectDB } from "@utils/db";

export const POST = async (req) => {
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

export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("", { status: 500 });
  }
};
