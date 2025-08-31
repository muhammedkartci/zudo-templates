"use client";

import * as React from "react";
import type { ComponentConfig } from "@measured/puck";

/** ───────── Types ───────── */
type TopElement =
  | { kind: "subtitle"; text: string; boldSecondWord?: boolean } // "our <b>blog</b>"
  | { kind: "title"; text: string }
  | { kind: "paragraph"; text: string };

type PostElement =
  | { kind: "image"; url: string; href: string; alt?: string }
  | { kind: "titleLink"; text: string; href: string }
  | { kind: "date"; text: string }
  | { kind: "readMore"; text: string; href: string };

export type BlogBlockFields = {
  topElements: TopElement[];
  posts: { elements: PostElement[] }[];
  cta?: { text: string; href: string };
};

/** ───────── Defaults ───────── */
const defaultTop: TopElement[] = [
  { kind: "subtitle", text: "our blog", boldSecondWord: true },
  { kind: "title", text: "the last in Mollee" },
  {
    kind: "paragraph",
    text:
      "Cillum eu id enim aliquip aute ullamco anim. Culpa deserunt nostrud excepteur voluptate velit ipsum esse enim.",
  },
];

const makePost = (elements: PostElement[]) => ({ elements });

const defaults: BlogBlockFields = {
  topElements: defaultTop,
  posts: [
    makePost([
      { kind: "image", url: "https://placehold.co/600x400", href: "post.html", alt: "" },
      {
        kind: "titleLink",
        text: "Fashion trends in 2020: style, colors, accessories",
        href: "post.html",
      },
      { kind: "date", text: "Aug 02, 2020" },
      { kind: "readMore", text: "read more", href: "post.html" },
    ]),
    makePost([
      { kind: "image", url: "https://placehold.co/600x400", href: "post.html", alt: "" },
      {
        kind: "titleLink",
        text: "The most popular brand that people use in USA",
        href: "post.html",
      },
      { kind: "date", text: "Aug 02, 2020" },
      { kind: "readMore", text: "read more", href: "post.html" },
    ]),
  ],
  cta: { text: "Read blog", href: "blog.html" },
};

/** ───────── ComponentConfig ───────── */
export const BlogBlock: ComponentConfig<BlogBlockFields> = {
  label: "Blog (Posts Grid)",
  fields: {
    topElements: {
      type: "array",
      label: "Top Elements (drag to reorder)",
      item: {
        type: "object",
        label: "Element",
        fields: {
          kind: {
            type: "select",
            label: "Type",
            options: [
              { label: "Subtitle", value: "subtitle" },
              { label: "Title", value: "title" },
              { label: "Paragraph", value: "paragraph" },
            ],
            defaultValue: "title",
          },
          text: { type: "text", label: "Text", defaultValue: "" },
          boldSecondWord: {
            type: "checkbox",
            label: "Bold second word (Subtitle)",
            defaultValue: true,
          },
        },
      },
      defaultValue: defaults.topElements,
    },

    posts: {
      type: "array",
      label: "Posts (drag to reorder)",
      item: {
        type: "object",
        label: "Post",
        fields: {
          elements: {
            type: "array",
            label: "Post Elements (drag to reorder)",
            item: {
              type: "object",
              label: "Element",
              fields: {
                kind: {
                  type: "select",
                  label: "Type",
                  options: [
                    { label: "Image", value: "image" },
                    { label: "Title Link", value: "titleLink" },
                    { label: "Date", value: "date" },
                    { label: "Read More", value: "readMore" },
                  ],
                  defaultValue: "image",
                },
                // shared / conditional
                url: {
                  type: "text",
                  label: "Image URL",
                  defaultValue: "https://placehold.co/600x400",
                },
                href: { type: "text", label: "Link href", defaultValue: "post.html" },
                alt: { type: "text", label: "Image alt", defaultValue: "" },
                text: { type: "text", label: "Text", defaultValue: "" },
              },
            },
            defaultValue: defaults.posts[0].elements,
          },
        },
      },
      defaultValue: defaults.posts,
    },

    cta: {
      type: "object",
      label: "Bottom CTA",
      fields: {
        text: { type: "text", label: "CTA Text", defaultValue: "Read blog" },
        href: { type: "text", label: "CTA Link", defaultValue: "blog.html" },
      },
      defaultValue: defaults.cta,
    },
  },

  render: ({ fields }) => {
    const renderTop = (els: TopElement[]) =>
      (els || []).map((el, i) => {
        if (el.kind === "subtitle") {
          const parts = el.text.split(" ");
          const first = parts[0] ?? "";
          const second = parts[1] ?? "";
          const rest = parts.slice(2).join(" ");
          return (
            <span key={i} className="main-block__subtitle category-subtitle">
              {first} {el.boldSecondWord ? <b>{second}</b> : second} {rest}
            </span>
          );
        }
        if (el.kind === "title") return <h3 key={i} className="main-block__title">{el.text}</h3>;
        if (el.kind === "paragraph") return <p key={i} className="main-block__text">{el.text}</p>;
        return null;
      });

    const renderPost = (post: { elements: PostElement[] }, idx: number) => {
      // element sırası → yerleşimi belirler
      let imageNode: React.ReactNode | null = null;
      const contentNodes: React.ReactNode[] = [];

      post.elements.forEach((el, i) => {
        if (el.kind === "image") {
          imageNode = (
            <a key={`img-${i}`} className="short-post__image-link" href={el.href || "#"}>
              <div
                className="short-post__image"
                style={{ backgroundImage: `url(${el.url})` }}
                aria-label={el.alt || ""}
              />
            </a>
          );
          return;
        }
        if (el.kind === "titleLink") {
          contentNodes.push(
            <div key={`ttl-wrap-${i}`} className="short-post__title-wrap">
              <h4 className="short-post__title">
                <a className="short-post__link" href={el.href || "#"}>
                  {el.text}
                </a>
              </h4>
            </div>
          );
          return;
        }
        if (el.kind === "date") {
          contentNodes.push(<span key={`date-${i}`} className="short-post__date">{el.text}</span>);
          return;
        }
        if (el.kind === "readMore") {
          contentNodes.push(
            <a key={`more-${i}`} className="short-post__more read-more" href={el.href || "#"}>
              {el.text || "read more"}
            </a>
          );
          return;
        }
      });

      return (
        <article key={idx} className="short-post">
          <div className="short-post__all">
            {imageNode}
            <div className="short-post__row">
              <div className="short-post__cell">
                <div className="short-post__bg">
                  <div className="short-post__content">{contentNodes}</div>
                </div>
              </div>
            </div>
          </div>
        </article>
      );
    };

    return (
      <section className="main-block wrapper">
        <div className="main-block__top">{renderTop(fields.topElements || [])}</div>

        <div className="blog">
          {(fields.posts || []).map((p, i) => renderPost(p, i))}
        </div>

        <div className="load-more">
          <a className="button" href={fields.cta?.href || "#"}>
            <span className="button__text">{fields.cta?.text || "Read blog"}</span>
          </a>
        </div>
      </section>
    );
  },
};
