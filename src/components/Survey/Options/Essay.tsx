'use client'

type EssayProps = {
    onInput: (value: string) => void;
}

const Essay = ({onInput}: Readonly<EssayProps>) => {

    return (
        <textarea onInput={(event) => onInput(event.currentTarget.value) } />
    );
}

export default Essay;