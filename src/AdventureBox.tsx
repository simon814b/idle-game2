import React from "react"
import { styled } from "styled-components"
import { GlobalContext, Zone } from "./Context"

interface AdventureBoxProps {
    ZoneName: string
    ZoneId: Zone
    SearchTime: number
    BaseReward: number
    RewardMultiplier: number
    BasePrice: number
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
const ZoneButton = styled.button`
border-radius: 10px;
border: 2px solid black;
transition-duration: 0.2s;
&:hover {
    font-weight: bold;
    cursor: pointer;
}
`

const AdventureBox = (props: AdventureBoxProps) => {
    const { gold, updateGold, upgradeZone, zoneLevels } = React.useContext(GlobalContext)
    const [progression, setProgression] = React.useState(0)
    const [activated, setActivated] = React.useState(false)
    const level = zoneLevels.get(props.ZoneId) ?? 0
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
        updateGold(props.BaseReward*level*props.RewardMultiplier)
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
    return (<div style={{display: 'flex'}}><ZoneDiv progression={100*progression/props.SearchTime} onClick={onClick}>
        <div style={{ color: 'black' ,textAlign: 'center'}}>{props.ZoneName + ' (' + props.BaseReward*level*props.RewardMultiplier + ' gold)'}</div>
    </ZoneDiv>
     <ZoneButton style={{border: '2px solid black'}} onClick={()=>{
        if (level === 0) {
            const cost = props.BasePrice*10
            if (gold-cost >=0) {
                updateGold(-cost)
                upgradeZone(props.ZoneId)
            }
        } else {
            const cost = props.BasePrice*level*level
            if (gold-cost >=0) {
                updateGold(-cost)
                upgradeZone(props.ZoneId)
            }
        }
        }}>
     {"Upgrade for " + ((level === 0) ? props.BasePrice*10 : props.BasePrice*level*level) + " gold"}</ZoneButton></div>)
}

export { AdventureBox }