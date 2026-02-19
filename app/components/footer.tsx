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
  return (
    <small className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-3 lg:mt-24 mt-16 text-[#1C1C1C]  dark:text-[#D4D4D4]">
      <div className="flex flex-row gap-1">
        <time>© {YEAR}</time>{" "}
        <a
          className="no-underline gap-2"
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          {metaData.title}

        </a>
      </div>

      <style jsx>{`
        @media screen and (max-width: 480px) {
          article {
            padding-top: 2rem;
            padding-bottom: 4rem;
          }
        }
      `}</style>

      <SocialLinks />
    </small>
  );
}
