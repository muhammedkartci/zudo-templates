"use client";

import * as React from "react";
import type { ComponentConfig } from "@measured/puck";

type DealElement =
  | { kind: "subtitle"; text: string; boldFirstWord?: boolean }
  | { kind: "title"; text: string; allowLineBreaks?: boolean }
  | { kind: "timer"; enabled: boolean }
  | { kind: "button"; text: string; href: string };

export type DealBlockFields = {
  imageUrl: string;
  imageAlt?: string;
  elements: DealElement[];
};

const defaultElements: DealElement[] = [
  { kind: "subtitle", text: "deal of the week", boldFirstWord: true },
  { kind: "title", text: "Stay warm \nand trendy", allowLineBreaks: true },
  { kind: "timer", enabled: true },
  { kind: "button", text: "Shop now", href: "shop.html" },
];

export const DealBlock: ComponentConfig<DealBlockFields> = {
  label: "Deal of the Week",
  fields: {
    imageUrl: {
      type: "text",
      label: "Background Image",
      defaultValue: "https://placehold.co/600x400",
    },
    imageAlt: { type: "text", label: "Alt Text", defaultValue: "Deal image" },
    elements: {
      type: "array",
      label: "Elements (drag to reorder)",
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
              { label: "Timer", value: "timer" },
              { label: "Button", value: "button" },
            ],
            defaultValue: "title",
          },
          text: { type: "text", label: "Text", defaultValue: "" },
          boldFirstWord: {
            type: "checkbox",
            label: "Bold first word (Subtitle)",
            defaultValue: true,
          },
          allowLineBreaks: {
            type: "checkbox",
            label: "Allow \\n line breaks (Title)",
            defaultValue: true,
          },
          href: { type: "text", label: "Button Link", defaultValue: "shop.html" },
          enabled: { type: "checkbox", label: "Timer enabled", defaultValue: true },
        },
      },
      defaultValue: defaultElements,
    },
  },

  render: ({ fields }) => {
    return (
      <section className="deal-block">
        <div className="deal-block__cols">
          <div className="deal-block__col">
            <div
              className="deal-block__image"
              style={{ backgroundImage: `url(${fields.imageUrl})` }}
              aria-label={fields.imageAlt}
            />
            <div className="deal-block__content">
              <div className="deal-block__row">
                <div className="deal-block__cell">
                  {fields.elements.map((el, i) => {
                    if (el.kind === "subtitle") {
                      const [first, ...rest] = el.text.split(" ");
                      return (
                        <span key={i} className="deal-block__subtitle category-subtitle">
                          {el.boldFirstWord ? <b>{first}</b> : first}{" "}
                          {rest.join(" ")}
                        </span>
                      );
                    }
                    if (el.kind === "title") {
                      const parts = el.allowLineBreaks
                        ? el.text.split("\n")
                        : [el.text];
                      return (
                        <h3 key={i} className="deal-block__title">
                          {parts.map((p, idx) => (
                            <React.Fragment key={idx}>
                              {p}
                              {idx < parts.length - 1 && <br />}
                            </React.Fragment>
                          ))}
                        </h3>
                      );
                    }
                    if (el.kind === "timer" && el.enabled) {
                      return <div key={i} className="timer js-timer"></div>;
                    }
                    if (el.kind === "button") {
                      return (
                        <a
                          key={i}
                          className="deal-block__button button"
                          href={el.href}
                        >
                          <span className="button__text">{el.text}</span>
                        </a>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>

            <img
              className="deal-block__bg"
              src="assets/img/svg/vector-deal.svg"
              alt=""
            />
          </div>
        </div>
      </section>
    );
  },
};
