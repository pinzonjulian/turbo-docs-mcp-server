import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fetchMainBranchInformation, fetchFromGitHub, MainBranchInfo } from "./utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsFolder = path.resolve(__dirname, "../src/docs");
const cacheFolder = path.resolve(__dirname, "../cache");

let mainBranchInfo: MainBranchInfo | null = null;

export async function readMarkdownFile(filename: string): Promise<string> {
  const filePath = path.join(docsFolder, filename);
  if (!filePath.startsWith(docsFolder)) {
    throw new Error("Invalid file path");
  }
  
  // Get current commit info if we don't have it yet
  if (!mainBranchInfo) {
    try {
      const commitInfo = await fetchMainBranchInformation();
      const cacheKey = `${commitInfo.sha.substring(0, 7)}-${commitInfo.timestamp}`;
      mainBranchInfo = {
        ...commitInfo,
        cacheKey
      };
    } catch (shaError) {
      console.error('Failed to get GitHub commit info, falling back to direct fetch');
    }
  }
  
  // Try to read from cache first if we have commit info
  if (mainBranchInfo) {
    const cachedFilePath = path.join(cacheFolder, mainBranchInfo.cacheKey, filename);
    try {
      const content = await fs.promises.readFile(cachedFilePath, "utf-8");
      console.error(`Using cached content for ${mainBranchInfo.cacheKey}: ${filename}`);
      return content;
    } catch (cacheError) {
      // Cache miss, continue to fetch from GitHub
    }
  }
  
  // Fetch from GitHub
  try {
    return await fetchFromGitHub(filename, mainBranchInfo?.cacheKey);
  } catch (githubError) {
    console.error(`GitHub fetch failed: ${githubError}, attempting to read from local files...`);
    
    // Fallback: read from local files
    try {
      return await fs.promises.readFile(filePath, "utf-8");
    } catch (localError) {
      const githubErrorMessage = githubError instanceof Error ? githubError.message : String(githubError);
      const localErrorMessage = localError instanceof Error ? localError.message : String(localError);
      throw new Error(`Failed to read file from GitHub (${githubErrorMessage}) and locally (${localErrorMessage})`);
    }
  }
}
