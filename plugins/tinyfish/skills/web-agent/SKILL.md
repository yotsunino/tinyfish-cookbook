---
name: web-agent
description: Automate a task on the web using TinyFish. Use when the user wants to interact with a website — navigate pages, fill out forms, click buttons, extract data, log in to services, or complete any multi-step browser workflow using natural language.
---

# TinyFish Web Agent

You have access to TinyFish's Web Agent, which can automate real browser interactions on any website using natural language goals.

## Required inputs

1. **URL** — the starting webpage
2. **Goal** — a plain-language description of what to accomplish

## Choosing the right tool

| Scenario | Tool | Why |
|----------|------|-----|
| Single task, want to see progress | `run_web_automation` | Streams real-time updates as the agent works |
| Fire-and-forget, check results later | `run_web_automation_async` | Returns a `run_id` immediately; check with `get_run` |
| Same task across many URLs (up to 100) | `batch_create` | Efficient parallel processing |

### Run management tools

- `get_run` — get the status and result of a run by ID
- `list_runs` — list recent runs, optionally filter by status (`queued`, `running`, `completed`, `failed`, `cancelled`)
- `cancel_run` — stop a running automation
- `batch_status` — check progress of a batch
- `batch_cancel` — cancel all pending runs in a batch

## Optional parameters

Only offer these when relevant — don't ask about all of them every time:

- **`browser_profile`**: `"lite"` (default, fast) or `"stealth"` (anti-bot evasion, slower). Use stealth for sites known to block automation: LinkedIn, major e-commerce, airline booking sites.
- **`proxy_config`**: `{ "country": "<code>" }` where code is one of: `US`, `GB`, `CA`, `DE`, `FR`, `JP`, `AU`. Only needed for geo-restricted content.
- **`use_vault`**: `true` if the user has connected a password manager (1Password or Bitwarden) for authenticated workflows.
- **`credential_item_ids`**: specific vault item IDs to scope which credentials the agent can access.

## Writing effective goals

Always specify the exact JSON structure you want returned. Good goals are specific and action-oriented:

- "Extract all products as JSON array: `[{\"name\": str, \"price\": str, \"url\": str}]`"
- "Extract the product name, price, availability, and all customer ratings. Return as JSON: `{\"name\": str, \"price\": str, \"in_stock\": bool, \"ratings\": [int]}`"
- "Fill out the contact form with: Name: John Smith, Email: john@example.com, Message: 'Requesting a demo'. Submit the form."
- "Log in, navigate to the billing page, and extract the current plan name and next billing date."

Avoid vague goals like "look at this page" or "check this site." Being explicit about the output format produces much more consistent results.

## Parallel extraction

When extracting from multiple independent sites, run separate parallel calls — don't combine them into one goal:

**Good** — parallel calls for each source:
- Call `run_web_automation_async` for site A → get `run_id_a`
- Call `run_web_automation_async` for site B → get `run_id_b`
- Call `run_web_automation_async` for site C → get `run_id_c`
- Then collect results with `get_run` for each

**Bad** — single combined call:
- "Go to site A, then site B, then site C and extract data from all of them"

Each independent extraction should be its own API call. This is faster (parallel execution) and more reliable.

For 5+ URLs with the same goal, use `batch_create` instead of individual async calls.

## Important constraints

- Each run has a **10-minute timeout**. For very complex workflows, break them into sequential runs.
- Every run provides a **`streaming_url`** — share this with the user so they can watch the automation live.
- The agent operates a real browser. It handles JavaScript rendering, dynamic content, and infinite scroll automatically.

## Handling results

- **Success**: present the extracted data clearly, formatted for the content type (tables for tabular data, JSON for structured data, prose for summaries).
- **Failure**: check the error message. Common fixes: switch to `stealth` profile, make the goal more specific, add a proxy for geo-restricted sites, break a complex goal into steps.
- **Partial results**: some runs return useful data even if they didn't fully complete. Check the output before declaring failure.

$ARGUMENTS
