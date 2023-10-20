import Image from 'next/image';
import placeholder from './placeholder.jpg';
import self from '../public/images/selfpotrait.jpg';
import trophy from '../public/images/techmaniatrophy.jpg';
import hackathon from '../public/images/hackathonpresentation.jpg'
// import wowgdsc from '../public/images/wowgdsc.jpg'
// import leetprofile from '../public/images/leetcodeprofile.png';
// import laptop from '../public/images/laptop.jpg'
function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}
export default function Page() {
  return (
    <section>
      <h1 className="font-bold text-2xl mb-8 tracking-tighter">hello, I'm Narendra Modi 👋</h1>
      <p className="prose prose-neutral dark:prose-invert">
        Aspiring engineer sailing through realms of Software Development, Cloud Services & Open-Source Contribuitions.
      </p>
      <div className="columns-2 sm:columns-3 gap-4 my-8">
        <div className="relative h-40 mb-4">
        <Image
            alt="placeholder"
            src={placeholder}
            fill
            sizes="(min-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative h-80 mb-4 sm:mb-0">
          <Image
          alt="trophy that i won with my partner in college technical quiz competetion"
          src={self}
            
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover object-[-16px] sm:object-center"
          />
        </div>
        <div className="relative h-40 sm:h-80 sm:mb-4">
          <Image
            alt="Me presenting on stage in Smart India Hackathon at my college"
            src={hackathon}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover object-top sm:object-center"
          />
        </div>
        <div className="relative h-40 mb-4 sm:mb-0">
        <Image
            alt="placeholder"
            src={placeholder}
            fill
            sizes="(min-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative h-40 mb-4">
        <Image
            alt="placeholder"
            src={placeholder}
            fill
            sizes="(min-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative h-80">
          <Image
            alt="Myself xD"
            src={trophy}
            fill
            sizes="(min-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
      </div>
      <p className="prose prose-neutral dark:prose-invert">
        I'm a dedicated tech enthusiast with a fervor for coding and problem-solving.
        <ul className='list-none'>
          <li>
            👨‍💻 my skills includes Java, Data Structures & Algorithms, MySQL, Google Cloud Platform, Git/Github and more...
          </li>
          <li>
            🌱 currently, I'm immersing myself in the intricate
            world of Google Cloud Platform, and Kubernetes/Cloud Native for DevOps and Open-Source Contributitions.
          </li>
          <li>
            👯 I'm actively seeking opportunities that align
            with my skill set. If you're looking for a passionate and skilled team
            player to contribute to your projects, I'm all ears!
          </li>
        </ul>
      </p>
      <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-600 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://x.com/siddonweb"
          >
            <ArrowIcon />
            <p className="h-7 ml-2">twitter</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://linkedin.com/in/sidonweb"
          >
            <ArrowIcon />
            <p className="h-7 ml-2">linkedin</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/sidonweb"
          >
            <ArrowIcon />
            <p className="h-7 ml-2">github</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="mailto:heysid88@gmail.com"
          >
            <ArrowIcon />
            <p className="h-7 ml-2">mail</p>
          </a>
        </li>
      </ul>
    </section>
  );
}
