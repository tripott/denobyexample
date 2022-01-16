/** @jsx h */

import { h, tw } from "../deps.ts";
import { HyperLogo } from "./Logo.tsx";

export function Header(props: { noSubtitle?: boolean }) {
  return (
    <header
      class={tw
        `px(3 lg:14) h(12 lg:20) text-gray-500 flex justify-between items-center`}
    >
      <a
        class={tw`flex items-center flex-shrink-0`}
        href="/"
      >
        <HyperLogo />
        <span
          class={tw
            `ml-4 flex items-baseline gap-x-1 flex-col sm:flex-row tracking-tighter`}
        >
          <span class={tw`text(2xl gray-900) font-bold leading-none`}>
            Hyper
          </span>
          {!props.noSubtitle &&
            (
              <span
                class={tw
                  `font-medium italic text(sm sm:base gray-600) leading-none`}
              >
                by example
              </span>
            )}
        </span>
      </a>
      <div class={tw`flex items-center gap-6`}>
        <a
          href="https://docs.hyper.io/cloud"
          class={tw`hover:underline focus:underline`}
        >
          Documentation
        </a>
        <a
          href="https://dashboard.hyper.io"
          class={tw`hover:underline focus:underline`}
        >
          Dashboard
        </a>
      </div>
    </header>
  );
}
