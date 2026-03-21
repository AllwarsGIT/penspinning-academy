function Letter() {
    return (
        <section className="w-full px-8 py-16 bg-white dark:bg-black transition-colors duration-500 flex justify-center">
            <div className="max-w-2xl w-full flex flex-col gap-6">
                <h2 className="text-2xl font-bold font-inter">A letter to the community</h2>
                <div className="flex flex-col gap-4 text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                    <p>Hello, penspinners.</p>
                    <p>When I started this hobby 10 years ago, I adopted the mindset of trying to contribute to the community relatively early, however, over the years many of my attempts have ended with outcomes that drifted from that idea. Many of them ended up being disruptive for the community itself. </p>
                    <p>This application allows you to have all unified trick related info in one place without having to travel through YouTube videos or discord messages. It is also built in a way that allows me to easily grow the trick database so that it can at some point be the main learning resource for the community.</p>
                    <p>My goal with this project regarding the community is to finally align my ideas with my actions. That is also why i will make my best effort for this project to not have a membership or any kind of paywalled content now or in the future.</p>
                    <p>Thanks to my team of testers for giving me feedback and supporting me while making this project: <strong className="text-black dark:text-white">CrisWea!!</strong>, <strong className="text-black dark:text-white">Silva</strong>, <strong className="text-black dark:text-white">Lauti</strong>, <strong className="text-black dark:text-white">Mumm3y</strong> and <strong className="text-black dark:text-white">Avisuper</strong>. And special thanks to <strong className="text-black dark:text-white">RPD</strong> for making the pen spinning history and notation book, it has been essential for me to properly understand notation in order to make the application as complete as it currently is.</p>
                    <p>But specially, thanks to you.</p>
                </div>
                <p className="text-sm text-gray-400 dark:text-gray-500 italic">— Allwars</p>
            </div>
        </section>
    )
}

export default Letter 