"use client";

import React from "react";
import type { ComponentConfig } from "@measured/puck";

// ---- Tipler
type Social = { label: string; url: string };

type SlideElement =
  | {
      kind: "subtitle";
      text: string;
      emphasize?: boolean;
    }
  | {
      kind: "title";
      text: string;
      allowLineBreaks?: boolean;
    }
  | {
      kind: "button";
      text: string;
      href: string;
    }
  | {
      kind: "image";
      url: string;
      alt?: string;
    };

type Slide = {
  elements: SlideElement[]; // <-- Sürükle-bırak ile yer değiştirme buradan
};

export type FirstScreenFields = {
  socials: Social[];
  slides: Slide[];
};

// ---- Varsayılan veri
const defaultSlide: Slide = {
  elements: [
    { kind: "subtitle", text: "new collection", emphasize: true },
    { kind: "title", text: "meet New \nFashion week", allowLineBreaks: true },
    { kind: "button", text: "Shop now", href: "/shop" },
    { kind: "image", url: "https://placehold.co/1200x800", alt: "Hero" },
  ],
};

export const FirstScreen: ComponentConfig<FirstScreenFields> = {
  label: "First Screen Slider",
  fields: {
    socials: {
      type: "array",
      label: "Social Links",
      item: {
        type: "object",
        fields: {
          label: { type: "text", label: "Label", defaultValue: "FB" },
          url: { type: "text", label: "URL", defaultValue: "#" },
        },
      },
      defaultValue: [
        { label: "FB", url: "#" },
        { label: "TW", url: "#" },
        { label: "INS", url: "#" },
        { label: "PT", url: "#" },
      ],
    },
    slides: {
      type: "array",
      label: "Slides",
      item: {
        type: "object",
        label: "Slide",
        fields: {
          elements: {
            type: "array",
            label: "Slide Elements (drag to reorder)",
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
                    { label: "Button", value: "button" },
                    { label: "Image", value: "image" },
                  ],
                  defaultValue: "title",
                },
                text: {
                  type: "text",
                  label: "Text (for subtitle/title/button)",
                  defaultValue: "",
                },
                emphasize: {
                  type: "checkbox",
                  label: "Subtitle bold?",
                  defaultValue: true,
                },
                allowLineBreaks: {
                  type: "checkbox",
                  label: "Title allow line breaks (\\n)",
                  defaultValue: true,
                },
                href: {
                  type: "text",
                  label: "Button link",
                  defaultValue: "/shop",
                },
                url: {
                  type: "text",
                  label: "Image URL",
                  defaultValue: "https://placehold.co/1200x800",
                },
                alt: {
                  type: "text",
                  label: "Image alt",
                  defaultValue: "Hero",
                },
              },
            },
            defaultValue: defaultSlide.elements,
          },
        },
      },
      defaultValue: [defaultSlide, defaultSlide, defaultSlide],
    },
  },

  // ---- Render
  render: ({ fields }) => {
    const slideCount = fields.slides?.length ?? 0;

    return (
      <div className="first-screen">
        {/* Left */}
        <div className="first-screen__left">
          <div className="first-screen__mob-cols">
            <div className="first-screen__mob-col">
              <div className="slider-count">
                <span className="slider-count__text">
                  <span>1</span>/{slideCount}
                </span>
              </div>
            </div>

            <div className="first-screen__mob-col">
              <ul className="first-screen__socials side-socials">
                {fields.socials?.map((s, i) => (
                  <li key={i} className="side-socials__item">
                    <a className="side-socials__link" href={s.url}>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="first-screen__mob-col js-to-1" />
          </div>
        </div>

        {/* Center */}
        <div className="first-screen__center">
          <div className="main-slider">
            <div className="main-slider__list-wrap">
              <div className="main-slider__list js-main-slider loaded">
                {fields.slides?.map((slide, idx) => {
                  // içeriği ve görseli element sırasına göre çiziyoruz
                  const content = slide.elements.filter(
                    (el) => el.kind !== "image"
                  );
                  const bg = slide.elements.find((el) => el.kind === "image");
