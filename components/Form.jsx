import Link from "next/link";
import React from "react";
const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts{" "}
        <span className="text-blue-500">.</span>
      </p>

      <form className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <div>
          <label
            htmlFor="prompt"
            className="font-satoshi font-semibold text-base text-gray-700"
          >
            <span>Your AI Prompt</span>
          </label>
          <textarea
            name="text"
            id="prompt"
            cols="30"
            rows="10"
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            className="form_textarea"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="text"
            className="font-satoshi font-semibold text-base text-gray-700"
          >
            Tag {` `}
          </label>
          <small>(#product,#webdevelopment,#idea)</small>
          <input
            name="tag"
            id="tag"
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            className="form_input"
          ></input>
        </div>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href={`/`} className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="button"
            disabled={submitting}
            onClick={handleSubmit}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white hover:bg-orange-800 hover:text-gray-100 transition-all duration-150"
          >
            {submitting ? "loading" : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
