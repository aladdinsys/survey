'use client'

type LongAnswerProps = {
    onInput: (value: string) => void;
}

const LongAnswer = ({onInput}: Readonly<LongAnswerProps>) => {

    return (
        <textarea onInput={(event) => onInput(event.currentTarget.value) } />
    );
}

export default LongAnswer;