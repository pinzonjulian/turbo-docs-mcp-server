import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URL constants
const GITHUB_API_BASE_URL = 'https://api.github.com/repos/hotwired/turbo-site';
const GITHUB_RAW_BASE_URL = 'https://raw.githubusercontent.com/hotwired/turbo-site/main/_source/';
const MAIN_BRANCH = 'main';

export interface MainBranchInfo {
  sha: string;
  timestamp: number;
  cacheKey: string;
}

/**
 * Fetches the current commit SHA and timestamp from the GitHub API for the stimulus-site repository
 * @returns Promise<{sha: string, timestamp: number}> The current commit SHA and timestamp
 */
export async function fetchMainBranchInformation(): Promise<{sha: string, timestamp: number}> {
  try {
    const response = await fetch(`${GITHUB_API_BASE_URL}/commits/${MAIN_BRANCH}`);
    if (!response.ok) {
      throw new Error(`GitHub API failed: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    
    // Get the commit timestamp (author date)
    const commitTimestamp = new Date(data.commit.author.date).getTime();
    
    return {
      sha: data.sha,
      timestamp: commitTimestamp
    };
  } catch (error) {
    console.error('Failed to get GitHub SHA:', error);
    throw error;
  }
}

/**
 * Fetches content from GitHub and optionally caches it
 * @param filename The filename to fetch from GitHub
 * @param cacheKey The cache key (sha-timestamp) for caching (optional)
 * @returns Promise<string> The file content
 */
export async function fetchFromGitHub(filename: string, cacheKey?: string): Promise<string> {
  const githubUrl = `${GITHUB_RAW_BASE_URL}/${filename}`;

  console.error(`Fetching ${filename} from GitHub: ${githubUrl}`);
  const response = await fetch(githubUrl);
  
  if (!response.ok) {
    throw new Error(`GitHub fetch failed: ${response.status} ${response.statusText}`);
  }
  
  const content = await response.text();
  
  // Cache the content with cache key if available
  if (cacheKey) {
    try {
      const cacheFolder = path.resolve(__dirname, "../cache");
      const cachedFilePath = path.join(cacheFolder, cacheKey, filename);
      await fs.promises.mkdir(path.dirname(cachedFilePath), { recursive: true });
      await fs.promises.writeFile(cachedFilePath, content, "utf-8");
      console.error(`Cached GitHub content for ${cacheKey}: ${filename}`);
    } catch (cacheError) {
      console.error(`Failed to cache content: ${cacheError}`);
    }
  }
  
  return content;
}
