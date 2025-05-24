# Turbo Docs MCP Server

An MCP server to access up to date documentation for [Turbo JS](http://turbo.hotwired.dev/).

⚠️ **This is Experimental Software**

This MCP is in early development. It may contain bugs, have limited functionality, or undergo breaking changes without notice. Use at your own risk and expect potential instability.

## Building the MCP Server

### Prerequisites

- **Node.js**: Minimum version 18.0.0 or higher
- **npm**: Comes bundled with Node.js

### Build Instructions

1. Clone this repository and navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project using the provided script:
   ```bash
   npm run build
   ```

This will compile the TypeScript source code and create the executable in the `build/` directory.

## Usage

### With Claude Desktop

1. First, build the MCP server following the instructions above
2. Follow the instructions at https://modelcontextprotocol.io/quickstart/user to add a new MCP server.
3. Add the following configuration:
```json
{
  "mcpServers": {
    "Turbo-docs": {
      "command": "node",
      "args": ["/path/to/your/Turbo-docs-mcp-server/build/index.js"],
      "env": {}
    }
  }
}
```

3. Replace `/path/to/your/Turbo-docs-mcp-server` with the actual path to this project
4. Restart Claude Desktop
5. The Turbo documentation tools should now be available in your Claude conversations

### With VS Code

1. Build the MCP server following the instructions above
2. Follow the instructions at https://code.visualstudio.com/docs/copilot/chat/mcp-servers
3. Using your preferred method based on the instructions above, configure the MCP server by pointing it to the built executable:
   ```json
   {
    "Turbo-docs": {
        "type": "stdio",
        "command": "node",
        "args": [
            "path/to/your/Turbo-docs-mcp-server"
          ]
    }
   }
   ```
4. Replace `path/to/your/Turbo-docs-mcp-server` with the path to the `index.js` file built in step 1.
5. The Turbo documentation will be accessible through the MCP client interface

### Troubleshooting

#### Claude
You may see the following errors when opening Claude after configuring the MCP:
```
MCP Turbo-docs: spawn node ENOENT (2)

Could not connect to MCP server Turbo-docs

MCP Turbo-docs: Server disconnected. For troubleshooting guidance [...]

```

This is because the path to the `node` executable can not be found. If that's the case, instead of `"command": "node"` use the complete path to the node. If you use `mise` it may be something like:

```
"command": "/Users/<YOUR USER NAME/.local/share/mise/installs/node/20.18.3/bin/node
```

## Documentation Source

The Turbo documentation files included are copied from the official [Turbo-site repository](https://github.com/hotwired/Turbo-site). 

The next phase of exploration for this MCP could be to fetch the docs from the web to keep them up to date and store them locally for a set period of time.

All credit for the documentation content goes to the Turbo team and contributors.

## Available Tools

This MCP server provides access to the complete Turbo documentation, organized into:

**Handbook:**
- Introduction
- Drive
- Page Refreshes
- Frames
- Streams
- Native
- Building with Turbo
- Installing Turbo

**Reference:**
- Attributes
- Drive
- Events
- Frames
- Streams

Each documentation section is available as a separate tool that can be called to retrieve the relevant content.
