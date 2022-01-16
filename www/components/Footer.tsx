/** @jsx h */

import { h, tw } from "../deps.ts";
import { HyperLogo } from "./Logo.tsx";

const FOOTER_LINKS = [
  ["https://docs.hyper.io/cloud", "Documentation"],
  ["https://hyper.io", "Website"],
  ["https://dashboard.hyper.io", "Dashboard"],
  ["https://blog.hyper.io", "Blog"],
  ["https://hyper.io/company", "Company"],
];

export function Footer() {
  return (
    <footer class={tw`flex justify-between items-end p-8 pt-32`}>
      <div class={tw`flex align-center`}>
        <HyperLogo />
        <p class={tw`ml-4 font-bold text-xl`}>Hyper</p>
      </div>
      <div class={tw`flex flex-col lg:flex-row gap-x-8 gap-y-6 text-right`}>
        {FOOTER_LINKS.map(([href, text]) => (
          <a href={href} class={tw`text-gray-500 hover:underline`}>{text}</a>
        ))}
      </div>
    </footer>
  );
}
