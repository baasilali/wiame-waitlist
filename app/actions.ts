"use server"

import fs from "fs/promises"
import path from "path"

export async function subscribeToWaitlist(email: string) {
  // Validate email
  if (!email || !email.includes("@")) {
    throw new Error("Invalid email address")
  }

  try {
    // In a real application, you would store this in a database
    // For this example, we'll store it in a JSON file
    const dataDir = path.join(process.cwd(), "data")
    const filePath = path.join(dataDir, "waitlist.json")

    // Create directory if it doesn't exist
    try {
      await fs.mkdir(dataDir, { recursive: true })
    } catch (error) {
      // Directory already exists, continue
    }

    // Read existing data
    let waitlist: string[] = []
    try {
      const data = await fs.readFile(filePath, "utf8")
      waitlist = JSON.parse(data)
    } catch (error) {
      // File doesn't exist yet, start with empty array
    }

    // Add email if it doesn't already exist
    if (!waitlist.includes(email)) {
      waitlist.push(email)
      await fs.writeFile(filePath, JSON.stringify(waitlist, null, 2))
    }

    return { success: true }
  } catch (error) {
    console.error("Error saving to waitlist:", error)
    throw new Error("Failed to subscribe to waitlist")
  }
}
