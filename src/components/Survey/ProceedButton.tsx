import {twMerge} from "tailwind-merge";

type ProceedButtonProps = {
    text: string;
    handle?: () => void;
    className?: string;
}

const ProceedButton = ({text, className, handle}: ProceedButtonProps) => {
    return (
        <button
            type="button"
            className={twMerge(
                `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`,
                className
            )}
            onClick={(event) => handle ? handle() : null}
        >
                {text}
        </button>
    );
}

export default ProceedButton;