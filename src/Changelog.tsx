import React from "react"

export const Changelog = () => {
    const [revealed, setRevealed] = React.useState(false)
    return (
        <div>
            <button onClick={()=>setRevealed(!revealed)}>
                Changelog
            </button>
            {revealed && <p>
                20/07/2023: Add changelog, improve code structure (use context), add Forest and Moutain zones. Keep in touch!
            </p>}
        </div>
    )
}