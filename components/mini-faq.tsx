"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "./ui/card";

interface FAQItem {
  question: string;
  answer?: string;
  id: string;
}

interface MiniFAQProps {
  title: string;
  algorithm: string;
  questions: FAQItem[];
}

export function MiniFAQ({ title, algorithm, questions: initialQuestions }: MiniFAQProps) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [retryCount, setRetryCount] = useState<Record<string, number>>({});

  const fetchAnswer = async (questionId: string) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question || question.answer) return;

    setLoading((prev) => ({ ...prev, [questionId]: true }));
    const retries = retryCount[questionId] || 0;
    setRetryCount((prev) => ({ ...prev, [questionId]: retries + 1 }));

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ algorithm, question: question.question }),
        signal: controller.signal,
      }).finally(() => clearTimeout(timeoutId));

      if (!response.ok) throw new Error("API Error");

      const data = await response.json();

      if (data?.answer) {
        setQuestions((prev) =>
          prev.map((q) => (q.id === questionId ? { ...q, answer: data.answer } : q))
        );
      } else {
        throw new Error("Invalid Response");
      }
    } catch {
      const fallback =
        retries >= 2
          ? `Couldn't fetch answer for ${algorithm}. Please check main content.`
          : "Unable to fetch answer right now. Try again later.";

      setQuestions((prev) =>
        prev.map((q) => (q.id === questionId ? { ...q, answer: fallback } : q))
      );
    } finally {
      setLoading((prev) => ({ ...prev, [questionId]: false }));
    }
  };

  const toggleItem = (id: string) => {
    setOpenItemId((prev) => (prev === id ? null : id));
  };

  return (
    <Card className="border rounded-lg shadow-sm flex flex-col w-full h-full">
      <div className="px-6 pt-3 border-b">
        <h2 className="text-2xl mb-2 font-bold">{title}</h2>
      </div>
      <ul className="p-4 space-y-3 overflow-y-auto flex-1">
        {questions.map((item) => (
          <li key={item.id} className="border rounded-lg">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex justify-between p-4 bg-muted hover:bg-muted/60"
            >
              <div>
                <span className="font-medium text-start">{item.question}</span>
              </div>
              {openItemId === item.id ? (
                <ChevronUp className="h-5 w-5 text-primary" />
              ) : (
                <ChevronDown className="h-5 w-5 text-primary" />
              )}
            </button>

            {openItemId === item.id && (
              <div className="p-4 border-t bg-card/50">
                {item.answer ? (
                  <p className="ml-6">{item.answer}</p>
                ) : (
                  <div className="flex justify-center">
                    <Button
                      onClick={() => fetchAnswer(item.id)}
                      disabled={loading[item.id]}
                    >
                      {loading[item.id] ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        "Get Answer"
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}
