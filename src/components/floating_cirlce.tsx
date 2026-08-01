import { Variants } from 'framer-motion';
import { CSSProperties } from 'react';
import React from 'react';
import toast from 'react-hot-toast';
import { Renderable } from 'react-hot-toast/headless';

type FCC<P = object> = React.FC<P & { children?: React.ReactNode }>;

export const getContainerVariants = (
    staggerChildren: number = 0.2,
    startDelay: number = 0
): Variants => {
    return {
        hidden: {
            y: 0,
        },
        visible: {
            y: 0,
            transition: {
                when: 'beforeChildren',
                delay: startDelay,
                staggerChildren: staggerChildren,
            },
        },
    };
};

interface FloatingCircleProps {
    style: CSSProperties | undefined;
    orbitSize?: string;
    orbitClass?: string;
    nucleusClass?: string;
    floatDelay?: number;
    toastMessage?: Renderable;
}
const FloatingCircle: FCC<FloatingCircleProps> = ({
    style,
    orbitSize = '35rem',
    orbitClass,
    nucleusClass,
    children,
    floatDelay = 0,
    toastMessage = '',
}) => {
    return (
        <div
            className="absolute flex h-20 w-20 items-center justify-center p-2 will-change-transform"
            style={{
                ...style,
                animation: `floating 2s ease-in-out ${floatDelay}s infinite alternate`,
            }}
        >
            <Nucleus
                onClick={() => {
                    if (toastMessage) toast.success(toastMessage);
                }}
                className={nucleusClass}
            >
                {children}
            </Nucleus>
            <Orbit orbitSize={orbitSize} className={orbitClass} />
        </div>
    );
};

interface OrbitProps {
    orbitSize: string;
    className?: string;
}

const Orbit: React.FC<OrbitProps> = ({
    orbitSize,
    className = 'border-border',
}: OrbitProps) => {
    return (
        <span
            className={`orbit absolute rounded-full border opacity-40 transition-[width,height] duration-300 ease-out ${className}`}
            style={{ width: orbitSize, height: orbitSize }}
        ></span>
    );
};

interface NucleusProps {
    className?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Nucleus: FCC<NucleusProps> = ({
    className = 'bg-primary/10',
    children,
    onClick = () => { },
}) => {
    return (
        <div
            className="nucleus group absolute z-10 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full"
            onClick={onClick}
        >
            <span
                className={`absolute h-20 w-20 rounded-full opacity-40 transition-[width,height] duration-300 ease-out group-hover:h-28 group-hover:w-28 ${className}`}
            />
            <span className="absolute transition-opacity duration-300 ease-out">
                {children}
            </span>
        </div>
    );
};
export default FloatingCircle;
