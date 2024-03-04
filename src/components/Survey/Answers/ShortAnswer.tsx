'use client'

type ShortAnswerProps = {
    onInput: (value: string) => void;
}
const ShortAnswer = ({onInput}: Readonly<ShortAnswerProps>)=> {

    return (
        <label>
            <input onInput={(event) => onInput(event.currentTarget.value) }
                   className={`border`} type="text" maxLength={50} />
            세
        </label>
    );
}

export default ShortAnswer;