type ProceedButtonProps = {
    text: string;
    handle: () => void;
}

const ProceedButton = ({text, handle}: ProceedButtonProps) => {
    return (
        <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handle()}
            >
                {text}
        </button>
    );
}

export default ProceedButton;