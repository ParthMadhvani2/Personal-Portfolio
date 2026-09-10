"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { CommandMenu, type CommandItem } from "../craft/command-menu";
import { products } from "../../data/products";
import { crafts } from "../../data/crafts";
import { site } from "../../data/site";

/** Every route, product and component reachable from one keystroke. */
export default function SiteCommand() {
  const router = useRouter();

  const items = useMemo<CommandItem[]>(() => {
    const go = (href: string) => () => router.push(href);
    const open = (href: string) => () =>
      window.open(href, "_blank", "noopener");

    return [
      { id: "home", group: "Pages", label: "Home", onSelect: go("/") },
      {
        id: "work",
        group: "Pages",
        label: "Work",
        keywords: "products projects",
        onSelect: go("/work"),
      },
      {
        id: "crafts",
        group: "Pages",
        label: "Crafts",
        keywords: "components ui library",
        onSelect: go("/crafts"),
      },
      {
        id: "stack",
        group: "Pages",
        label: "Stack",
        keywords: "tech skills tools",
        onSelect: go("/tech-i-know"),
      },
      {
        id: "colophon",
        group: "Pages",
        label: "Colophon",
        keywords: "how this site is built typography tokens",
        onSelect: go("/colophon"),
      },
      {
        id: "resume",
        group: "Pages",
        label: "Résumé",
        keywords: "cv",
        onSelect: go("/resume"),
      },

      ...products.map((p) => ({
        id: `p-${p.slug}`,
        group: "Products",
        label: p.name,
        keywords: `${p.kind} ${p.summary}`,
        hint: p.status,
        onSelect: go(`/work/${p.slug}`),
      })),

      ...crafts.map((c) => ({
        id: `c-${c.id}`,
        group: "Components",
        label: c.name,
        keywords: c.file,
        hint: "crafts",
        onSelect: go(`/crafts#${c.id}`),
      })),

      {
        id: "mail",
        group: "Contact",
        label: "Email Parth",
        keywords: site.email,
        onSelect: open(`mailto:${site.email}`),
      },
      {
        id: "call",
        group: "Contact",
        label: "Book a 30-min call",
        keywords: "cal calendar meeting",
        onSelect: open(site.calendar),
      },
      {
        id: "gh",
        group: "Contact",
        label: "GitHub",
        onSelect: open(site.social.github),
      },
      {
        id: "x",
        group: "Contact",
        label: "X",
        keywords: "twitter",
        onSelect: open(site.social.x),
      },
      {
        id: "li",
        group: "Contact",
        label: "LinkedIn",
        onSelect: open(site.social.linkedin),
      },
      {
        id: "ph",
        group: "Contact",
        label: "Product Hunt",
        keywords: "launches",
        onSelect: open(site.social.productHunt),
      },
    ];
  }, [router]);

  return (
    <CommandMenu items={items} placeholder="Pages, products, components…" />
  );
}
