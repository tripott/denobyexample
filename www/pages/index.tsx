/** @jsx h */
/** @jsxFrag Fragment */
import { TOC } from "../../toc.js";
import { Page } from "../components/Page.tsx";
import { h, Head, PageProps, tw, useData } from "../deps.ts";
import { parseExample } from "../utils/example.ts";

export default function Example(props: PageProps) {
  const examples = useData("", fetcher);

  return (
    <Page title={`Hyper by Example`} noSubtitle>
      <Head>
        <meta
          name="description"
          content="Hyper by example is a collection of annotated examples for how to use Hyper, and the various features it provides."
        />
      </Head>
      <main class={tw`max-w-screen-sm mx-auto p-4`}>
        <h1>
          <span class={tw`text(5xl gray-900) tracking-tight font-bold`}>
            Hyper
          </span>
          <span
            class={tw
              `text(2xl gray-700) tracking-tight italic font-medium ml-2`}
          >
            by example
          </span>
        </h1>
        <p class={tw`mt-8 text-gray-900`}>
          Hyper is a service that provides core features that every application 
          needs in a general purpose interface that empowers developer teams to 
          separate the unique business logic from the general purpose features 
          for security, scalability, and reusability.
        </p>
        <p class={tw`mt-6 text-gray-900`}>
          <i class={tw`italic`}>Hyper by example</i>{" "}
          is a collection of annotated examples for how to use Hyper, and the
          various features it provides. It acts as a reference for how to do
          various things in Hyper, but can also be used as a guide to learn about
          many of the features Hyper provides.
        </p>
        <ul class={tw`mt-6 text-gray-900`}>
          {examples.map((example) => (
            <li>
              <a href={`/${example.id}`} class={tw`underline`}>
                {example.title}
              </a>
            </li>
          ))}
        </ul>
        <p class={tw`mt-12 text-gray-500`}>
          <a
            href="https://github.com/hyper63/hyperbyexample"
            class={tw`underline`}
          >
            Source
          </a>{" "}
          |{" "}
          <a
            href="https://github.com/hyper63/hyperbyexample/blob/main/LICENSE"
            class={tw`underline`}
          >
            License
          </a>{" "}
          | Forked from {" "}
          <a href="https://examples.deno.land/" class={tw`underline`}>
            Deno by Example
          </a>
        </p>
      </main>
    </Page>
  );
}

function fetcher() {
  return Promise.all(
    TOC.map((id) =>
      Deno.readTextFile(`./data/${id}.ts`)
        .then((text) => parseExample(id, text))
    ),
  );
}
