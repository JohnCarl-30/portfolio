'use client'
const Heading = ({ text }: { text: string }) => {
    return (
        <div className='relative flex flex-col items-start w-full'>
            <h1 className="text-typography relative z-10 text-4xl font-light sm:text-5xl w-fit">
                {text}</h1>
        </div>
    )
}

export default Heading
