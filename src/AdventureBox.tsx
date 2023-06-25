import React from "react"
import { styled } from "styled-components"

interface AdventureBoxProps {
    ZoneName: string
    SearchTime: number
    SearchReward: number
    GainReward: (r: number) => void
}

const ZoneDiv = styled.div<{progression: number}>`
width: 30vw;
height: 50px;
background: linear-gradient(90deg, #fdcd3b ${props => props.progression}%, #ffed4b ${props => props.progression}%);
border-radius: 10px;
border: 2px solid black;
transition-duration: 0.2s;
&:hover {
    width: 31vw;
    height: 51px;
    font-weight: bold;
    cursor: pointer;
}
`

const AdventureBox = (props: AdventureBoxProps) => {
    const [progression, setProgression] = React.useState(0)
    const [activated, setActivated] = React.useState(false)
    const updateProgression = async () => {
        if (progression + 1 >= props.SearchTime) {
            gainReward()
            setProgression(0)
            setActivated(false)
            return
        }
        setProgression(progression+1)
        return
    }
    const gainReward = () => {
        props.GainReward(props.SearchReward)
    }
    React.useEffect(() => {
        if (activated) {
            const interval = setInterval(() => updateProgression(), 1000);
    
            return () => clearInterval(interval);
        }
      }, [progression, activated]);    
    const onClick = () => {
        setActivated(true)
    }
    return <ZoneDiv progression={100*progression/props.SearchTime} onClick={onClick}>
        <div style={{ color: 'black' ,textAlign: 'center'}}>{props.ZoneName}</div>
    </ZoneDiv>
}

export { AdventureBox }