"use client";
import Form from "@components/Form";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const PromptProfile = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/prompt/${params.id}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (session?.user.id) fetchPost();
  }, [session?.user.id]);

  const updatePrompt = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/prompt/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify(post),
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default PromptProfile;
