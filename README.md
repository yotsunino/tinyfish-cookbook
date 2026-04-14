# Tinyfish Cookbook

A collection of practical recipes, examples, and guides for working with [Tinyfish](https://tinyfish.io) — the AI-powered code review and security analysis platform.

## Overview

This cookbook provides:

- **Recipes**: Step-by-step guides for common workflows
- **Integrations**: Examples for connecting Tinyfish with CI/CD pipelines
- **Best Practices**: Recommended configurations and patterns
- **Security Patterns**: Common vulnerability patterns and how Tinyfish detects them

## Getting Started

### Prerequisites

- A Tinyfish account ([sign up here](https://tinyfish.io))
- Git 2.x or higher
- Node.js 18+ (for JavaScript/TypeScript recipes)

### Quick Start

1. Clone this repository:
   ```bash
   git clone https://github.com/tinyfish-io/tinyfish-cookbook.git
   cd tinyfish-cookbook
   ```

2. Browse the recipes in the relevant directory for your use case.

3. Follow the setup instructions within each recipe.

## Repository Structure

```
tinyfish-cookbook/
├── .github/               # GitHub Actions workflows and configuration
│   ├── workflows/         # CI/CD pipeline definitions
│   └── config/            # Shared configuration templates
├── recipes/               # Individual cookbook recipes (coming soon)
├── integrations/          # Third-party integration examples (coming soon)
├── CONTRIBUTING.md        # Contribution guidelines
└── README.md              # This file
```

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) before submitting a pull request.

### Reporting Issues

If you find a bug or have a feature request, please [open an issue](https://github.com/tinyfish-io/tinyfish-cookbook/issues).

## Security

This repository uses automated security scanning:

- **Secrets Scanner**: Detects accidentally committed secrets and credentials
- **Vulnerability Scanner**: Identifies known vulnerabilities in dependencies
- **Semgrep**: Static analysis for security anti-patterns

If you discover a security issue, please follow responsible disclosure and contact security@tinyfish.io.

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Links

- [Tinyfish Documentation](https://docs.tinyfish.io)
- [Tinyfish Dashboard](https://app.tinyfish.io)
- [Community Forum](https://community.tinyfish.io)

---

> **Personal fork note**: I'm using this repo to learn Tinyfish's CI integration patterns. Primarily interested in the GitHub Actions workflows and Semgrep configuration examples.
