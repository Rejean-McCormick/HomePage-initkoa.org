# Provider Adapter Grok

> Canonical HTML: [https://initkoa.org](https://initkoa.org)/technology/swarmcraft/runtime/provider-adapter-grok
> Markdown mirror: [https://initkoa.org](https://initkoa.org)/technology/swarmcraft/runtime/provider-adapter-grok/index.html.md
> Route: /technology/swarmcraft/runtime/provider-adapter-grok
> Source: app\technology\swarmcraft\runtime\provider-adapter-grok\page.mdx
> Generated: 2026-06-13T00:42:18.184Z

[Open the HTML page]([https://initkoa.org](https://initkoa.org)/technology/swarmcraft/runtime/provider-adapter-grok)

# Provider Adapter Grok

> **Architectural Lineage (Credits):**
> SwarmCraft is an **architectural fork and deep rewrite** of the multi-agent swarm engine created by **Mojomast (https://github.com/mojomast)** in **mojomast/swarmussy (https://github.com/mojomast/swarmussy)**.
> SwarmCraft’s deterministic “Architect-style” layering is also **derived from the meta-structure of Abstract Wiki Architect (AWA)**.
> Full details: **Credits & Lineage (/technology/swarmcraft/meta/credits-and-lineage)**

## **POWERED BY GROK**

SwarmCraft is powered by **Grok** through a dedicated **provider adapter** layer.

- keep the engine **provider-agnostic**
- centralize API config, retries, and error handling
- normalize responses into a stable internal interface for personas and tools

This page documents the expected behavior of the Grok adapter, without tying the rest of the codebase to Grok-specific response shapes.

## 1) Responsibilities of the Provider Adapter

The Grok adapter MUST:
1. Build requests from SwarmCraft’s internal prompt format.
2. Send requests to Grok with correct auth + model settings.
3. Normalize responses into:
- optional structured tool calls
- token usage and latency metrics (if provided)
4. Apply robust retry/backoff rules.
5. Emit consistent errors for the orchestrator to handle deterministically.

The adapter SHOULD:
- support multiple Grok models/profiles
- support streaming responses (optional)
- redact secrets in logs

## 2) Internal Provider Interface (Recommended)

SwarmCraft should call providers through a stable interface like:

Where `ProviderResult` is normalized:

This allows the orchestrator to remain unchanged if you later add other providers.

## 3) Configuration (Recommended)

### 3.1 Environment variables

Recommended keys (names may vary by implementation):

### 3.2 Project-level overrides

Optional per-project settings file, e.g.:

* `projects/<project_id>/data/settings.json`

Recommended fields:

## 4) Tool Calling and Safety

SwarmCraft personas must not write files directly. They request tool calls.

The Grok adapter MUST support:

* receiving tool calls (structured)
* returning them to the tool executor layer

Tool execution remains in SwarmCraft (not in Grok):

* the engine validates and runs tools
* tool results can be appended to the conversation as tool messages (implementation detail)

This preserves deterministic safety rules:

* path sandboxing
* atomic writes
* audit logs

## 5) Retries and Error Handling (Recommended)

### 5.1 Retry classes

Adapter SHOULD retry on:

* transient network failures
* 5xx server errors
* timeouts

Adapter SHOULD NOT retry blindly on:

* invalid request payload (4xx)
* tool schema mismatch errors (fix required)

### 5.2 Backoff

Use exponential backoff with jitter.

### 5.3 Deterministic surfacing

Adapter errors MUST be normalized into stable error codes so the orchestrator can:

* mark task as failed
* re-plan
* pause if needed

Example normalized error:

## 6) Token and Cost Tracking (Optional)

If Grok provides usage metadata, the adapter SHOULD emit it in `ProviderResult.usage`.

If usage is not provided, SwarmCraft MAY estimate tokens separately, but should mark them as estimates.

Token tracking integrates with dashboard/cost panels:

* **Dashboard TUI Reference (/technology/swarmcraft/runtime/dashboard-tui-reference)**

## 7) How Grok Fits the Deterministic Pipeline

The provider is invoked only during **EXECUTE** (and optional planning calls if you LLM-assist planning).

The pipeline remains:

* SCAN: no provider calls required
* PLAN: deterministic selection (optionally assisted)
* EXECUTE: provider call(s) for one Part, one action

Pipeline: **Deterministic Pipeline (/technology/swarmcraft/core/deterministic-pipeline-scan-plan-execute)**

## 8) Related Pages

* **Architecture Overview (/technology/swarmcraft/core/architecture-overview)**
* **Deterministic Pipeline (/technology/swarmcraft/core/deterministic-pipeline-scan-plan-execute)**
* **Orchestration Slice-by-Slice Prompt Hydration (/technology/swarmcraft/runtime/orchestration-slice-by-slice-prompt-hydration)**
* **Dashboard TUI Reference (/technology/swarmcraft/runtime/dashboard-tui-reference)**
