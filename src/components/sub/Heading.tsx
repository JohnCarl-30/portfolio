'use client'
const Heading = ({ text }: { text: string }) => {
    return (
        <div className='relative flex flex-col items-start w-full'>
            <h1 className="text-typography relative z-10 w-fit text-4xl font-bold tracking-tighter leading-tight text-gray-900 dark:text-white sm:text-5xl">
                {text}</h1>
        </div>
    )
}

export default Heading
