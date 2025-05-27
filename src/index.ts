import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import path from "path";
import { docFiles } from "./config.js";
import { readMarkdownFile } from "./documentReader.js";

const server = new McpServer({
  name: "turbo-docs",
  version: "0.0.2",
  capabilities: {
    resources: {},
    tools: {}
  }
})

// Register a tool for each documentation file
docFiles.forEach(({ folder, file, name, description }) => {
  server.tool(
    name,
    description,
    async () => {
      try {
        const content = await readMarkdownFile(path.join(folder, file));
        return {
          content: [
            {
              type: "text",
              text: content
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: "text",
              text: `Error reading ${file}: ${errorMessage}`
            }
          ]
        };
      }
    }
  );
});

async function main(){
  const transport = new StdioServerTransport();
  await server.connect(transport)
  console.error("Turbo Docs MCP Server running on stdio")
}

main().catch((error) => {
  console.error("Fatal error in main():", error)
  process.exit(1)
})
