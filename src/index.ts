import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; // Import utilities for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = new McpServer({
  name: "turbo-docs",
  version: "0.0.1",
  capabilities: {
    resources: {},
    tools: {}
  }
})

// Define individual tools for each documentation file
const docFiles = [
  // Handbook files
  { folder: 'handbook', file: '01_introduction.md', name: 'handbook-introduction', description: 'Get the Turbo introduction documentation' },
  { folder: 'handbook', file: '02_drive.md', name: 'handbook-drive', description: 'Get the Turbo Drive documentation' },
  { folder: 'handbook', file: '03_page_refreshes.md', name: 'handbook-page-refreshes', description: 'Get the Turbo page refreshes documentation' },
  { folder: 'handbook', file: '04_frames.md', name: 'handbook-frames', description: 'Get the Turbo Frames documentation' },
  { folder: 'handbook', file: '05_streams.md', name: 'handbook-streams', description: 'Get the Turbo Streams documentation' },
  { folder: 'handbook', file: '06_native.md', name: 'handbook-native', description: 'Get the Turbo Native documentation' },
  { folder: 'handbook', file: '07_building.md', name: 'handbook-building', description: 'Get the Building with Turbo documentation' },
  { folder: 'handbook', file: '08_installing.md', name: 'handbook-installing', description: 'Get the Installing Turbo documentation' },
  
  // Reference files
  { folder: 'reference', file: 'attributes.md', name: 'reference-attributes', description: 'Get the Turbo attributes reference documentation' },
  { folder: 'reference', file: 'drive.md', name: 'reference-drive', description: 'Get the Turbo Drive reference documentation' },
  { folder: 'reference', file: 'events.md', name: 'reference-events', description: 'Get the Turbo events reference documentation' },
  { folder: 'reference', file: 'frames.md', name: 'reference-frames', description: 'Get the Turbo Frames reference documentation' },
  { folder: 'reference', file: 'streams.md', name: 'reference-streams', description: 'Get the Turbo Streams reference documentation' }
];

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

const docsFolder = path.resolve(__dirname, "../src/docs");

async function readMarkdownFile(filename: string): Promise<string> {
  const filePath = path.join(docsFolder, filename);
  if (!filePath.startsWith(docsFolder)) {
    throw new Error("Invalid file path");
  }
  try {
    return await fs.promises.readFile(filePath, "utf-8");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to read file: ${errorMessage}`);
  }
}

async function main(){
  const transport = new StdioServerTransport();
  await server.connect(transport)
  console.error("Turbo Docs MCP Server running on stdio")
}

main().catch((error) => {
  console.error("Fatal error in main():", error)
  process.exit(1)
})
