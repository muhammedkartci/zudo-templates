"use client";

import * as React from "react";
import type { ComponentConfig } from "@measured/puck";

type AdvantageElement =
  | { kind: "icon"; src: string; alt?: string }
  | { kind: "title"; text: string }
  | { kind: "line"; enabled: boolean }
  | { kind: "paragraph"; text: string };

type AdvantageCard = {
  elements: AdvantageElement[];     // <-- sürükle-bırak ile sıralama
  bgSvg?: string;                   // kart arka plan svg (img src)
};

export type AdvantagesFields = {
  cards: AdvantageCard[];
};

const defaultCard = (overrides?: Partial<AdvantageCard>): AdvantageCard => ({
  elements: [
    { kind: "icon", src: "https://placehold.co/600x400", alt: "" },
    { kind: "title", text: "Free Shipping" },
    { kind: "line", enabled: true },
    {
      kind: "paragraph",
      text: "Non aliqua reprehenderit reprehenderit culpa laboris nulla minim anim velit",
    },
  ],
  bgSvg: "assets/img/svg/vector-advantages.svg",
  ...overrides,
});

export const Advantages: ComponentConfig<AdvantagesFields> = {
  label: "Advantages",
  fields: {
    cards: {
      type: "array",
      label: "Cards (drag to reorder)",
      item: {
        type: "object",
        label: "Card",
        fields: {
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
                    { label: "Icon", value: "icon" },
                    { label: "Title", value: "title" },
                    { label: "Line", value: "line" },
                    { label: "Paragraph", value: "paragraph" },
                  ],
                  defaultValue: "title",
                },
                // shared / conditional fields
                src: { type: "text", label: "Icon src", defaultValue: "https://placehold.co/600x400" },
                alt: { type: "text", label: "Icon alt", defaultValue: "" },
                text: { type: "text", label: "Text", defaultValue: "" },
                enabled: { type: "checkbox", label: "Show (Line)", defaultValue: true },
              },
            },
            defaultValue: defaultCard().elements,
          },
          bgSvg: {
            type: "text",
            label: "Card background SVG src",
            defaultValue: "assets/img/svg/vector-advantages.svg",
          },
        },
      },
      defaultValue: [
        defaultCard({
          elements: [
            { kind: "icon", src: "https://placehold.co/600x400", alt: "" },
            { kind: "title", text: "Free Shipping" },
            { kind: "line", enabled: true },
            { kind: "paragraph", text: "Non aliqua reprehenderit reprehenderit culpa laboris nulla minim anim velit" },
          ],
        }),
        defaultCard({
          elements: [
            { kind: "icon", src: "https://placehold.co/600x400", alt: "" },
            { kind: "title", text: "24/7 Customer Service" },
            { kind: "line", enabled: true },
            { kind: "paragraph", text: "Non aliqua reprehenderit reprehenderit culpa laboris nulla minim anim velit " },
          ],
        }),
        defaultCard({
          elements: [
            { kind: "icon", src: "https://placehold.co/600x400", alt: "" },
            { kind: "title", text: "Money Back Guarantee" },
            { kind: "line", enabled: true },
            { kind: "paragraph", text: "Non aliqua reprehenderit reprehenderit culpa laboris nulla minim anim velit " },
          ],
        }),
      ],
    },
  },

  render: ({ fields }) => {
    return (
      <div className="advantages wrapper">
        <div className="advantages__list">
          {(fields.cards || []).map((card, idx) => (
            <article key={idx} className="advantage">
              <div className="advantage__content">
                {card.elements.map((el, i) => {
                  if (el.kind === "icon") {
                    return (
                      <div key={i} className="advantage__icon-wrap">
                        <img className="advantage__icon" src={el.src} alt={el.alt || ""} />
                      </div>
                    );
                  }
                  if (el.kind === "title") {
                    return <h4 key={i} className="advantage__title">{el.text}</h4>;
                  }
                  if (el.kind === "line" && el.enabled) {
                    return <div key={i} className="advantage__line"></div>;
                  }
                  if (el.kind === "paragraph") {
                    return <p key={i} className="advantage__text">{el.text}</p>;
                  }
                  return null;
                })}
              </div>

              {/* bg svg */}
              {card.bgSvg ? (
                <img
                  className="advantage__bg"
                  src={card.bgSvg}
                  alt=""
                />
              ) : null}
            </article>
          ))}
        </div>
      </div>
    );
  },
};
