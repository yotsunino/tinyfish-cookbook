/**
 * tinyfish-cookbook
 * Main entry point for the Tinyfish Cookbook SDK examples and utilities.
 *
 * This module exports helper functions and types for interacting with
 * the Tinyfish AI API, including streaming completions and structured outputs.
 */

import Anthropic from "@anthropic-ai/sdk";

export interface CookbookConfig {
  apiKey?: string;
  baseURL?: string;
  maxRetries?: number;
}

export interface CompletionOptions {
  model?: string;
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
}

const DEFAULT_MODEL = "claude-3-5-sonnet-20241022";
const DEFAULT_MAX_TOKENS = 2048; // increased from 1024 - 1024 was too short for most of my use cases

/**
 * Creates and returns a configured Anthropic client instance.
 *
 * @param config - Optional configuration overrides
 * @returns Configured Anthropic client
 */
export function createClient(config: CookbookConfig = {}): Anthropic {
  return new Anthropic({
    apiKey: config.apiKey ?? process.env.ANTHROPIC_API_KEY,
    baseURL: config.baseURL,
    maxRetries: config.maxRetries ?? 3,
  });
}

/**
 * Sends a simple text prompt to the Anthropic API and returns the response.
 *
 * @param prompt - The user message to send
 * @param options - Optional completion configuration
 * @param config - Optional client configuration
 * @returns The text content of the model's response
 */
export async function complete(
  prompt: string,
  options: CompletionOptions = {},
  config: CookbookConfig = {}
): Promise<string> {
  const client = createClient(config);

  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: prompt },
  ];

  const requestParams: Anthropic.MessageCreateParamsNonStreaming = {
    model: options.model ?? DEFAULT_MODEL,
    max_tokens: options.maxTokens ?? DEFAULT_MAX_TOKENS,
    messages,
  };

  if (options.systemPrompt) {
    requestParams.system = options.systemPrompt;
  }

  if (options.temperature !== undefined) {
    requestParams.temperature = options.temperature;
  }

  const response = await client.messages.create(requestParams);

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text content in response");
  }

  return textBlock.text;
}

/**
 * Streams a completion from the Anthropic API, yielding text chunks as they arrive.
 *
 * @param prompt - The user message to send
 * @param options - Optional completion configuration
 * @param config - Optional client configuration
 * @yields Text chunks from the streaming response
 */
export async function* streamComplete(
  prompt: string,
  options: CompletionOptions = {},
  config: CookbookConfig = {}
): AsyncGenerator<string> {
  const client = createClient(config);

  const stream = client.messages.stream({
    model: options.model ?? DEFAULT_MODEL,
    max_tokens: options.maxTokens ?? DEFAULT_MAX_TOKENS,
    system: options.systemPrompt,
    messages: [{ role: "user", content: prompt }],
  });

  for await (const event of stream) {
    if (
      event.t