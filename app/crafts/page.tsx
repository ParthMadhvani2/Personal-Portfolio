import { redirect } from "next/navigation";

// /crafts is reserved for a future UI components / experiments page.
// Until that's built, redirect to home so no empty stub ships.
export default function CraftsPage(): never {
  redirect("/");
}
