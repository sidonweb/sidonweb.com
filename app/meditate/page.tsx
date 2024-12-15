import Meditations from "app/components/meditations";
import React from "react";

export const metadata = {
    title: "Meditate",
    description: "Imagery guided meditations.",
};

export default function Reset() {
   

    return (
        <section>
            <h1 className="mb-8 text-2xl font-medium tracking-tight">meditation can help you debug your mind (and your code)</h1>
        
            <div className="space-y-6">
                <Meditations />
            </div>
        </section>
    );
}
