import Image from 'next/image';
import simon from 'public/images/simonGame.webp';
import ems from 'public/images/employeemanagementsystem.png'
import placeholder from 'app/placeholder.jpg';
export default function Page() {
    return (
        <section>
            <h1 className="font-bold text-2xl mb-8 tracking-tighter">some projects I've done 👇</h1>

            <div className="grid md:grid-cols-2 gap-5">
                {/* project 1 */}
                <div className="rounded-lg overflow-hidden ring-neutral-600 ring-2">
                    <Image
                        alt="Me presenting team's project on stage in Smart India Hackathon at my college."
                        src={simon}
                    />
                    <div className="px-6 py-4">
                    <a href='https://github.com/sidonweb/simonGame'>
                        <div className="font-bold text-xl mb-2">Web Game: Simon</div>
                        </a>
                        <p className="text-gray-700 prose prose-neutral dark:prose-invert text-base">
                        digital rendition of the timeless Simon electronic memory game. I designed and developed this game using HTML, CSS, and JavaScript.
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">HTML</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">CSS</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">JavaScript</span>
                    </div>
                </div>
                {/* project 2 */}
                

                
                <div className="rounded-lg overflow-hidden ring-neutral-600 ring-2">
                    <Image
                        alt="Me presenting team's project on stage in Smart India Hackathon at my college."
                        src={ems}
                    />
                    <div className="px-6 py-4">
                    <a href='https://github.com/sidonweb/employee-management-system'>
                        <div className="font-bold text-xl mb-2">Employee Management System</div>
                        </a>
                        <p className="text-gray-700 prose prose-neutral dark:prose-invert text-base">
                        efficiently track and manage (CRUD) employee information in a centralized database, developed using MERN.
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold   text-gray-700 mr-2 mb-2">React.js</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold  text-gray-700 mr-2 mb-2">Node.js</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold  text-gray-700 mr-2 mb-2">MongoDB</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Express.js</span>
                    </div>
                </div>
            </div>
        </section >
    );
}