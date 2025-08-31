"use client";

import * as React from "react";
import type { ComponentConfig } from "@measured/puck";

// ── Tipler
type Stat = {
  count: string;
  text: string;
  plus?: boolean;
};

type ElementItem =
  | { kind: "subtitle"; text: string; boldFirstWord?: boolean }
  | { kind: "title"; text: string; allowLineBreaks?: boolean }
  | { kind: "paragraph"; text: string }
  | { kind: "button"; text: string; href: string };

type BaseCard = {
  kind: "collection" | "season-sale";
  imageUrl: string;
  imageAlt?: string;
  link: string;
  // collection için mobil badge
  category?: string;
  // kart içi metin/gövde sırayla render edilir → drag-drop ile yer değiştir
  elements: ElementItem[];
  // orijinal HTML’de collection_1/2/3 gibi modifier vardı
  variantClass?: string; // ör: "collection_1" | "collection_2" | "collection_3"
};

export type CollectionBlockFields = {
  topStat: Stat;
  bottomStat: Stat;
  cards: BaseCard[];
  cta: { text: string; href: string };
};

// ── Varsayılan örnek veriler
const defaultCollection: BaseCard = {
  kind: "collection",
  imageUrl: "https://placehold.co/600x400",
  imageAlt: "Collection image",
  link: "shop.html",
  category: "accessories",
  variantClass: "collection_1",
  elements: [
    { kind: "subtitle", text: "new accessories", boldFirstWord: true },
    { kind: "title", text: "Fashion for \nthis summer", allowLineBreaks: true },
    { kind: "button", text: "Shop now", href: "shop.html" },
  ],
};

const defaultSeasonSale: BaseCard = {
  kind: "season-sale",
  imageUrl: "https://placehold.co/600x400",
  imageAlt: "Season sale image",
  link: "shop.html",
  elements: [
    { kind: "title", text: "season sale", allowLineBreaks: false },
    {
      kind: "paragraph",
      text: "Non aliqua reprehenderit reprehenderit culpa laboris nulla",
    },
    { kind: "button", text: "Shop now", href: "shop.html" },
  ],
};

export const CollectionBlock: ComponentConfig<CollectionBlockFields> = {
  label: "Collection Block",
  fields: {
    topStat: {
      type: "object",
      label: "Top Stat",
      fields: {
        count: { type: "text", label: "Count", defaultValue: "2587" },
        text: { type: "text", label: "Text", defaultValue: "Products for you" },
        plus: { type: "checkbox", label: "Show +", defaultValue: true },
      },
    },
    bottomStat: {
      type: "object",
      label: "Bottom Stat",
      fields: {
        count: { type: "text", label: "Count", defaultValue: "5649" },
        text: { type: "text", label: "Text", defaultValue: "Satisfied clients" },
        plus: { type: "checkbox", label: "Show +", defaultValue: true },
      },
    },
    cards: {
      type: "array",
      label: "Cards (drag to reorder)",
      item: {
        type: "object",
        label: "Card",
        fields: {
          kind: {
            type: "select",
            label: "Type",
            options: [
              { label: "Collection", value: "collection" },
              { label: "Season Sale", value: "season-sale" },
            ],
            defaultValue: "collection",
          },
          variantClass: {
            type: "text",
            label: "Collection Variant Class (e.g. collection_1)",
            defaultValue: "collection_1",
          },
          imageUrl: {
            type: "text",
            label: "Image URL",
            defaultValue: "https://placehold.co/600x400",
          },
          imageAlt: { type: "text", label: "Image Alt", defaultValue: "" },
          link: { type: "text", label: "Link Href", defaultValue: "shop.html" },
          category: { type: "text", label: "Category (badge for collection)", defaultValue: "accessories" },
          elements: {
            type: "array",
            label: "Elements (drag to reorder)",
            item: {
              type: "object",
              label: "Element",
              fields: {
                kind: {
                  type: "select",
                  label: "Element Type",
                  options: [
                    { label: "Subtitle", value: "subtitle" },
                    { label: "Title", value: "title" },
                    { label: "Paragraph", value: "paragraph" },
                    { label: "Button", value: "button" },
                  ],
                  defaultValue: "title",
                },
                text: {
                  type: "text",
                  label: "Text",
                  defaultValue: "",
                },
                allowLineBreaks: {
                  type: "checkbox",
                  label: "Allow \\n line breaks (for Title)",
                  defaultValue: true,
                },
                boldFirstWord: {
                  type: "checkbox",
                  label: "Bold first word (for Subtitle)",
                  defaultValue: true,
                },
                href: {
                  type: "text",
                  label: "Button href",
                  defaultValue: "shop.html",
                },
              },
            },
            defaultValue: defaultCollection.elements,
          },
        },
      },
      defaultValue: [
        defaultCollection,
        defaultSeasonSale,
        {
          ...defaultCollection,
          category: "sweters",
          variantClass: "collection_2",
          elements: [
            { kind: "subtitle", text: "men collection", boldFirstWord: true },
            { kind: "title", text: "new Autumn \narrivals 2020", allowLineBreaks: true },
            { kind: "button", text: "Shop now", href: "shop.html" },
          ],
        },
        {
          ...defaultCollection,
          category: "dresses",
          variantClass: "collection_3",
          elements: [
            { kind: "subtitle", text: "women collection", boldFirstWord: true },
            { kind: "title", text: "Trendy look \nfor every day", allowLineBreaks: true },
            { kind: "button", text: "Shop now", href: "shop.html" },
          ],
        },
      ],
    },
    cta: {
      type: "object",
      label: "Bottom CTA",
      fields: {
        text: { type: "text", label: "CTA Text", defaultValue: "View all collections" },
        href: { type: "text", label: "CTA Link", defaultValue: "collections.html" },
      },
    },
  },

  render: ({ fields }) => {
    const renderElements = (els: ElementItem[]) =>
      els.map((el, i) => {
        if (el.kind === "subtitle") {
          const firstWord = el.text.split(/\s+/)[0] ?? "";
          const rest = el.text.slice(firstWord.length);
          return (
            <span key={i} className="collection__subtitle category-subtitle">
              {el.boldFirstWord ? <b>{firstWord}</b> : firstWord}
              {rest ? ` ${rest}` : ""}
            </span>
          );
        }
        if (el.kind === "title") {
          const parts = el.allowLineBreaks ? el.text.split("\n") : [el.text];
          return (
            <h4 key={i} className="collection__title season-sale__title">
              {parts.map((p, idx) => (
                <React.Fragment key={idx}>
                  {p}
                  {idx < parts.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h4>
          );
        }
        if (el.kind === "paragraph") {
          return <p key={i} className="season-sale__text">{el.text}</p>;
        }
        if (el.kind === "button") {
          // collection kartında read-more, season-sale'de de read-more kullanalım
          return (
            <a key={i} className="collection__more read-more season-sale__more" href={el.href || "#"}>
              {el.text || "Shop now"}
            </a>
          );
        }
        return null;
      });

    return (
      <section className="collection-block wrapper">
        <div className="collection-block__content">
          <div className="collections">
            {/* Top Stat */}
            <div className="collections__top">
              <div className="collections__max">
                <h3 className="collection-title">
                  <span className="collection-title__count">{fields.topStat?.count}</span>
                  {fields.topStat?.plus && <span className="collection-title__plus">+</span>}
                  <span className="collection-title__text">{fields.topStat?.text}</span>
                </h3>
              </div>
            </div>

            {/* Cards */}
            {fields.cards?.map((card, idx) => {
              if (card.kind === "season-sale") {
                return (
                  <article key={idx} className="season-sale">
                    <div className="season-sale__all">
                      <div
                        className="season-sale__image"
                        style={{ backgroundImage: `url(${card.imageUrl})` }}
                        aria-label={card.imageAlt || "Season image"}
                      />
                      <div className="season-sale__row">
                        <div className="season-sale__cell">
                          <div className="season-sale__content">
                            {renderElements(card.elements)}
                          </div>
                        </div>
                      </div>
                      <a className="season-sale__link" href={card.link}></a>
                    </div>
                  </article>
                );
              }

              // collection kartı
              return (
                <article key={idx} className={`collection ${card.variantClass || ""}`}>
                  <div className="collection__all">
                    <div className="collection__mob-image">
                      <a
                        className="collection__image"
                        style={{ backgroundImage: `url(${card.imageUrl})` }}
                        aria-label={card.imageAlt || "Collection image"}
                        href={card.link || "#"}
                      ></a>
                      {card.category && <span className="collection__category">{card.category}</span>}
                    </div>
                    <div className="collection__row">
                      <div className="collection__cell">
                        <div className="collection__content">{renderElements(card.elements)}</div>
                      </div>
                    </div>
                    <a className="collection__link" href={card.link || "#"}></a>
                  </div>
                </article>
              );
            })}

            {/* Bottom Stat */}
            <div className="collections__bottom">
              <div className="collections__max">
                <h3 className="collection-title">
                  <span className="collection-title__count">{fields.bottomStat?.count}</span>
                  {fields.bottomStat?.plus && <span className="collection-title__plus">+</span>}
                  <span className="collection-title__text">{fields.bottomStat?.text}</span>
                </h3>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="load-more">
            <a className="button" href={fields.cta?.href || "#"}>
              <span className="button__text">{fields.cta?.text || "View all collections"}</span>
            </a>
          </div>
        </div>

        {/* SVG bg img tag’leri yerine lazy-data yerine geçecek boş img bırakmadım;
            istersen orijinal data-lazy yapısını burada <img> ile tekrar ekleyebilirsin */}
      </section>
    );
  },
};
