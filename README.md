# Reaction Test for BUSY Bar

<img src="src/appmeta/icon_front_8x8.png" width="64" height="64" alt="Reaction Test icon">

Wait for the cue, then press OK to measure your reaction.

Category: **Games**.

## Screenshots

Native display captures and their firmware, settings and capture details are
recorded in [docs/SCREENSHOTS.md](docs/SCREENSHOTS.md).

## Controls

OK begins an attempt. Wait for GO, then press OK. Back resets the series; Back again exits.

## Settings

Open **Apps → Reaction Test → Setup**. Saved settings are read when the app starts.

| Setting | Type | Default |
| --- | --- | --- |
| Attempts | integer | 5 |
| Sound | boolean | False |

The score includes button debounce and display update latency.

## Install and build

Use the Node.js version in [.nvmrc](.nvmrc) and the pnpm version in [package.json](package.json).

    corepack pnpm install --frozen-lockfile
    corepack pnpm check
    corepack pnpm app:install
    corepack pnpm app:run

Pass --addr <host> to an app command to select a device. See [INSTALL.md](INSTALL.md).
The minimum firmware HTTP API is specified in [src/appmeta/manifest.json](src/appmeta/manifest.json).

## Development

Each project contains its own runtime, state model, assets, tests and build scripts.
Run pnpm check for metadata validation, type checking, unit tests, packaging and bundle smoke checks.
Run pnpm release to prepare a versioned archive and SHA256SUMS locally.
Generated files under dist/ are excluded from Git.

See [CONTRIBUTING.md](CONTRIBUTING.md) and [docs/RELEASING.md](docs/RELEASING.md).

## License

Code, pixel icons, geometric artwork and synthesized sound assets: [MIT](LICENSE).
Assets can be recreated with python art/generate_assets.py. Rendering uses fonts supplied by the BUSY Bar firmware.

## AI assistance

See [AI_ASSISTANCE.md](docs/AI_ASSISTANCE.md) for the role of AI in this project.
