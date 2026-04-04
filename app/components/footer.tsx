"use client";

import React from "react";
import {
  FaXTwitter,
  FaGithub,
  FaInstagram,
  FaRss,
  FaLinkedinIn,
} from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";
import { metaData, socialLinks } from "app/config";

const YEAR = new Date().getFullYear();

function SocialLink({ href, icon: Icon }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Icon />
    </a>
  );
}

function SocialLinks() {
  return (
    <div className="flex text-lg gap-3.5 transition-opacity duration-300 hover:opacity-90">
      <SocialLink href={socialLinks.twitter} icon={FaXTwitter} />
      <SocialLink href={socialLinks.github} icon={FaGithub} />
      {/* <SocialLink href={socialLinks.instagram} icon={FaInstagram} /> */}
      <SocialLink href={socialLinks.linkedin} icon={FaLinkedinIn} />
      <SocialLink href={socialLinks.email} icon={TbMailFilled} />
      <a href="/rss.xml" target="_self">
        <FaRss />
      </a>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col gap-5">
      <small className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-3 lg:mt-24 mt-16 text-[#1C1C1C] dark:text-[#D4D4D4]">
        <div className="flex flex-row gap-1">
          <time>© {year}</time>
          <a
            className="no-underline"
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            {metaData.title}
          </a>
        </div>

        <SocialLinks />
      </small>

      {/* Dotted section BELOW footer */}
      <div
        className="w-full h-32 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      />
    </div>
  );
}
