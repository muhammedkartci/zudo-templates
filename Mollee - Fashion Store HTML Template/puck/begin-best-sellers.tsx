"use client";

import * as React from "react";
import type { ComponentConfig } from "@measured/puck";

/** ───────── Types ───────── */
type TopElement =
  | { kind: "subtitle"; text: string; boldFirstWord?: boolean }
  | { kind: "title"; text: string }
  | { kind: "paragraph"; text: string };

type Tag = { label: string; color?: "red" | "green" | "default" };

type ItemElement =
  | { kind: "image"; src: string; href: string; alt?: string }
  | { kind: "tags"; tags: Tag[] }
  | { kind: "wishlist"; enabled: boolean; ariaLabel?: string }
  | { kind: "titleLink"; text: string; href: string }
  | { kind: "price"; value: string }
  | { kind: "oldPrice"; value: string };

type BestSellersFields = {
  topElements: TopElement[];
  items: { elements: ItemElement[] }[];
  showDots?: boolean;
  showPrevNext?: boolean;
  bgSvg?: string; // catalog background svg
};

/** ───────── Defaults ───────── */
const defaultTop: TopElement[] = [
  { kind: "subtitle", text: "top products", boldFirstWord: true },
  { kind: "title", text: "Best sellers at Mollee" },
  {
    kind: "paragraph",
    text:
      "Cillum eu id enim aliquip aute ullamco anim. Culpa deserunt nostrud excepteur voluptate velit ipsum esse enim.",
  },
];

const makeItem = (els: ItemElement[]) => ({ elements: els });

const defaults: BestSellersFields = {
  topElements: defaultTop,
  items: [
    makeItem([
      { kind: "image", src: "https://placehold.co/600x400", href: "product_page.html", alt: "" },
      { kind: "tags", tags: [{ label: "Sale", color: "red" }, { label: "New", color: "green" }] },
      { kind: "wishlist", enabled: true, ariaLabel: "Add to wishlist" },
      { kind: "titleLink", text: "Long oversized T-shirt", href: "product_page.html" },
      { kind: "price", value: "$15.99" },
      { kind: "oldPrice", value: "$52.99" },
    ]),
    makeItem([
      { kind: "image", src: "https://placehold.co/600x400", href: "product_page.html", alt: "" },
      { kind: "tags", tags: [{ label: "Sale", color: "red" }] },
      { kind: "wishlist", enabled: true },
      { kind: "titleLink", text: "Retro style handbag", href: "product_page.html" },
      { kind: "price", value: "$98.99" },
      { kind: "oldPrice", value: "$52.99" },
    ]),
    makeItem([
      { kind: "image", src: "https://placehold.co/600x400", href: "product_page.html", alt: "" },
      { kind: "wishlist", enabled: true },
      { kind: "titleLink", text: "Spray wrap skirt", href: "product_page.html" },
      { kind: "price", value: "$29.99" },
    ]),
    makeItem([
      { kind: "image", src: "https://placehold.co/600x400", href: "product_page.html", alt: "" },
      { kind: "tags", tags: [{ label: "Sale", color: "red" }] },
      { kind: "wishlist", enabled: true },
      { kind: "titleLink", text: "Textured turtleneck with zip", href: "product_page.html" },
      { kind: "price", value: "$25.99" },
      { kind: "oldPrice", value: "$52.99" },
    ]),
    makeItem([
      { kind: "image", src: "https://placehold.co/600x400", href: "product_page.html", alt: "" },
      { kind: "wishlist", enabled: true },
      { kind: "titleLink", text: "Cotton T-shirt", href: "product_page.html" },
      { kind: "price", value: "$63.99" },
    ]),
    makeItem([
      { kind: "image", src: "https://placehold.co/600x400", href: "product_page.html", alt: "" },
      { kind: "tags", tags: [{ label: "New", color: "green" }] },
      { kind: "wishlist", enabled: true },
      { kind: "titleLink", text: "Cotton T-shirt", href: "product_page.html" },
      { kind: "price", value: "$38.99" },
    ]),
  ],
  showDots: true,
  showPrevNext: true,
  bgSvg: "assets/img/svg/vector-catalog.svg",
};

/** ───────── ComponentConfig ───────── */
export const BestSellers: ComponentConfig<BestSellersFields> = {
  label: "Best Sellers (Catalog Slider)",
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
          boldFirstWord: {
            type: "checkbox",
            label: "Bold first word (Subtitle)",
            defaultValue: true,
          },
        },
      },
      defaultValue: defaults.topElements,
    },

    items: {
      type: "array",
      label: "Products (drag to reorder)",
      item: {
        type: "object",
        label: "Product",
        fields: {
          elements: {
            type: "array",
            label: "Product Elements (drag to reorder)",
            item: {
              type: "object",
              label: "Element",
              fields: {
                kind: {
                  type: "select",
                  label: "Type",
                  options: [
                    { label: "Image", value: "image" },
                    { label: "Tags", value: "tags" },
                    { label: "Wishlist Button", value: "wishlist" },
                    { label: "Title Link", value: "titleLink" },
                    { label: "Price", value: "price" },
                    { label: "Old Price", value: "oldPrice" },
                  ],
                  defaultValue: "image",
                },
                // shared/conditional fields
                src: { type: "text", label: "Image src", defaultValue: "https://placehold.co/600x400" },
                href: { type: "text", label: "Link href", defaultValue: "product_page.html" },
                alt: { type: "text", label: "Image alt", defaultValue: "" },

                text: { type: "text", label: "Title text", defaultValue: "" },

                value: { type: "text", label: "Price", defaultValue: "$0.00" },

                enabled: { type: "checkbox", label: "Enabled (Wishlist)", defaultValue: true },
                ariaLabel: { type: "text", label: "Wishlist aria-label", defaultValue: "Add to wishlist" },

                // Tags (JSON string for convenience in Puck)
                tags: {
                  type: "array",
                  label: "Tags",
                  item: {
                    type: "object",
                    label: "Tag",
                    fields: {
                      label: { type: "text", label: "Label", defaultValue: "Sale" },
                      color: {
                        type: "select",
                        label: "Color",
                        options: [
                          { label: "Default", value: "default" },
                          { label: "Red", value: "red" },
                          { label: "Green", value: "green" },
                        ],
                        defaultValue: "default",
                      },
                    },
                  },
                  defaultValue: [],
                },
              },
            },
            defaultValue: defaults.items[0].elements,
          },
        },
      },
      defaultValue: defaults.items,
    },

    showDots: {
      type: "checkbox",
      label: "Show dots",
      defaultValue: true,
    },
    showPrevNext: {
      type: "checkbox",
      label: "Show prev/next buttons",
      defaultValue: true,
    },
    bgSvg: {
      type: "text",
      label: "Background SVG src",
      defaultValue: "assets/img/svg/vector-catalog.svg",
    },
  },

  render: ({ fields }) => {
    const renderTop = (els: TopElement[]) =>
      (els || []).map((el, i) => {
        if (el.kind === "subtitle") {
          const [first, ...rest] = el.text.split(" ");
          return (
            <span key={i} className="main-block__subtitle category-subtitle">
              {el.boldFirstWord ? <b>{first}</b> : first} {rest.join(" ")}
            </span>
          );
        }
        if (el.kind === "title") {
          return <h3 key={i} className="main-block__title">{el.text}</h3>;
        }
        if (el.kind === "paragraph") {
          return <p key={i} className="main-block__text">{el.text}</p>;
        }
        return null;
      });

    const tagClass = (t: Tag) =>
      t.color === "red" ? "item-tag item-tag_red" :
      t.color === "green" ? "item-tag item-tag_green" :
      "item-tag";

    const renderItem = (item: { elements: ItemElement[] }, idx: number) => {
      // İçerik sırasını elemanların sırası belirliyor:
      const body: React.ReactNode[] = [];
      let imageBlock: React.ReactNode | null = null;
      let topBlock: React.ReactNode | null = null;

      item.elements.forEach((el, i) => {
        if (el.kind === "image") {
          imageBlock = (
            <a key={`img-${i}`} className="short-item__image-bg" href={el.href || "#"}>
              <img className="short-item__image" src={el.src} alt={el.alt || ""} />
            </a>
          );
          return;
        }

        if (el.kind === "tags" || el.kind === "wishlist") {
          // Top satır (tags + wishlist) birlikte duruyor ama sıralama için
          // iki ayrı öğe gibi davranabiliyoruz:
          if (!topBlock) {
            topBlock = <div key={`top-${i}`} className="short-item__top"><div className="short-item__cols" /></div>;
          }
          return;
        }

        if (el.kind === "titleLink") {
          body.push(
            <h4 key={`ttl-${i}`} className="short-item__title">
              <a className="short-item__link" href={el.href || "#"}>{el.text}</a>
            </h4>
          );
          return;
        }
        if (el.kind === "price") {
          body.push(<span key={`price-${i}`} className="short-item__price">{el.value}</span>);
          return;
        }
        if (el.kind === "oldPrice") {
          body.push(<span key={`old-${i}`} className="short-item__old-price">{el.value}</span>);
          return;
        }
      });

      // topBlock içini tags/wishlist içeriğine göre doldur
      const topCols: React.ReactNode[] = [null, null];
      item.elements.forEach((el, i) => {
        if (el.kind === "tags") {
          topCols[0] = (
            <div key={`tags-${i}`} className="short-item__col">
              {(el.tags || []).map((t, k) => (
                <span key={k} className={tagClass(t)}>{t.label}</span>
              ))}
            </div>
          );
        }
        if (el.kind === "wishlist" && el.enabled) {
          topCols[1] = (
            <div key={`wish-${i}`} className="short-item__col">
              <button
                className="heart-button js-toggle-active"
                aria-label={el.ariaLabel || "Add to wishlist"}
              />
            </div>
          );
        }
      });

      if (topBlock) {
        // @ts-expect-error: we know structure
        topBlock = React.cloneElement(topBlock as any, {}, (
          <div className="short-item__cols">
            {topCols[0] || <div className="short-item__col" />}
            {topCols[1] || <div className="short-item__col" />}
          </div>
        ));
      }

      return (
        <article key={idx} className="short-item">
          <div className="short-item__all">
            {imageBlock}
            {topBlock}
            {body}
          </div>
        </article>
      );
    };

    return (
      <section className="main-block wrapper">
        <div className="main-block__top">{renderTop(fields.topElements || [])}</div>

        <div className="catalog-slider js-catalog loaded">
          <div className="catalog-slider__list-wrap">
            <div className="catalog-slider__list js-catalog-carousel">
              {(fields.items || []).map((it, i) => renderItem(it, i))}
            </div>
          </div>

          <div className="catalog-slider__cols">
            <div className="catalog-slider__col">
              {fields.showPrevNext ? <button className="prev-button js-catalog-prev"></button> : null}
            </div>
            <div className="catalog-slider__col dots-2 js-catalog-dots">
              {fields.showDots ? <></> : null}
            </div>
            <div className="catalog-slider__col">
              {fields.showPrevNext ? <button className="next-button js-catalog-next"></button> : null}
            </div>
          </div>

          <div className="load-icon"></div>
          {fields.bgSvg ? (
            <img className="catalog-slider__bg" src={fields.bgSvg} alt="" />
          ) : null}
        </div>
      </section>
    );
  },
};
